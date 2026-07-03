import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'
import { AppNavigator } from './src/navigation/AppNavigator'

function App() {
  // initialMetrics avoids relying on a native onLayout event to resolve insets,
  // which never fires under react-test-renderer (would otherwise render nothing).
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppNavigator />
    </SafeAreaProvider>
  )
}

export default App
