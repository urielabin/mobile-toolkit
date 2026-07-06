const path = require('node:path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// This app lives inside an npm workspaces monorepo, so most dependencies
// (@babel/runtime, react-navigation, etc.) are hoisted to the repo root
// node_modules rather than this package's own node_modules. Metro needs to
// be told explicitly to watch and resolve from there too.
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [monorepoRoot],
  resolver: {
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(monorepoRoot, 'node_modules'),
    ],
    // watchFolders covers the whole monorepo so hoisted node_modules
    // resolve, but that also means Metro's watcher reacts to every native
    // build artifact (Gradle/Xcode output, Detox rebuilds) as a "change"
    // and keeps invalidating/reloading the bundle. Exclude everything that
    // isn't actual JS source.
    blockList: [
      /packages\/sample-app\/android\/.*/,
      /packages\/sample-app\/ios\/(Pods|build)\/.*/,
      /packages\/e2e-webdriverio\/.*/,
      /packages\/e2e-detox\/.*/,
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
