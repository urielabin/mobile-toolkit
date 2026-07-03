import path from 'node:path'

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
  'appium:deviceName': process.env['IOS_DEVICE_NAME'] ?? 'iPhone 15',
  'appium:platformVersion': process.env['IOS_PLATFORM_VERSION'] ?? '17.5',
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
  framework: 'mocha',
  mochaOpts: { require: ['ts-node/register'], timeout: 60_000 },
  waitforTimeout: 10_000,
  connectionRetryTimeout: 120_000,
  connectionRetryCount: 3,
  reporters: ['spec'],
  logLevel: 'info',
}
