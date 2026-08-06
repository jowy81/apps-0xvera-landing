# Legal content

## Language strategy

| Content | Approach |
| --- | --- |
| UI / catalog chrome | Localized (`en`, `es`, `ca`, `fr`, `de`, `it`) |
| App vcards (detail pages) | Localized in all UI languages |
| Privacy / Cookies / Terms / support legal text | **English only for now** |

English is enough for Google Play privacy URLs. Localized legal pages can be added later when final approved text exists and there is real demand.

Non-English routes still serve `/[lang]/…/privacy` etc., but the body is the English document with a short notice.

## Portal

| Route | Source |
| --- | --- |
| `/privacy` (+ localized prefixes) | `src/content/legal/portal/privacy.en.md` |
| `/cookies` (+ localized prefixes) | `src/content/legal/portal/cookies.en.md` |

## CardQR

| Route | Notes |
| --- | --- |
| `/cardqr/privacy` | Temporary draft (`draft: true`, `noindex`) |
| `/cardqr/support` | Email support guidance (English) |

Import path expected from Android repository:

```text
play-store/privacy-policy.md
```

After import and review:

1. Replace markdown body in `src/content/legal/cardqr/privacy.en.md`
2. Set `draft: false`
3. Rebuild and verify indexability

## MeteOpen

Privacy pages are draft placeholders in English.

## Cupid's Oracle

Canonical privacy is external:

```text
https://cupidsoracle.com/privacy
```
