# Deployment

## Primary: Cloudflare Pages

Preferred because the site is static and the domain is expected to be managed in Cloudflare.

### Build settings

| Setting | Value |
| --- | --- |
| Framework preset | Astro / None |
| Build command | `pnpm build` |
| Build output directory | `dist` |
| Node version | `22` |
| Package manager | `pnpm` (from `packageManager`) |

### Environment variables

Set in the Cloudflare Pages project:

```text
PUBLIC_SITE_URL=https://apps.0xvera.com
PUBLIC_SUPPORT_EMAIL=support@0xvera.com
PUBLIC_CONTACT_EMAIL=hello@0xvera.com
PUBLIC_GA_MEASUREMENT_ID=
```

Leave `PUBLIC_GA_MEASUREMENT_ID` empty until analytics is intentionally enabled.

### Headers

`public/_headers` is copied into `dist/` and applied by Cloudflare Pages.

### Custom domain

1. Create the Pages project from the GitHub repository.
2. Add custom domain `apps.0xvera.com`.
3. Confirm DNS CNAME/alias for `apps` points to the Pages project.
4. Enable HTTPS (Cloudflare managed certificate).
5. Enable **HSTS** at the zone/edge level for production (not in `_headers` by default to avoid locking staging).

Recommended HSTS once HTTPS is verified:

```text
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### Sitemap / robots

- `public/robots.txt` references `https://apps.0xvera.com/sitemap-index.xml`
- `@astrojs/sitemap` emits sitemap files during build

## Alternative: Vercel

Use only if the project later moves to Vercel.

Differences:

| Topic | Cloudflare Pages | Vercel |
| --- | --- | --- |
| Headers file | `public/_headers` | `vercel.json` `headers` |
| Output | `dist` static | `dist` static / Astro adapter if needed |
| HSTS | Edge/zone config | Often platform + `headers` |

Do **not** configure both `_headers` and an incompatible `vercel.json` at the same time. This repository ships Cloudflare `_headers` only.

## GitHub repository publish (manual)

Authenticated account must be `jowy81`. Example commands (do not run until review is complete):

```bash
gh auth status
gh repo create jowy81/apps-0xvera-landing --public --source=. --remote=origin --description "Official 0xVera Devs apps catalog (apps.0xvera.com)"
git push -u origin main
```

## Domain checklist for `apps.0xvera.com`

1. Repository connected to Cloudflare Pages
2. Production branch `main`
3. Custom domain attached
4. TLS valid
5. `/cardqr/privacy` returns 200
6. `/robots.txt` and sitemap reachable
7. Store console website / privacy URLs updated
