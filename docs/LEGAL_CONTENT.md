# Legal content

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
