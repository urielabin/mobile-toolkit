# @mobile-toolkit/sample-app

The bare React Native app both E2E suites (`e2e-webdriverio`, `e2e-detox`) drive — login, a task list, and a task detail screen, no backend.

## Structure

```
src/
├── auth/authenticate.ts     # simulated async login (~1.5s) — the sync contrast point
├── data/tasks.ts             # static in-memory task list
├── navigation/AppNavigator.tsx
└── screens/
    ├── LoginScreen.tsx
    ├── ListScreen.tsx
    └── DetailScreen.tsx

android/fastlane/Fastfile     # test / build_debug / beta / release
ios/fastlane/Fastfile         # test / build_debug / beta / release
```

Every interactive/verifiable element carries both a `testID` and a matching `accessibilityLabel` (same string) — Detox matches on `testID` directly, Appium's `~` accessibility-id selector needs `accessibilityLabel` to resolve identically on both platforms.

## Commands

```bash
npm run android   # run on a connected device/emulator
npm run ios       # run on the simulator
npm test          # React Native Testing Library component tests
npm run lint
npm run typecheck

# Fastlane (from android/ or ios/, requires bundler)
bundle exec fastlane android build_debug   # unsigned debug APK, no secrets needed
bundle exec fastlane ios build_debug       # unsigned simulator build, no secrets needed
```
