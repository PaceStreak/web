# AGENTS.md — web

The public marketing site, `www.pacestreak.com` (Astro + Tailwind v4, static).

Workspace-wide rules (CSP, cookies, privacy, commit conventions, what is
already decided) live in the root
[`AGENTS.md`](https://github.com/PaceStreak/pacestreak/blob/main/AGENTS.md).
Read it first; this file only adds what is specific to this repository.

## Commands

```bash
npm ci                       # npm ci, not install: it caught a peer-dep conflict once
npm run dev                  # :4321
npm run build && python3 check-html.py dist   # what CI and Cloudflare run
```

## Rules for this repo

- **Marketing only.** Never add a login, a session check or an API call.
- Every product claim reads from `src/data/product.ts`; check numbers against
  the `api`/`app` code before changing them. No pricing claims, ever.
- `robots.txt` allows everything; it is not interchangeable with `app`'s.
- CSP is `default-src 'self'` with no `unsafe-inline`. No CDN, font service,
  analytics or third-party script. `assetsInlineLimit: 0` in
  `astro.config.mjs` is load-bearing.
- `Cache-Control: no-transform` on page routes in `public/_headers` is
  a guard: it stops Cloudflare rewriting pages (Web Analytics injected a
  beacon once; it is now off and must stay off).
- `404.html` must exist in `dist`; CI asserts it.
- Astro collapses whitespace between text and an inline element; use `{" "}`.
  `check-html.py` fails the build on it.
- Inside `.wrap`, use `padding-block`, never the `padding` shorthand.

## Deploying

Push to `main`; Cloudflare Pages builds it. Verify after propagation, not
seconds after pushing.

## Commits

Conventional commits, subject says what, body says why. Commit as
`AlzyWelzy <welzyalzy@gmail.com>`. **Never credit an AI tool**: no
`Co-Authored-By` trailer and no "Generated with" line, in commits or PRs.
This repository is public, so never commit a secret.
