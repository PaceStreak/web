# Security Policy

## Reporting

**Do not open a public issue.** Email **<hello@pacestreak.com>** with what you
found, how to reproduce it, and the impact. You will get an acknowledgement
within 72 hours. There is no bug bounty; what you will get is a straight answer.

This file is kept per-repository, alongside the organisation-wide copy in
[PaceStreak/.github](https://github.com/PaceStreak/.github), so the policy
travels with the code if this repository is forked or mirrored.

## Scope

This is a static marketing site. It holds no user data, has no login, and makes
no authenticated requests — which limits the surface considerably.

| In scope | Out of scope |
| --- | --- |
| A CSP bypass, or anything that executes third-party script | Cloudflare and GitHub infrastructure |
| Content injection into the deployed output | Findings with no demonstrated impact |
| A redirect in `_redirects` that can be turned into an open redirect | Missing headers with no exploit path |
| Anything that lets this host set or read a `pacestreak.com` cookie | Denial of service, social engineering |

Anything authenticated belongs to
[`PaceStreak/app`](https://github.com/PaceStreak/app); anything server-side
belongs to [`PaceStreak/api`](https://github.com/PaceStreak/api). Report those
the same way — the address is the same.

## Why the cookie row above matters

The product's session cookie is scoped `Domain=pacestreak.com`, so it is sent
to every host under that domain, including this one. This site never reads it
and must never gain the ability to. That is the reason for the flat rule
against third-party script here, and the reason nothing untrusted is hosted
anywhere under `pacestreak.com`.

## Known and deliberate

- **`default-src 'self'` with no `'unsafe-inline'`.** Load-bearing, not defence
  in depth. Any change that loosens it is a security change and is reviewed as
  one.
- **The vanity redirects in `public/_redirects` are a fixed list**, not a
  parameterised handler. Keep them that way; a redirect that takes a target
  from the URL is an open redirect.
