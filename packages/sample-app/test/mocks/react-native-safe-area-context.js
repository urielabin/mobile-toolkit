// react-native-safe-area-context ships an official jest mock at
// react-native-safe-area-context/jest/mock.tsx, but it's raw TSX using
// `export default {...}` — our own babel-jest transform wraps that as
// `exports.default`, not flat named exports, so named imports resolve to
// undefined. This CJS mock is adapted from that same source with a shape
// our project's Babel interop resolves correctly.
const React = require('react');
const { useContext } = React;
// Requiring the bare package name would loop back through this same mock via
// moduleNameMapper (which intercepts requireActual too, not just jest.mock).
// Requiring the real internal file directly bypasses that exact-match alias.
const actual = require('react-native-safe-area-context/lib/commonjs/SafeAreaContext');

const MOCK_INITIAL_METRICS = {
  frame: { width: 320, height: 640, x: 0, y: 0 },
  insets: { left: 0, right: 0, bottom: 0, top: 0 },
};

function SafeAreaProvider({ children, initialMetrics }) {
  return React.createElement(
    actual.SafeAreaFrameContext.Provider,
    { value: initialMetrics?.frame ?? MOCK_INITIAL_METRICS.frame },
    React.createElement(
      actual.SafeAreaInsetsContext.Provider,
      { value: initialMetrics?.insets ?? MOCK_INITIAL_METRICS.insets },
      children,
    ),
  );
}

module.exports = {
  ...actual,
  initialWindowMetrics: MOCK_INITIAL_METRICS,
  SafeAreaProvider,
  useSafeAreaInsets: () => useContext(actual.SafeAreaInsetsContext) ?? MOCK_INITIAL_METRICS.insets,
  useSafeAreaFrame: () => useContext(actual.SafeAreaFrameContext) ?? MOCK_INITIAL_METRICS.frame,
};
