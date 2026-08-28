# PaceStreak

Landing page for **[pacestreak.com](https://pacestreak.com)** — a workout streak
tracker. Log the session, keep the streak, watch the grid fill.

Static site, no build step, no dependencies. Deployed on Cloudflare Pages.

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

`main` deploys to Cloudflare Pages. To push a build by hand:

```bash
npx wrangler pages deploy . --project-name=pacestreak
```

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

`pacestreak.com` (apex) is canonical; `www` redirects to it. Uptime and
certificate expiry are monitored at
[status.rajpoot.dev](https://status.rajpoot.dev).

Keep cookies off the apex. When the app itself ships it should live on
`app.pacestreak.com` with its own cookie scope — a cookie set on the apex is
sent to every subdomain.
