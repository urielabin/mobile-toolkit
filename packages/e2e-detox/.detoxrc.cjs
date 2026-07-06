const os = require('node:os');
const path = require('node:path');

// iCloud Drive's "Desktop & Documents" sync tags files under ~/Documents with
// a com.apple.provenance xattr that `codesign` rejects ("resource fork,
// Finder information, or similar detritus not allowed"). Fastlane's `gym`
// dodges this by defaulting to ~/Library/Developer/Xcode/DerivedData, which
// isn't iCloud-synced -- point Detox's own build there too instead of inside
// the repo.
const iosDerivedDataPath = path.join(os.homedir(), 'Library/Developer/Xcode/DerivedData/MobileToolkitDetox');

/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: { $0: 'jest', config: 'jest.config.cjs' },
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
      binaryPath: path.join(iosDerivedDataPath, 'Build/Products/Debug-iphonesimulator/SampleApp.app'),
      build:
        `cd ../sample-app/ios && xcodebuild -workspace SampleApp.xcworkspace -scheme SampleApp -configuration Debug -sdk iphonesimulator -derivedDataPath "${iosDerivedDataPath}"`,
    },
  },
  devices: {
    simulator: { type: 'ios.simulator', device: { type: 'iPhone 17' } },
    emulator: { type: 'android.emulator', device: { avdName: 'Pixel_6_API_34' } },
  },
  configurations: {
    'android.emu.debug': { device: 'emulator', app: 'android.debug' },
    'ios.sim.debug': { device: 'simulator', app: 'ios.debug' },
  },
};
