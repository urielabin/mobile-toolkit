/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: { $0: 'jest', config: 'jest.config.js' },
    jest: { setupTimeout: 120000 },
  },
  apps: {
    'android.debug': {
      type: 'android.apk',
      binaryPath: '../sample-app/android/app/build/outputs/apk/debug/app-debug.apk',
      build:
        'cd ../sample-app/android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
    },
    'ios.debug': {
      type: 'ios.app',
      binaryPath: '../sample-app/ios/build/Build/Products/Debug-iphonesimulator/SampleApp.app',
      build:
        'cd ../sample-app/ios && xcodebuild -workspace SampleApp.xcworkspace -scheme SampleApp -configuration Debug -sdk iphonesimulator -derivedDataPath build',
    },
  },
  devices: {
    simulator: { type: 'ios.simulator', device: { type: 'iPhone 15' } },
    emulator: { type: 'android.emulator', device: { avdName: 'Pixel_6_API_34' } },
  },
  configurations: {
    'android.emu.debug': { device: 'emulator', app: 'android.debug' },
    'ios.sim.debug': { device: 'simulator', app: 'ios.debug' },
  },
};
