from pathlib import Path
import hashlib, json
root = Path(__file__).resolve().parents[1]
folder = root / "backup-assets"
manifest = json.loads((folder / "manifest.json").read_text())
data = b"".join((folder / name).read_bytes() for name in manifest["parts"])
assert len(data) == manifest["size"], "Video size mismatch"
assert hashlib.sha256(data).hexdigest() == manifest["sha256"], "Video checksum mismatch"
target = root / manifest["path"]
if target.exists() and target.read_bytes() != data:
    raise RuntimeError("Existing video differs; restore halted")
target.parent.mkdir(parents=True, exist_ok=True)
target.write_bytes(data)
print("Original video restored and SHA-256 verified:", manifest["path"])
