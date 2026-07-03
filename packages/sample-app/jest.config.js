module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-navigation|react-native-screens|react-native-safe-area-context)/)',
  ],
  moduleNameMapper: {
    '^react-native-safe-area-context$': '<rootDir>/test/mocks/react-native-safe-area-context.js',
  },
};
