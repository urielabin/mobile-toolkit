# @mobile-toolkit/e2e-detox

Gray-box E2E suite for `sample-app` on Detox.

## Why this framework

Detox talks to the React Native JS thread directly and automatically synchronizes on timers, network calls, and animations before resolving any action. `LoginScreen.login()` in `src/screens/login.screen.ts` taps submit and returns — no explicit wait for the loading indicator, unlike `@mobile-toolkit/e2e-webdriverio`'s black-box equivalent, which has to wait it out manually since Appium can't see into the JS thread. That contrast is the point of pairing these two suites against the same app.

## Structure

```
src/
├── screens/          # Screen Object Model — one BaseScreen, concrete screens extend it
└── support/
    └── credentials.ts # pure test-data builder, the only device-free part of this package

e2e/
├── login.e2e.ts
└── list-detail.e2e.ts

.detoxrc.js            # points at sample-app's real build output paths
```

## Commands

```bash
npm test                     # pure support-module unit test (Vitest, no device needed)
npm run lint
npm run typecheck

# Real E2E run — needs a booted emulator/simulator
npm run test:e2e:build:android && npm run test:e2e:android
npm run test:e2e:build:ios && npm run test:e2e:ios
```
