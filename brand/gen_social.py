#!/usr/bin/env python3
"""Generate PaceStreak social images at every platform size.

One HTML template rendered headless at each target size. The layouts are not
one design scaled — a 1128x191 LinkedIn strip (5.9:1) and a 1080x1920 Instagram
story (0.56:1) cannot share a composition — so the template picks a layout from
the aspect ratio and scales type off the short edge.

YouTube channel art is the awkward one: the file is 2560x1440 but only the
centre 1546x423 is visible on every device, so everything meaningful is
confined to that box and the rest is bleed.
"""

from __future__ import annotations

import pathlib
import subprocess
import sys

OUT = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "social")
OUT.mkdir(parents=True, exist_ok=True)
TMP = pathlib.Path("/tmp/ps-social")
TMP.mkdir(exist_ok=True)

LOGO = pathlib.Path.home() / "Documents/pacestreak-landing/brand/logo-512.png"
assert LOGO.exists(), LOGO

# name, width, height, layout, safe-area (w,h) or None
SPECS = [
    ("og",                  1200,  630, "wide",  None),
    ("twitter-header",      1500,  500, "wide",  None),
    ("facebook-cover",      1640,  624, "wide",  None),
    ("github-social",       1280,  640, "wide",  None),
    ("discord-banner",       960,  540, "wide",  None),
    ("linkedin-personal",   1584,  396, "strip", None),
    ("linkedin-company",    1128,  191, "strip", None),
    ("youtube-channel-art", 2560, 1440, "wide",  (1546, 423)),
    ("instagram-post",      1080, 1080, "square", None),
    ("instagram-story",     1080, 1920, "tall",  None),
    ("email-header",         600,  200, "strip", None),
]


def html(w: int, h: int, layout: str, safe) -> str:
    LOGO_URI = LOGO.as_uri()
    short = min(w, h)
    # Type scales off the short edge, except on strips where height is tiny and
    # the width is what there is to work with.
    base = short if layout != "strip" else h * 1.9
    # When a safe area is set, that box IS the canvas as far as composition
    # goes. Sizing off the full 2560x1440 YouTube frame pushed the lockup and
    # the URL outside the 1546x423 region every mobile client crops to, so the
    # branding vanished on phones.
    if safe:
        base = safe[1]

    mark = base * (0.20 if layout in ("square", "tall") else 0.26)
    word = base * (0.115 if layout in ("square", "tall") else 0.15)
    tag = base * (0.088 if layout in ("square", "tall") else 0.105)
    url = base * (0.045 if layout in ("square", "tall") else 0.055)
    gap = base * 0.05

    if layout == "strip":
        # Strips must fit BOTH edges. Keying off height alone blows out a
        # narrow strip like the 600x200 email header, where the lockup and the
        # tagline together are far wider than the canvas.
        mark = min(h * 0.46, w * 0.105)
        word = min(h * 0.30, w * 0.070)
        tag = min(h * 0.17, w * 0.040)
        url = min(h * 0.13, w * 0.030)

    show_tag = layout != "strip" or h >= 190
    show_url = layout != "strip" or h >= 190
    stacked = layout in ("square", "tall")

    # Safe area: keep the lockup inside the region every YouTube client shows.
    box = (
        f"width:{safe[0]}px;height:{safe[1]}px;"
        if safe
        else "width:100%;height:100%;"
    )

    direction = "column" if stacked else ("column" if layout == "wide" else "row")
    align = "center" if stacked or layout == "wide" else "center"

    lockup_dir = "column" if stacked else "row"

    return f"""<!doctype html><html><head><meta charset="utf-8"><style>
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:{w}px;height:{h}px;overflow:hidden}}
body{{
  background:#0a0a0b;
  font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  color:#f4f4f5;display:flex;align-items:center;justify-content:center;
  -webkit-font-smoothing:antialiased;position:relative;
}}
/* Faint activity grid, the product's own motif, as texture rather than content. */
.mesh{{position:absolute;inset:0;
  background-image:
    radial-gradient(55% 60% at 50% 0%, rgba(211,255,62,.13), transparent 70%),
    radial-gradient(40% 50% at 100% 100%, rgba(255,107,53,.09), transparent 70%),
    repeating-linear-gradient(0deg,rgba(255,255,255,.030) 0 1px,transparent 1px {max(10, int(base*0.055))}px),
    repeating-linear-gradient(90deg,rgba(255,255,255,.030) 0 1px,transparent 1px {max(10, int(base*0.055))}px);
}}
.safe{{{box}display:flex;flex-direction:{direction};align-items:{align};
  justify-content:center;gap:{gap}px;position:relative;z-index:1;
  padding:{base*0.06}px;text-align:{'center' if stacked or layout=='wide' else 'left'}}}
.lock{{display:flex;flex-direction:{lockup_dir};align-items:center;gap:{gap*0.9}px}}
.badge{{width:{mark}px;height:{mark}px;flex:none;display:block}}
.word{{font-size:{word}px;font-weight:800;letter-spacing:-.035em;line-height:1;white-space:nowrap}}
.word span{{color:#a1a1aa;font-weight:700}}
.tag{{font-size:{tag}px;font-weight:700;letter-spacing:-.025em;line-height:1.12;
  max-width:22ch}}
.grad{{background:linear-gradient(96deg,#d3ff3e,#ff6b35);-webkit-background-clip:text;
  background-clip:text;color:transparent}}
.url{{font-size:{url}px;color:#a1a1aa;font-weight:600;letter-spacing:-.01em;white-space:nowrap}}
.row{{display:flex;flex-direction:column;align-items:{'center' if stacked or layout=='wide' else 'flex-start'};gap:{gap*0.45}px}}
</style></head><body>
<div class="mesh"></div>
<div class="safe">
  <div class="lock">
    <img class="badge" src="{LOGO_URI}" alt="">
    <div class="word">Pace<span>Streak</span></div>
  </div>
  {'<div class="row">' if (show_tag or show_url) else ''}
  {f'<div class="tag">Don&rsquo;t break the <span class="grad">chain.</span></div>' if show_tag else ''}
  {f'<div class="url">www.pacestreak.com</div>' if show_url else ''}
  {'</div>' if (show_tag or show_url) else ''}
</div></body></html>"""


made = []
for name, w, h, layout, safe in SPECS:
    src = TMP / f"{name}.html"
    src.write_text(html(w, h, layout, safe))
    out = OUT / f"{name}.png"
    subprocess.run(
        ["firefox", "--headless", "--profile", str(TMP / "prof"),
         f"--window-size={w},{h}", "--screenshot", str(out.resolve()), f"file://{src}"],
        capture_output=True, timeout=180,
    )
    size = out.stat().st_size if out.exists() else 0
    made.append((name, w, h, size))
    print(f"  {name:22} {w}x{h:<5} {size/1024:6.1f} KB{'' if size else '   FAILED'}")

if any(s == 0 for *_, s in made):
    sys.exit("some renders failed")
print(f"\n{len(made)} images -> {OUT}")
