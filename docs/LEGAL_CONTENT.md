# Legal content

## Language strategy

**Recommendation for this project:**

| Content | Approach |
| --- | --- |
| UI / catalog chrome | Localize (`en`, `es`, `ca`, `fr`, `de`, `it`) |
| App marketing copy | Localize when the app is near release; English fallback is OK before that |
| Privacy / Terms / Cookies | Keep **English as legal source of truth**. Add Spanish (and Catalan if you care about CAT) once the final policy exists. Do **not** mass-translate unfinished drafts into every UI language. |

Why English is enough for store compliance:

- Google Play mainly needs a stable public privacy URL with accurate disclosures.
- A clear English policy is accepted.
- Translating incomplete/draft policies into 6 languages creates maintenance risk and inconsistent legal wording.

When to localize legal pages:

1. Policy text is final and approved.
2. You actively market the app in that language.
3. Prefer EN + ES first; add CA/FR/DE/IT only if there is real demand.

Until then, non-EN/ES locales show the English legal page with a short fallback notice.

## Portal

| Route | Source |
| --- | --- |
| `/privacy` | `src/content/legal/portal/privacy.*.md` |
| `/cookies` | `src/content/legal/portal/cookies.*.md` |
| `/es/privacy` | Spanish portal privacy |
| `/es/cookies` | Spanish cookies notice |

Portal copy uses placeholders for hosting provider, jurisdiction and legal responsible person. Do not invent corporate/legal entity claims for 0xVera Devs.

## CardQR

| Route | Notes |
| --- | --- |
| `/cardqr/privacy` | Temporary draft (`draft: true`, `noindex`) |
| `/es/cardqr/privacy` | Spanish draft |
| `/cardqr/support` | Email support guidance |

Import path expected from Android repository:

```text
play-store/privacy-policy.md
```

After import and review:

1. Replace markdown bodies in `src/content/legal/cardqr/privacy.*.md`
2. Set `draft: false`
3. Rebuild and verify indexability

## MeteOpen

Privacy pages are draft placeholders. Do not invent weather-source or data-collection claims.

## Cupid's Oracle

Canonical privacy is external:

```text
https://cupidsoracle.com/privacy
```

Catalog privacy routes explain that and link out. Do not copy CardQR policy text.
