# Architecture

One static page, deployed to an edge. Most of what follows is about the
boundaries around it, because that is where the decisions are.

## Why this is not the product

The signed-in application lives in
[`PaceStreak/app`](https://github.com/PaceStreak/app), on a different hostname.
It would be simpler to serve it from `www.pacestreak.com/app`. It is not done
that way, for three reasons that are hard to retrofit:

1. **This site must never depend on auth.** It is the page a stranger sees
   first. Keeping it a separate, fully static deployment means an outage in the
   product cannot take down the thing that explains the product — and that the
   status page can report on them independently.
2. **Caching policies are opposite.** This site wants long-lived edge caching.
   Signed-in pages must never be cached at a shared edge. Separate hosts make
   that a property of the deployment rather than a per-route rule someone
   forgets.
3. **Indexing policies are opposite.** This site must be crawled; the app must
   not. A single origin serving both invites exactly one mistake in
   `robots.txt`.

The practical consequence for anyone editing here: **do not add a login form,
a session check, or an API call to this repository.** A link to
`app.pacestreak.com` is the entire integration.

## Build and deploy

```text
push to main
  → Cloudflare Pages (GitHub integration)
  → npm ci && npm run build
  → dist/ published to www.pacestreak.com and pacestreak.com
```

There is no deploy workflow here and no API token. CI exists to fail a pull
request before it reaches `main`:

| Step | Catches |
| --- | --- |
| `npm ci` | Lockfile drift. Cloudflare runs the same command, so a failure here is a failure there. |
| `npm run build` | Anything Astro rejects. |
| `check-html.py dist` | Collapsed whitespace around inline links, inline scripts, `data:` URIs — all of which deploy silently. |
| Required-files assertion | A missing `404.html`, `robots.txt`, `_headers` or `_redirects`. |

That last one is not paranoia. Without `404.html`, Pages answers every unknown
path with `index.html` and a **200** — on the blog, that meant `/robots.txt`
returned a full HTML document, which Cloudflare then appended to its own
content-signals policy.

## The content security policy is load-bearing

`public/_headers` ships `default-src 'self'` with no `'unsafe-inline'`. This is
not defence in depth on a static page — it is the reason the site has no
third-party dependencies at runtime, and it has already caught two build-tool
behaviours that would otherwise have shipped broken:

- Astro inlining a small `<script>` into the HTML.
- Vite emitting a small asset as a base64 `data:` URI.

Both are fixed by `assetsInlineLimit: 0`, not by loosening the policy. Any
change to the CSP is a security change and is reviewed as one.

`connect-src` is `'self'`, and stays that way: this site never calls the API
(the waitlist that would have been its first request was skipped). Anything
that needs the API belongs in [`app`](https://github.com/PaceStreak/app).

## Hostnames and certificates

`www` is canonical; the apex 301-redirects to it via a Cloudflare Redirect
Rule. Both are attached to the Pages project, and **Cloudflare issues a
separate certificate per custom domain** — different SAN lists, different
expiry dates. One TLS check cannot cover both, which is why
[`status`](https://github.com/PaceStreak/status) monitors each independently.

The apex stays attached even though it only redirects. The redirect rule runs
first, but if it is ever deleted the apex falls back to serving this site
rather than returning a 522.

## What this repository does not own

- DNS and Cloudflare configuration —
  [`infra`](https://github.com/PaceStreak/infra).
- Anything authenticated — [`app`](https://github.com/PaceStreak/app).
- Anything server-side — [`api`](https://github.com/PaceStreak/api).
- Uptime checks — [`status`](https://github.com/PaceStreak/status).
