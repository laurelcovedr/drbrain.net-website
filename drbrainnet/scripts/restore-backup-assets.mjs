import { createHash, randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, realpathSync, renameSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const digest = data => createHash('sha256').update(data).digest('hex');
function contained(base, name) {
  if (typeof name !== 'string' || !name || name.includes('\\') || name.split('/').includes('..')) throw new Error('Unsafe asset path');
  const path = resolve(base, name);
  if (!path.startsWith(resolve(base) + sep)) throw new Error('Unsafe asset path');
  let ancestor = path;
  while (!existsSync(ancestor)) ancestor = dirname(ancestor);
  const actual = realpathSync(ancestor);
  if (actual !== realpathSync(base) && !actual.startsWith(realpathSync(base) + sep)) throw new Error('Asset symlink escapes root');
  return path;
}

export function restoreBackupAssets(root = projectRoot) {
  const folder = resolve(root, 'backup-assets');
  const manifest = JSON.parse(readFileSync(resolve(folder, 'manifest.json'), 'utf8'));
  if (!manifest.path?.startsWith('public/media/') || !/\.(mp4|webm|webp|png|jpe?g|svg|gif|avif|woff2?)$/i.test(manifest.path)) throw new Error('Only non-sensitive media may be restored');
  if (!Number.isSafeInteger(manifest.size) || manifest.size <= 0 || !/^[a-f0-9]{64}$/.test(manifest.sha256)) throw new Error('Invalid asset size or SHA-256');
  if (!Array.isArray(manifest.parts) || !manifest.parts.length || new Set(manifest.parts).size !== manifest.parts.length) throw new Error('Invalid or duplicate parts');
  const target = contained(root, manifest.path);
  // Always validate backup parts, even when an output already exists.
  const data = Buffer.concat(manifest.parts.map(name => readFileSync(contained(folder, name))));
  if (data.length !== manifest.size) throw new Error('Asset size mismatch');
  if (digest(data) !== manifest.sha256) throw new Error('Asset SHA-256 mismatch');
  if (existsSync(target)) {
    const existing = readFileSync(target);
    if (existing.length !== manifest.size || digest(existing) !== manifest.sha256) throw new Error('Existing media differs; restore halted');
    return { path: manifest.path, size: data.length, sha256: manifest.sha256, restored: false };
  }
  mkdirSync(dirname(target), { recursive: true });
  const temporary = target + '.' + randomUUID() + '.tmp';
  try {
    writeFileSync(temporary, data, { flag: 'wx' });
    renameSync(temporary, target);
  } finally {
    if (existsSync(temporary)) unlinkSync(temporary);
  }
  return { path: manifest.path, size: data.length, sha256: manifest.sha256, restored: true };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(restoreBackupAssets())); }
  catch (error) { console.error('Media restore failed:', error.message); process.exitCode = 1; }
}
