#!/usr/bin/env python3
"""Stamp content hashes onto asset URLs in index.html.

The asset filenames are not content-hashed (there is no build step), and
Cloudflare serves them with a multi-hour Cache-Control. Without this, a CSS or
JS change ships an updated index.html that still points at a URL the CDN and
the browser already have cached — the new markup renders against the old
stylesheet, which is exactly how the footer icons shipped at 170px.

Run before every deploy. Idempotent: re-running with no asset change is a
no-op.

    python3 stamp.py
"""

from __future__ import annotations

import hashlib
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).parent
HTML = ROOT / "index.html"
ASSETS = ["assets/styles.css", "assets/app.js"]


def digest(path: pathlib.Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()[:8]


def main() -> int:
    html = HTML.read_text()
    original = html
    for rel in ASSETS:
        path = ROOT / rel
        if not path.exists():
            print(f"missing asset: {rel}", file=sys.stderr)
            return 1
        token = digest(path)
        # Match /assets/x.css with or without an existing ?v= token.
        pattern = re.compile(rf'(/{re.escape(rel)})(\?v=[0-9a-f]+)?')
        html, count = pattern.subn(rf'\g<1>?v={token}', html)
        if not count:
            print(f"no reference to /{rel} in index.html", file=sys.stderr)
            return 1
        print(f"  /{rel}?v={token}  ({count} reference{'s' if count > 1 else ''})")

    if html == original:
        print("unchanged")
    else:
        HTML.write_text(html)
        print("index.html updated")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
