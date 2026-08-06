---
appSlug: cardqr
type: privacy
locale: en
title: Privacy Policy — CardQR
description: How CardQR handles information on your device. Offline-first, no accounts, ads or analytics.
draft: false
updatedAt: 2026-08-06
---

# Privacy Policy — CardQR

**Developer:** 0xVera  
**App:** CardQR (`com.cardqr.app`)  
**Contact:** support@0xvera.com  
**Canonical URL:** https://apps.0xvera.com/cardqr/privacy  
**Last updated:** 2026-08-06

This policy describes how CardQR handles information. It reflects the app’s actual behavior as of the date above.

## Summary

CardQR is an offline-first Android app for storing and presenting personal cards (QR codes and images) on your device.

- No accounts or registration
- No advertisements
- No analytics SDKs
- No tracking SDKs
- No Firebase
- The app does **not** declare the `INTERNET` permission
- Data you create stays on your device unless **you** export or share it

## Data the app stores on your device

CardQR may store locally:

- Card titles, descriptions, colors, favorites and sort order
- QR payload text or URLs that you enter
- Images you choose from the system Photo Picker or capture with the camera
- App preferences (theme, language, presentation options)
- Temporary cache files used for camera capture and sharing
- Optional backup ZIP files that **you** choose to create or import via the system file picker (Storage Access Framework)

Storage locations are app-private directories and Android databases/preferences on the device.

## Camera

CardQR requests the `CAMERA` permission only to capture photos inside the app (for example, scanning or photographing a card). Captured images are processed and stored locally. The app does not upload camera images to 0xVera or any other server.

You can deny camera permission; gallery import via Photo Picker remains available where the system supports it.

## Network

CardQR is designed to work without network access. It does not include an HTTP client for its own backend.

If you open a URL from a card, Android may launch another app (browser or app link handler) that you choose. That other app’s privacy practices apply to that action.

## Sharing and export

When you use share or export features:

- Sharing uses Android’s Sharesheet and a `FileProvider` for temporary local URIs
- Export/import uses the system document picker; files go to or come from locations **you** select

0xVera does not receive those files unless you yourself send them to us (for example by emailing support).

## Backups

CardQR **excludes** the card database and image files from Android Auto Backup and device-to-device transfer. Those payloads can contain personal QR content and photos; the supported backup path is the in-app ZIP export/import that **you** choose.

App preferences (theme, language-related settings, presentation options) may still follow platform backup rules for DataStore/SharedPreferences. Uninstalling the app deletes its private data on that device (except ZIP copies you exported yourself).

## Children

CardQR does not target children and does not knowingly collect personal data from children. There are no accounts.

## Data deletion

- Delete individual cards or images in the app
- Clear app storage in Android settings
- Uninstall the app

Because data is local, uninstall removes the on-device copy. Exported ZIP files or shared copies outside the app are under your control.

## Third parties

The app uses on-device libraries (for example AndroidX, CameraX, Coil, ZXing, Room). It does not embed advertising, analytics, or crash-reporting third-party services that send CardQR content to remote servers.

## Changes

We may update this policy when the app’s behavior changes. The “Last updated” date will change accordingly. The published URL above is the source of truth for Play Console.

## Contact

Questions about privacy: **support@0xvera.com**
