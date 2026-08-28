# PaceStreak

Landing page for **[pacestreak.com](https://pacestreak.com)** — a workout streak
tracker. Log the session, keep the streak, watch the grid fill.

Astro. Static output, no client framework, deployed on Cloudflare Pages.

Copyright (c) 2026 PaceStreak. Licensed under
[AGPL-3.0](./LICENSE) — if you run a modified version of this over a network,
you must offer its source to your users.

> **Temporary.** This is a placeholder until the real frontend ships in
> [`PaceStreak/web`](https://github.com/PaceStreak/web). Build the application
> there, not here.

## Layout

```text
index.html        The page. One file.
assets/styles.css One stylesheet, no framework.
assets/app.js     Builds the activity grid and counts the stats up. ~110 lines.
_headers          Security headers + cache policy, applied by Cloudflare Pages.
favicon.svg       Mark.
robots.txt        Allow all, points at the sitemap.
sitemap.xml       One URL, for now.
```

## Local development

There is nothing to install and nothing to compile. Serve the directory over
HTTP:

```bash
python3 -m http.server 8899
# then open http://127.0.0.1:8899
```

Use a server rather than opening `index.html` directly — the page references
`/assets/…` with absolute paths, which is correct for the deployed site but
resolves to your filesystem root under `file://`, so the CSS silently
disappears.

## Deploying

**Push to `main`. That is the whole process.** The Cloudflare Pages project is
connected to this repository via Cloudflare's GitHub integration and builds on
every push — there is no deploy workflow in this repo, and no API token to
manage.

Build settings, if they ever need re-entering:

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |

Astro publishes only `dist/`, which contains what you put in `src/pages` and
`public/` — so repository source can no longer leak onto the origin the way it
did when the repo root was deployed directly.

To deploy by hand (you should not need to):

```bash
npm run build
npx wrangler pages deploy dist --project-name=pacestreak
```

**Asset URLs are content-hashed by the build.** This used to be a hand-rolled
script that had to be remembered, and forgetting it once shipped new markup
against a four-hour-old cached stylesheet. Astro does it natively; that whole
failure mode is gone.

**`assetsInlineLimit: 0` in `astro.config.mjs` is load-bearing.** Vite inlines
assets under 4KB as `data:` URIs and Astro inlines small `<script>` blocks into
the HTML. The CSP in `public/_headers` is `script-src 'self'` with no
'unsafe-inline', so either would be blocked by the browser — silently. Setting
the limit to 0 forces real, hashed files.

## Notes for anyone editing this

**No external requests.** No font CDN, no analytics, no third-party scripts.
The Content-Security-Policy in `_headers` is `default-src 'self'` and will
block anything you add from elsewhere — that is deliberate, not an obstacle to
route around. If you add a dependency, vendor it into `assets/`.

**The page works without JavaScript, mostly.** The real stat numbers are in the
markup; `app.js` only animates them. The activity grid is the exception — it is
generated in JS, because 182 hand-written `<i>` elements is not a reasonable
thing to keep in the HTML.

**Grid cell colours are specificity-sensitive.** `.heat i` deliberately sets no
`background`. It would be specificity 0-1-1 and would beat the single-class
`.lvl--N` rules, flattening every cell to one colour. Paint cells only via the
level class.

**Motion is opt-out.** Everything animated is behind
`prefers-reduced-motion`, and the settled state is the correct one — that is
also the easiest way to screenshot the page.

## Domain

`www.pacestreak.com` is canonical; the apex `pacestreak.com` 301-redirects to
it. Both are custom domains on the Pages project, and Cloudflare issues a
**separate certificate per hostname** — they are not one cert with two SANs, so
both expiries are monitored independently at
[status.pacestreak.com](https://status.pacestreak.com).

Keep the apex attached to the Pages project even though it redirects: the
redirect rule runs first, but if it is ever deleted the apex falls back to
serving the site rather than returning a 522.

The backend lives on `api.pacestreak.com`. It is same-site with the frontend
(same registrable domain), so `SameSite=Lax` cookies reach it — you do not need
`SameSite=None`. The auth cookie must be scoped `Domain=pacestreak.com` to span
both hosts, which means it is sent to *every* subdomain: do not host
user-generated content or third-party tooling anywhere under `pacestreak.com`.
