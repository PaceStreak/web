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

```bash
python3 stamp.py                                    # ALWAYS run this first
npx wrangler pages deploy . --project-name=pacestreak
```

**`stamp.py` is not optional.** The asset filenames carry no content hash, and
Cloudflare serves them with a multi-hour `Cache-Control` that `_headers` cannot
override for static assets. Deploy without stamping and the new `index.html`
points at a URL the CDN already has cached — the new markup renders against the
old stylesheet, silently, for hours. That is exactly how the footer icons once
shipped at 170px instead of 20px.

`stamp.py` rewrites the asset URLs with a hash of their contents, so a changed
file gets a new URL and a changed URL can never hit a stale cache entry. It is
idempotent; running it with nothing changed does nothing.

### Vanity links

`_redirects` holds the short links (`/github`, `/instagram`). They live in the
repo rather than as Cloudflare Redirect Rules so they are version controlled and
ship with the site — a dashboard rule is invisible from here and easy to lose.

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
[status.rajpoot.dev](https://status.rajpoot.dev).

Keep the apex attached to the Pages project even though it redirects: the
redirect rule runs first, but if it is ever deleted the apex falls back to
serving the site rather than returning a 522.

The backend lives on `api.pacestreak.com`. It is same-site with the frontend
(same registrable domain), so `SameSite=Lax` cookies reach it — you do not need
`SameSite=None`. The auth cookie must be scoped `Domain=pacestreak.com` to span
both hosts, which means it is sent to *every* subdomain: do not host
user-generated content or third-party tooling anywhere under `pacestreak.com`.
