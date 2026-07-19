# Nirvana Billing Mobile

The iOS and Android applications share the existing billing interface and Supabase backend through Capacitor.

The checked-in native projects are wrappers around the same cloud billing app:

- iOS project: `ios/App`
- Android project: `android`
- Packaged web app output: `mobile/www` (generated, not committed)

## Build

```bash
npm install
npm run mobile:sync
```

Open the native projects with:

```bash
npm run mobile:open:ios
npm run mobile:open:android
```

The default application identity is:

- App name: `Nirvana Billing`
- Bundle/application ID: `in.nirvanasolutions.billing`

Store signing credentials are intentionally not stored in this repository.

## Store Release Requirements

To create signed App Store and Play Store builds, install the platform toolchains on the build machine:

- iOS: full Xcode, Apple Developer account, App Store Connect app record, signing certificate/provisioning profile.
- Android: Android Studio, JDK, Android SDK, Google Play Console app record, release keystore.

After changing web code, run `npm run mobile:sync` before opening Xcode or Android Studio.
