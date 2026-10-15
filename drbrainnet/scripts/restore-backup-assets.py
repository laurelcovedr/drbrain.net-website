"""Compatibility entrypoint; Node.js is already required by the project."""
from pathlib import Path
import subprocess
import sys

try:
    result = subprocess.run(["node", str(Path(__file__).with_suffix(".mjs"))])
    sys.exit(result.returncode)
except FileNotFoundError:
    print("Media restore requires Node.js >=22.13.0 on PATH", file=sys.stderr)
    sys.exit(1)
