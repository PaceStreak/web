#!/usr/bin/env python3
"""Fail the build on markup mistakes that ship silently.

Two classes of problem, both of which have reached production here:

Astro collapses the whitespace between a text node and an inline element, so

    Write to
    <a href="...">hello@pacestreak.com</a>
    and it will get answered.

renders as "Write tohello@pacestreak.comand it will get answered." It is silent,
it survives every linter, and it has now happened three separate times in this
file — so it gets a check rather than another manual fix.

    python3 check-html.py dist
"""

from __future__ import annotations

import pathlib
import re
import sys

# `Pace<span>Streak</span>` is deliberate: the wordmark is one word in two
# colours. Anything else abutting an inline tag is a missing space.
ALLOWED = {"e<span>"}

INLINE_BEFORE = re.compile(r"[A-Za-z,;:)]<(?:a|em|strong|span|code)\b[^>]*>")
INLINE_AFTER = re.compile(r"</(?:a|em|strong|span|code)>[A-Za-z(]")

# `application/ld+json` is a data block, not executable, so the CSP does not
# apply to it. Everything else inside <script> would be blocked outright by
# `script-src 'self'` — silently, which is how it shipped once already.
LD_JSON = re.compile(r"<script[^>]*type=\"application/ld\+json\"[^>]*>.*?</script>", re.S)
INLINE_SCRIPT = re.compile(r"<script[^>]*>[^<]")
DATA_URI = re.compile(r"(?:src|href)=\"data:(?!image/)")


def check(path: pathlib.Path) -> list[str]:
    html = path.read_text()
    problems = []
    for m in INLINE_BEFORE.finditer(html):
        frag = m.group(0)
        if re.sub(r"\s+[^>]*>", ">", frag) in ALLOWED or frag in ALLOWED:
            continue
        if any(frag.startswith(a[0]) and a in frag for a in ALLOWED):
            continue
        problems.append(f"{path.name}: text runs into an inline tag: …{frag}")
    for m in INLINE_AFTER.finditer(html):
        problems.append(f"{path.name}: inline tag runs into text: {m.group(0)}…")

    stripped = LD_JSON.sub("", html)
    if INLINE_SCRIPT.search(stripped):
        problems.append(
            f"{path.name}: inline <script> body — `script-src 'self'` blocks it"
        )
    if DATA_URI.search(stripped):
        problems.append(
            f"{path.name}: data: URI in src/href — the CSP blocks it"
        )
    return problems


def main() -> int:
    root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "dist")
    pages = sorted(root.rglob("*.html"))
    if not pages:
        print(f"no HTML found in {root}", file=sys.stderr)
        return 1

    problems = [p for page in pages for p in check(page)]
    for p in problems:
        print(f"  {p}", file=sys.stderr)

    if problems:
        print(f"\n{len(problems)} problem(s) in the built HTML.", file=sys.stderr)
        return 1

    print(f"checked {len(pages)} page(s): markup and CSP checks pass")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
