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
| `/cardqr/privacy` | Imported from Android `play-store/privacy-policy.md` (`draft: false`, indexable) |
| `/cardqr/support` | Email support guidance (English) |

Source of truth in the Android repo:

```text
D:\Git\orgs\jowy81\apps\CardQR\play-store\privacy-policy.md
```

When the Android policy changes, copy the approved text into `src/content/legal/cardqr/privacy.en.md` and bump `updatedAt`.

## MeteOpen

Privacy pages are draft placeholders in English.

## Cupid's Oracle

Canonical privacy is external:

```text
https://cupidsoracle.com/privacy
```
