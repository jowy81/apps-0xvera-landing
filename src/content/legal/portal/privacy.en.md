---
appSlug: portal
type: portal-privacy
locale: en
title: Privacy Policy — apps.0xvera.com
description: Privacy information for the 0xVera apps catalog website, including Olympo Google Calendar OAuth transparency.
draft: false
updatedAt: 2026-10-10
---

# Privacy Policy for apps.0xvera.com

**Last updated:** 2026-10-10

This policy describes how the public website at `apps.0xvera.com` handles information. It applies to the catalog site itself. Individual applications may have additional policies.

Legal pages on this catalog (privacy, cookies and related notices) are provided in **English** for now.

## Who operates this site

This site is published by **0xVera**.

> Placeholder: legal responsible person / jurisdiction — to be completed when confirmed. This page does not assert that 0xVera is a registered company or legal entity.

Contact:

- App support: support@0xvera.com
- General contact: hello@0xvera.com

## Hosting

> Placeholder: definitive hosting provider — intended deployment is Cloudflare Pages / Vercel. Confirm before treating this as a formal legal statement.

The site is a static website. No application database is used for this catalog.

## Cookies and similar technologies

This site does **not** set analytics cookies by default.

If you accept analytics, Google Analytics 4 (GA4) may set cookies or use similar storage as described in the [Cookies](/cookies) page. Rejecting analytics is as easy as accepting. You can change your choice later via “Manage analytics”.

Essential functionality (for example remembering your analytics choice and theme preference in `localStorage`) may use local browser storage. Theme preference is stored locally and is not sent to analytics as personal content.

## Analytics (GA4)

GA4 loads **only after** you accept analytics, and only when a measurement ID is configured (`PUBLIC_GA_MEASUREMENT_ID`).

If you reject analytics, or no measurement ID is configured, GA4 scripts are not loaded and analytics cookies are not written by this site for that purpose.

Events are limited to aggregate interaction signals (for example opening an app card or changing language). The site is designed not to send email addresses, support message text, or other personal content through analytics.

## Technical data

Like most websites, hosting and CDN infrastructure may process standard technical request data such as IP address, user agent, timestamps and requested URLs for security, reliability and operations. Retention depends on the hosting provider configuration.

> Placeholder: confirm hosting/CDN logging practices for the production provider.

## External links

This catalog may link to Google Play, App Store pages, and third-party sites such as cupidsoracle.com. Those services have their own privacy practices.

## Olympo

Olympo is listed on this catalog as a **private** application. It is not available for public registration, download or self-serve access.

Olympo uses **Google OAuth** to access **Google Calendar** for authorized operators.

### Google Calendar OAuth scope

Olympo requests:

`https://www.googleapis.com/auth/calendar`

That scope allows reading and writing Google Calendar data (viewing calendars and events; creating, updating and deleting events), subject to Google’s API rules and the connected account’s settings. Olympo does **not** use a read-only Calendar scope.

### How Olympo uses Calendar data

Authorized Olympo components may:

- List calendars and retrieve event details needed for internal automation and assistance
- Check free/busy availability
- Create, update or delete events when Olympo’s own controls record explicit human authorization for that write

### Tokens

OAuth client credentials and refresh tokens for Google Calendar are stored in Olympo’s private server environment configuration. This catalog website does not store those tokens and does not perform the OAuth exchange.

### AI providers

When AI assistance features are used with calendar tools, calendar-related content needed for the task may be processed by an external AI provider (**OpenRouter**). Olympo does not claim that such content is never shared with third parties.

### Revocation and contact

Google Account holders can revoke third-party access at [Google Account permissions](https://myaccount.google.com/permissions). For Olympo-specific privacy questions or deletion requests about credentials held by 0xVera, contact **support@0xvera.com**.

Full details: [Olympo Privacy Policy](/olympo/privacy).

Catalog entry: [Olympo](/olympo).

## Application-specific privacy policies

Each application may have its own privacy policy:

- [Olympo](/olympo/privacy) (private platform; Google Calendar OAuth)
- [CardQR](/cardqr/privacy)
- [MeteOpen](/meteopen/privacy)
- [Cupid's Oracle](https://cupidsoracle.com/privacy) (external)

## Changes

This policy may be updated as hosting, analytics, catalog apps or legal details change. The “Last updated” date above will change when material updates are published.
