#!/usr/bin/env python3
"""Assemble the publishable site into dist/.

Deploying the repository root publishes the repository — stamp.py, README.md,
CHANGELOG.md and the lint config were all being served from
www.pacestreak.com. Nothing secret, but the README documents internal
infrastructure and none of it belongs on a public origin.

This uses an ALLOWLIST, not an ignore list. A new source file added to the repo
is not published unless someone deliberately adds it here, which is the safe
direction to fail in.

    python3 build.py          # -> dist/
"""

from __future__ import annotations

import pathlib
import shutil
import subprocess
import sys

ROOT = pathlib.Path(__file__).parent
DIST = ROOT / "dist"

# Files copied verbatim to the site root.
FILES = [
    "index.html",
    "favicon.svg",
    "robots.txt",
    "sitemap.xml",
    "_headers",
    "_redirects",
]

# Directories copied wholesale, minus the suffixes below.
DIRS = ["assets", "brand"]

# Never publish these, wherever they appear. brand/ holds the image generator
# and its notes alongside the images themselves.
EXCLUDE_SUFFIXES = {".py", ".md"}


def main() -> int:
    # Stamp first: index.html must carry content-hashed asset URLs before it is
    # copied, or the deploy ships new markup against a cached stylesheet.
    result = subprocess.run([sys.executable, str(ROOT / "stamp.py")], cwd=ROOT)
    if result.returncode != 0:
        print("stamp.py failed", file=sys.stderr)
        return 1

    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()

    for name in FILES:
        src = ROOT / name
        if not src.exists():
            print(f"missing required file: {name}", file=sys.stderr)
            return 1
        shutil.copy2(src, DIST / name)

    for name in DIRS:
        src = ROOT / name
        if not src.is_dir():
            print(f"missing required directory: {name}", file=sys.stderr)
            return 1
        shutil.copytree(
            src,
            DIST / name,
            ignore=lambda _d, names: [
                n for n in names if pathlib.Path(n).suffix in EXCLUDE_SUFFIXES
            ],
        )

    published = sorted(p.relative_to(DIST) for p in DIST.rglob("*") if p.is_file())
    for p in published:
        print(f"  {p}")

    leaked = [p for p in published if p.suffix in EXCLUDE_SUFFIXES]
    if leaked:
        print(f"\nsource files leaked into dist: {leaked}", file=sys.stderr)
        return 1

    print(f"\n{len(published)} files -> dist/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
