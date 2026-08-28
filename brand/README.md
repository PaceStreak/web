# Brand assets

Regenerate the social images after any brand change:

```bash
cd brand && python3 gen_social.py social
```

Needs `firefox` (headless renderer) and `rsvg-convert` for the logo PNGs.

## Files

| File | Use |
| --- | --- |
| `logo.svg` | The mark. Bolt knocked out of a lime badge. |
| `logo-mark.svg` | Bolt alone, for placing on the product's own dark ground. |
| `logo-512.png` / `logo-1024.png` | Raster exports. 512 is the GitHub org avatar. |
| `social/og.png` | 1200×630 — **every** link preview: WhatsApp, Slack, Discord, iMessage, Facebook, LinkedIn shares, Twitter cards. Referenced by `og:image` in `index.html`. |
| `social/twitter-header.png` | 1500×500 — X/Twitter profile header. |
| `social/linkedin-personal.png` | 1584×396 — LinkedIn personal profile background. |
| `social/linkedin-company.png` | 1128×191 — LinkedIn company page cover. |
| `social/facebook-cover.png` | 1640×624 — Facebook page cover. |
| `social/youtube-channel-art.png` | 2560×1440 — YouTube channel art. |
| `social/instagram-post.png` | 1080×1080 — square post / profile grid. |
| `social/instagram-story.png` | 1080×1920 — story, reel cover. |
| `social/github-social.png` | 1280×640 — GitHub repo social preview (upload is web-UI only). |
| `social/discord-banner.png` | 960×540 — Discord server banner. |
| `social/email-header.png` | 600×200 — email signature / newsletter header. |

## Things that will bite you

**YouTube channel art is not 2560×1440 of usable space.** Only the centre
**1546×423** is shown on every device; the rest is bleed that desktop crops to
and mobile discards. `gen_social.py` sizes type off that box, not the canvas.
The first attempt scaled off the 1440px canvas and pushed the wordmark and URL
outside it — on a phone the branding would simply have been gone.

**Strips must fit both edges.** Sizing a 600×200 email header off its height
alone overflows the width badly. The generator constrains by both.

**Do not use an inline SVG `<mask>` in the generator.** It renders as a plain
lime square in headless Firefox — silently, no error. The generator embeds
`logo-512.png` instead, which is why that file must exist before running it.

**Instagram has no banner.** Square posts and 9:16 stories are what exist; the
"cover" is your profile picture, which is `logo-512.png`.

**WhatsApp and Gmail have no banner either.** What they show when someone
shares a link is `og.png`. That is the one image worth getting right.
