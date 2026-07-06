import path from 'node:path'
import { fileURLToPath } from 'node:url'

// This package is ESM ("type": "module"), so there is no ambient __dirname —
// derive it from import.meta.url instead.
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const platform = process.env['MOBILE_PLATFORM'] ?? 'android' // 'android' | 'ios'

const androidCapabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': process.env['ANDROID_DEVICE_NAME'] ?? 'Android Emulator',
  'appium:app':
    process.env['ANDROID_APP_PATH']
    ?? path.resolve(__dirname, '../sample-app/android/app/build/outputs/apk/debug/app-debug.apk'),
  'appium:autoGrantPermissions': true,
  'appium:newCommandTimeout': 240,
}

const iosCapabilities = {
  platformName: 'iOS',
  'appium:automationName': 'XCUITest',
  'appium:deviceName': process.env['IOS_DEVICE_NAME'] ?? 'iPhone 17',
  'appium:platformVersion': process.env['IOS_PLATFORM_VERSION'] ?? '26.5',
  'appium:app':
    process.env['IOS_APP_PATH']
    ?? path.resolve(__dirname, '../sample-app/ios/build/Build/Products/Debug-iphonesimulator/SampleApp.app'),
  'appium:newCommandTimeout': 240,
}

// Real, runnable config -- executing it needs a built app binary + a
// running emulator/simulator + an Appium server, which is exactly the CI
// boilerplate boundary documented in the root README's `## CI/CD` section.
export const config: WebdriverIO.Config = {
  runner: 'local',
  specs: ['./tests/**/*.spec.ts'],
  maxInstances: 1,
  capabilities: [platform === 'ios' ? iosCapabilities : androidCapabilities],
  services: [['appium', { command: 'appium' }]],
  // WDIO auto-compiles TypeScript specs itself (tsx-based) -- explicitly
  // requiring 'ts-node/register' conflicts with that under this package's
  // "type": "module" and fails to resolve under WDIO's own ESM loader hooks.
  framework: 'mocha',
  mochaOpts: { timeout: 60_000 },
  waitforTimeout: 10_000,
  connectionRetryTimeout: 120_000,
  connectionRetryCount: 3,
  reporters: ['spec'],
  logLevel: 'info',
}
