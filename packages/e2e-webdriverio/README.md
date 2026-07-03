# @mobile-toolkit/e2e-webdriverio

Black-box E2E suite for `sample-app` on WebdriverIO + Appium (UiAutomator2 on Android, XCUITest on iOS).

## Why this framework

Appium drives the app through the platform's real accessibility tree over the WebDriver protocol — it has no visibility into React Native's JS thread. `LoginScreen.login()` in `src/screens/login.screen.ts` has to explicitly wait out the loading indicator after tapping submit, since Appium can't know when the in-flight `setTimeout` in `sample-app`'s simulated login resolves. Compare this to `@mobile-toolkit/e2e-detox`'s `login()`, which needs no such wait — that contrast is the point of pairing these two suites against the same app.

## Structure

```
src/
├── screens/          # Screen Object Model — one BaseScreen, concrete screens extend it
│                      #   exported as singletons from index.ts (WDIO's one-driver-per-worker
│                      #   model has no per-test page to inject the way Playwright's fixtures do)
└── support/
    └── credentials.ts # pure test-data builder, the only device-free part of this package

tests/
├── login.spec.ts
└── list-detail.spec.ts

wdio.conf.ts           # points at sample-app's real build output paths
```

## Commands

```bash
npm test       # pure support-module unit test (Vitest, no device needed)
npm run lint
npm run typecheck

# Real E2E run — needs a built app binary + a running emulator/simulator + Appium
appium driver install uiautomator2   # or xcuitest, once
MOBILE_PLATFORM=android npm run test:e2e
```
