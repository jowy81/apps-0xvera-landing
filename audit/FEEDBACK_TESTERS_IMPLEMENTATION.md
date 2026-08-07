# Feedback & Testers — Implementation Report

Date: 2026-08-07  
Site: https://apps.0xvera.com  
Identity: **0xVera** (no “0xVera Devs”)

## Summary

Added public `/feedback` and `/testers` areas (plus localized `/[lang]/…` routes) without redesigning the catalog. Forms open externally; no HTML form embed. Configuration is centralized in `src/config/community.ts`.

## New routes

| Route | Notes |
| --- | --- |
| `/feedback` | EN default |
| `/es/feedback`, `/ca/feedback`, `/fr/feedback`, `/de/feedback`, `/it/feedback` | Prefixed locales |
| `/testers` | EN default |
| `/es/testers`, … | Prefixed locales |
| `/feedback?app=cardqr\|meteopen\|cupids-oracle` | Optional app context (client title enhance) |

## Configuration

File: `src/config/community.ts`

- `feedback.en` / `feedback.es` with `default` + empty `apps` map (ready for prefilled URLs)
- Helpers: `getFeedbackFormUrl`, `feedbackPageHref`, `isFeedbackAppSlug`, `getTestersJoinHref`
- Testers group email: `0xvera-android-testers@googlegroups.com`

### Environment variables

| Variable | Status |
| --- | --- |
| `PUBLIC_FEEDBACK_FORM_EN_URL` | Default set → `https://forms.gle/rDJejNbbtEAYPjg78` |
| `PUBLIC_FEEDBACK_FORM_ES_URL` | Default set → `https://forms.gle/eRchfcADmMfuPhLJ8` |
| `PUBLIC_ANDROID_TESTERS_GROUP_URL` | Default set → `https://groups.google.com/g/0xvera-android-testers` |
| `PUBLIC_SUPPORT_EMAIL` | Existing (`support@0xvera.com`) |

Updated: `.env.example`, `src/env.d.ts`.

## Files touched (high level)

**Added**

- `src/config/community.ts`
- `src/components/FeedbackSection.astro`
- `src/components/TestersSection.astro`
- `src/pages/feedback.astro`, `src/pages/testers.astro`
- `src/pages/[lang]/feedback.astro`, `src/pages/[lang]/testers.astro`
- `docs/FEEDBACK_AND_TESTING.md`
- `tests/unit/community.test.ts`
- `audit/FEEDBACK_TESTERS_IMPLEMENTATION.md`

**Updated**

- `src/config/ui.ts` (EN/ES copy + nav keys)
- `src/content.config.ts` (`testingUrl?`, `feedbackEnabled?`)
- `src/components/Header.astro` (Feedback)
- `src/components/Footer.astro` (Apps, Feedback, Android Testers, Support, Contact)
- `src/components/AppDetail.astro` (Give feedback; Join testing only if `testingUrl`)
- `src/styles/global.css` (community/choice styles)
- `public/js/site.js` (community GA events + preserve `?app=` on language change)
- `README.md`, `docs/ANALYTICS.md`, `docs/ADDING_AN_APP.md`
- `tests/e2e/catalog.spec.ts`, `tests/unit/ui.test.ts`

## App detail behaviour

- **Give feedback** → `/feedback?app=<slug>` (localized)
- **Join testing** → only when `testingUrl` is present (not shown for any app yet)
- Schema ready for `testingUrl` / `feedbackEnabled`

## Navigation

- Header: Apps, **Feedback**, About, Contact
- Footer: Apps, Feedback, Android Testers, Privacy, Cookies, Support, Contact, Manage analytics

## SEO

| Page | Title | Description |
| --- | --- | --- |
| Feedback | App Feedback \| 0xVera | Report bugs… |
| Testers | Android Testers \| 0xVera | Join the 0xVera Android testing community… |

Canonical + hreflang via existing `BaseLayout` / `BaseHead`. Pages are indexable (`index,follow`).

## Analytics

Events (consent-gated, no new cookie categories):

- `feedback_language_selected`
- `feedback_open`
- `tester_group_open`
- `tester_feedback_open`

Allowed params: `language`, `app`, `source`. Community events do **not** send `link_url`.

## Accessibility / UX

- Existing header/footer/skip-link retained
- Form CTAs are real links (keyboard + no-JS usable)
- `?app=` title enhancement is progressive (JS); invalid query ignored
- External form links: `target="_blank"` + `rel="noopener noreferrer"`
- Responsive choice grid / panels reuse existing tokens

## Identity check

Repository search: no `0xVera Devs` matches.

## Tests executed

| Command | Result |
| --- | --- |
| `pnpm lint` | Pass |
| `pnpm typecheck` | Pass (hints only on pre-existing unused imports) |
| `pnpm test` | Pass (14 unit) |
| `pnpm build` | Pass |
| `pnpm test:e2e` | Pass (16) |

E2E covers: 200s for `/feedback` & `/testers`, EN/ES form links + `noopener`, `?app=cardqr`, invalid query, ES copy, group CTA, app detail feedback link, no-JS, keyboard skip link, no “0xVera Devs”.

## Placeholders / pending external links

1. Per-app prefilled form URLs — architecture ready (`feedback.*.apps`), maps empty.
2. Per-app `testingUrl` — schema ready; no CTA shown.

## Blockers

None for code merge or URL configuration.

## Deploy notes

- No push performed
- No deploy performed
- No DNS changes

---

## LISTA PARA DESPLEGAR

URLs públicas configuradas por defecto:

- Form EN: https://forms.gle/rDJejNbbtEAYPjg78
- Form ES: https://forms.gle/eRchfcADmMfuPhLJ8
- Android Testers: https://groups.google.com/g/0xvera-android-testers

Lint, typecheck, unit tests, build y e2e pasaron en la implementación base. Tras este ajuste de URL del grupo, conviene re-ejecutar `pnpm test` / `pnpm test:e2e` antes del deploy.
