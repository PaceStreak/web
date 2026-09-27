"""Brand images in the wall-calendar world, drawn with Pillow from the
n# Run from web/: uvx --with pillow --with fonttools --with brotli python scripts/social-images.py og discord-banner ...
self-hosted Archivo variable font. Regenerate with this script."""
import io, math, sys
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

SRC = "node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2"
f = TTFont(SRC); f.flavor = None; buf = io.BytesIO(); f.save(buf); FONT = buf.getvalue()
PAPER, INK, RED, LINE, DIM = (251, 251, 248), (20, 20, 20), (201, 36, 28), (221, 220, 214), (92, 92, 98)

def font(size, wght=800, wdth=75):
    ft = ImageFont.truetype(io.BytesIO(FONT), size)
    axes = [a.axisTag for a in f['fvar'].axes]
    ft.set_variation_by_axes([{'wght': wght, 'wdth': wdth}[t] for t in axes])
    return ft

def xmark(d, x, y, s, w, color=RED):
    pts1 = [(x + s * (0.21 + 0.58 * t), y + s * (0.24 + 0.54 * t + 0.03 * math.sin(t * 3))) for t in [i / 20 for i in range(21)]]
    pts2 = [(x + s * (0.79 - 0.57 * t), y + s * (0.22 + 0.56 * t - 0.02 * math.sin(t * 3))) for t in [i / 20 for i in range(21)]]
    for pts in (pts1, pts2):
        d.line(pts, fill=color, width=w, joint="curve")
        for px, py in (pts[0], pts[-1]):
            d.ellipse([px - w / 2, py - w / 2, px + w / 2, py + w / 2], fill=color)

def logo(d, x, y, s):
    k = s / 64
    lw = max(2, round(3 * k))
    d.rounded_rectangle([x + 6 * k, y + 9 * k, x + 58 * k, y + 58 * k], radius=5 * k, fill=(255, 255, 255), outline=INK, width=lw)
    d.rounded_rectangle([x + 6 * k, y + 9 * k, x + 58 * k, y + 21 * k], radius=5 * k, fill=RED, outline=INK, width=lw, corners=(True, True, False, False))
    for cx in (21, 43):
        d.line([(x + cx * k, y + 5 * k), (x + cx * k, y + 14 * k)], fill=INK, width=round(4 * k))
    xmark(d, x + 12 * k, y + 22 * k, 40 * k, max(3, round(6 * k)))

def make(w, h, path):
    im = Image.new("RGB", (w, h), PAPER); d = ImageDraw.Draw(im)
    u = min(w, h * 1.9) / 1200  # scale unit
    pad = round(60 * u) if h > 250 else round(24 * h / 200)
    short = h < 260
    if short:
        s = round(h * 0.5)
        logo(d, pad, (h - s) // 2, s)
        t = font(round(h * 0.26), 850, 72)
        d.text((pad + s + round(h * 0.12), h // 2), "PaceStreak", font=t, fill=INK, anchor="lm")
        tw = d.textlength("PaceStreak", font=t)
        sub = font(round(h * 0.11), 600, 100)
        if w > 900:
            d.text((pad + s + round(h * 0.12) + tw + round(h * 0.2), h // 2), "Don't break the chain.", font=sub, fill=RED, anchor="lm")
        # a row of crossed boxes on the right
        b = round(h * 0.36); gap = round(b * 0.12); n = 5 if w > 700 else 3
        x0 = w - pad - n * b - (n - 1) * gap
        if x0 > pad + s + tw + (500 if w > 900 else 120) * h / 200:
            for i in range(n):
                bx = x0 + i * (b + gap); by = (h - b) // 2
                d.rectangle([bx, by, bx + b, by + b], outline=INK, width=2, fill=(255, 255, 255))
                if i < n - 1: xmark(d, bx, by, b, max(3, round(b * 0.1)))
        im.save(path, optimize=True); return
    tall = h > w
    s = round(90 * u)
    logo(d, pad, pad, s)
    d.text((pad + s + round(20 * u), pad + s / 2), "PaceStreak", font=font(round(40 * u), 800, 90), fill=INK, anchor="lm")
    big = font(round((190 if tall else 118) * u), 880, 72)
    y = pad + s + round(60 * u)
    d.text((pad, y), "Don't break", font=big, fill=INK)
    y2 = y + round((190 if tall else 118) * u * 1.0)
    d.text((pad, y2), "the", font=big, fill=INK)
    d.text((pad + d.textlength("the ", font=big), y2), "chain.", font=big, fill=RED)
    small = font(round(30 * u), 500, 100)
    y3 = y2 + round((190 if tall else 118) * u * 1.25)
    d.text((pad, y3), "Habits and streaks, kept weekly.", font=small, fill=DIM)
    # calendar strip
    b = round((120 if tall else 96) * u); gap = 0
    n = 7
    cols = n
    if tall:
        x0 = pad; yb = h - pad - b * 2 - round(40 * u)
    else:
        x0 = w - pad - cols * b; yb = h - pad - b
        if h / w > 0.45: x0 = pad
        if x0 < pad + round(560 * u) and not (h / w > 0.45):
            x0 = pad; yb = h - pad - b
            if yb < y3 + round(70 * u): yb = None
    if yb is not None:
        wd = font(round(18 * u), 700, 100)
        for i in range(n):
            bx = x0 + i * b
            d.rectangle([bx, yb, bx + b, yb + b], outline=LINE if i % 7 else INK, width=max(1, round(1.5 * u)), fill=(255, 255, 255))
            d.text((bx + round(8 * u), yb + round(6 * u)), str(21 + i), font=font(round(22 * u), 700, 80), fill=RED if i == 6 else DIM)
            if i not in (2, 6): xmark(d, bx + b * 0.05, yb + b * 0.08, b * 0.9, max(3, round(9 * u)))
        d.rectangle([x0 + 6 * b, yb, x0 + 7 * b, yb + b], outline=RED, width=max(2, round(4 * u)))
        d.rectangle([x0, yb, x0 + 7 * b, yb + b], outline=INK, width=max(1, round(2 * u)))
    im.save(path, optimize=True)

for name in sys.argv[1:]:
    path = f"public/brand/social/{name}.png"
    w, h = Image.open(path).size
    make(w, h, path)
    print(name, w, h)
