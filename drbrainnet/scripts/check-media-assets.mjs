import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projectRoot, restoreBackupAssets } from './restore-backup-assets.mjs';

export function checkMediaAssets(root = projectRoot) {
  restoreBackupAssets(root);
  const inventory = JSON.parse(readFileSync(resolve(root, 'backup-assets/media-inventory.json'), 'utf8'));
  for (const asset of inventory) {
    const file = resolve(root, asset.path);
    const stat = statSync(file);
    if (!stat.isFile() || stat.size !== asset.size) throw new Error('Media missing or size mismatch: ' + asset.path);
  }
  return inventory.length;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log('Verified media assets:', checkMediaAssets()); }
  catch (error) { console.error('Media check failed:', error.message); process.exitCode = 1; }
}
