import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, statSync, rmSync, unlinkSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { projectRoot, restoreBackupAssets } from './restore-backup-assets.mjs';
import { checkMediaAssets } from './check-media-assets.mjs';

function fixture(t) {
  const root = mkdtempSync(resolve(tmpdir(), 'yiwei-media-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(resolve(root, 'backup-assets'));
  const data = Buffer.from('original-video-test-data');
  const manifest = { path: 'public/media/test.mp4', size: data.length, sha256: createHash('sha256').update(data).digest('hex'), parts: ['one', 'two'] };
  writeFileSync(resolve(root, 'backup-assets/one'), data.subarray(0, 8));
  writeFileSync(resolve(root, 'backup-assets/two'), data.subarray(8));
  const save = () => writeFileSync(resolve(root, 'backup-assets/manifest.json'), JSON.stringify(manifest));
  save();
  return { root, manifest, data, save, target: resolve(root, manifest.path) };
}
test('restores exact bytes and path; rerun preserves file mtime', t => {
  const f = fixture(t);
  assert.equal(restoreBackupAssets(f.root).restored, true);
  assert.deepEqual(readFileSync(f.target), f.data);
  const mtime = statSync(f.target).mtimeMs;
  assert.equal(restoreBackupAssets(f.root).restored, false);
  assert.equal(statSync(f.target).mtimeMs, mtime);
});
test('missing part fails even with valid existing output', t => {
  const f = fixture(t); restoreBackupAssets(f.root);
  unlinkSync(resolve(f.root, 'backup-assets/two'));
  assert.throws(() => restoreBackupAssets(f.root), /ENOENT/);
  assert.deepEqual(readFileSync(f.target), f.data);
});
for (const kind of ['truncated', 'corrupt', 'reordered', 'wrong-sha', 'duplicate', 'unsafe-output', 'unsafe-part', 'pdf']) {
  test(kind + ' fails without output or temporary files', t => {
    const f = fixture(t);
    if (kind === 'truncated') writeFileSync(resolve(f.root, 'backup-assets/two'), 'x');
    if (kind === 'corrupt') writeFileSync(resolve(f.root, 'backup-assets/one'), 'xxxxxxxx');
    if (kind === 'reordered') f.manifest.parts.reverse();
    if (kind === 'wrong-sha') f.manifest.sha256 = '0'.repeat(64);
    if (kind === 'duplicate') f.manifest.parts = ['one', 'one'];
    if (kind === 'unsafe-output') f.manifest.path = 'public/media/../../outside.mp4';
    if (kind === 'unsafe-part') f.manifest.parts[0] = '../outside';
    if (kind === 'pdf') f.manifest.path = 'public/resources/registrations/private.pdf';
    f.save();
    assert.throws(() => restoreBackupAssets(f.root));
    assert.equal(existsSync(f.target), false);
    assert.equal(existsSync(resolve(f.root, 'public')), false);
  });
}
test('existing conflicting output is preserved', t => {
  const f = fixture(t); restoreBackupAssets(f.root); writeFileSync(f.target, 'different');
  assert.throws(() => restoreBackupAssets(f.root), /Existing media differs/);
  assert.equal(readFileSync(f.target, 'utf8'), 'different');
  assert.deepEqual(readdirSync(resolve(f.root, 'public/media')), ['test.mp4']);
});
test('inventory detects other missing or truncated media', t => {
  const f = fixture(t);
  writeFileSync(resolve(f.root, 'backup-assets/media-inventory.json'), JSON.stringify([{ path: 'public/media/poster.webp', size: 4 }]));
  assert.throws(() => checkMediaAssets(f.root), /ENOENT/);
  writeFileSync(resolve(f.root, 'public/media/poster.webp'), 'bad');
  assert.throws(() => checkMediaAssets(f.root), /size mismatch/);
  writeFileSync(resolve(f.root, 'public/media/poster.webp'), 'good');
  assert.equal(checkMediaAssets(f.root), 1);
});
test('portable and managed entrypoints stop before framework on media failure', t => {
  const f = fixture(t); mkdirSync(resolve(f.root, 'scripts'));
  for (const file of ['run-framework.mjs', 'restore-backup-assets.mjs', 'check-media-assets.mjs', 'build-verified.sh']) writeFileSync(resolve(f.root, 'scripts', file), readFileSync(resolve(projectRoot, 'scripts', file)));
  writeFileSync(resolve(f.root, 'scripts/execution-profile.mjs'), 'export const readExecutionProfile = () => process.env.TEST_PROFILE;');
  unlinkSync(resolve(f.root, 'backup-assets/one'));
  for (const profile of ['portable', 'managed-linux']) for (const command of ['dev', 'build']) {
    const result = spawnSync(process.execPath, [resolve(f.root, 'scripts/run-framework.mjs'), command], { encoding: 'utf8', env: { ...process.env, TEST_PROFILE: profile } });
    assert.notEqual(result.status, 0); assert.match(result.stderr, /ENOENT/); assert.doesNotMatch(result.stderr, /Cannot find.*(vite|vinext)/);
  }
  if (process.platform !== 'win32') {
    const result = spawnSync('bash', [resolve(f.root, 'scripts/build-verified.sh')], { encoding: 'utf8', env: { ...process.env, SITES_ENV_READY: '1', SITES_PROJECT_ROOT: f.root } });
    assert.notEqual(result.status, 0); assert.match(result.stderr, /Media check failed/);
  }
});
