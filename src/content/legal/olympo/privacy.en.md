---
appSlug: olympo
type: privacy
locale: en
title: Privacy Policy — Olympo
description: How Olympo, a private 0xVera automation platform, uses Google Calendar OAuth and related data.
draft: false
updatedAt: 2026-10-10
---

# Privacy Policy — Olympo

**Developer:** 0xVera  
**App:** Olympo (private)  
**Contact:** support@0xvera.com  
**Canonical URL:** https://apps.0xvera.com/olympo/privacy  
**Last updated:** 2026-10-10

Olympo is a **private** automation and AI-assistance platform operated by **0xVera**. It is **not** a public consumer product. There is no public registration, download or self-serve sign-up.

This page describes how Olympo handles Google account data when Google OAuth is used to access **Google Calendar**, and how that differs from other apps listed on [apps.0xvera.com](/). Catalog-site practices (cookies, analytics) are covered in the [portal Privacy Policy](/privacy).

## Summary

- Olympo is private and restricted to authorized operators.
- Google OAuth is used so Olympo can access **Google Calendar** for those operators.
- Requested OAuth scope: `https://www.googleapis.com/auth/calendar` (see [Google Calendar API scopes](https://developers.google.com/calendar/api/auth)).
- That scope allows **reading and writing** calendar data (not read-only).
- Creating, updating or deleting events is intended to run only after **explicit human authorization** in Olympo’s own controls.
- OAuth client credentials and refresh tokens are stored as server environment configuration for the authorized deployment (not in this public catalog).
- When AI assistance features are used, calendar-related content needed for that task may be sent to an external AI provider (**OpenRouter**) as part of the agent conversation.
- Access can be revoked in the Google Account permissions UI; operators can also remove Olympo’s stored Google Calendar credentials.

## Who this applies to

This policy applies to Google accounts that an authorized operator connects to Olympo for Calendar access, and to operational use of that integration.

It does **not** describe public end-user apps such as CardQR or MeteOpen. Those have separate policies linked from the [portal Privacy Policy](/privacy).

## Google OAuth and Google Calendar

### Scope requested

Olympo requests:

`https://www.googleapis.com/auth/calendar`

This is Google’s full Calendar scope. It permits viewing, creating, updating and deleting calendars and events for the connected Google account (subject to Google’s API rules and the account’s own sharing settings).

Olympo does **not** claim a read-only Calendar scope.

### What information Olympo obtains from Google Calendar

Depending on the action performed, Olympo may obtain or process:

- Calendar list metadata (calendar IDs, names, time zones and related list fields returned by the API)
- Event data (titles, descriptions, times, locations, attendees, conference/link fields and other event fields returned by the API)
- Free/busy availability information for scheduling checks
- The configured target calendar identifier used by the deployment (commonly the account’s primary calendar)

Olympo uses this information to help authorized operators manage calendars and related internal workflows (for example listing upcoming events, checking availability, or proposing schedule changes).

### Read vs write

- **Read:** Olympo can list calendars, list and retrieve events, and query free/busy information.
- **Write:** Olympo can create, update and delete events through Google Calendar APIs.
- **Human gate:** Olympo’s documented runtime controls require explicit human authorization before create/update/delete operations. Email, web content or automated retrieval alone are not treated as authorization for writes.

### Tokens and credentials

For the Google Calendar integration, Olympo stores:

- OAuth client ID and client secret
- OAuth refresh token
- Target calendar identifier

These values are kept in the private deployment’s environment configuration used by Olympo’s Calendar integration components. This public website does not host those secrets.

Access tokens are obtained from Google using the stored refresh token when Calendar API calls are made.

This policy does **not** assert a specific encryption-at-rest product for those environment variables beyond ordinary private-server configuration hygiene.

## Artificial intelligence providers

Olympo uses external AI services (notably **OpenRouter**) for agent/chat and related assistance features.

When an authorized operator asks Olympo to use calendar tools as part of an AI-assisted workflow, event or calendar details needed for that request may be included in prompts or tool results processed by those AI providers. OpenRouter may route requests to underlying model providers under OpenRouter’s terms.

Olympo therefore does **not** claim that calendar-related content is never shared with third parties.

Other Olympo features may also use OpenRouter for non-calendar tasks; those uses are outside Google Calendar OAuth but are part of the same private platform.

## What this catalog site does not do

`apps.0xvera.com` is a static public catalog. It does not perform Google OAuth for Olympo, does not store Google tokens, and does not proxy Calendar API traffic.

## Data retention

Calendar data is retrieved from Google when needed for an authorized operation. This policy does **not** claim a published fixed retention period for every operational log or AI conversation transcript. Retention of Google-side calendar data remains under the connected Google Account.

## How to revoke access

You can revoke Olympo’s access to your Google Account (including Calendar) at any time in Google’s account security / third-party access settings:

[https://myaccount.google.com/permissions](https://myaccount.google.com/permissions)

After revocation, Olympo cannot call Google Calendar APIs for that grant until a new OAuth consent is completed by an authorized operator.

Operators may also remove or rotate the stored `GOOGLE_CALENDAR_*` credentials in the private deployment.

## Deletion requests

Because Olympo is private and not a public account product, there is no public self-service “delete my Olympo account” page.

To request removal of Olympo-held Google Calendar credentials or related operational copies under 0xVera’s control, email **support@0xvera.com** from an address that can identify the authorized connection. Google Account data that remains only in Google products must be managed in Google’s own interfaces.

## Children

Olympo is not directed at children and is not offered as a public consumer app for minors.

## Contact

- App / privacy contact: support@0xvera.com
- General contact: hello@0xvera.com

## Changes

This policy may be updated when Olympo’s Google Calendar integration or related AI processing changes. The “Last updated” date above will change when material updates are published.

A shorter catalog overview also appears under [Olympo in the portal Privacy Policy](/privacy#olympo).
