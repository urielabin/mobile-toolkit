import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { authenticate } from '../auth/authenticate'
import type { RootStackParamList } from '../navigation/AppNavigator'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

export function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    setError(null)
    setIsLoading(true)
    const isValid = await authenticate(username, password)
    setIsLoading(false)

    if (isValid) {
      navigation.replace('List')
    } else {
      setError('Invalid username or password.')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile Toolkit</Text>

      <TextInput
        testID="login-username-input"
        accessibilityLabel="login-username-input"
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        testID="login-password-input"
        accessibilityLabel="login-password-input"
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable
        testID="login-submit-button"
        accessibilityLabel="login-submit-button"
        style={styles.button}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>

      {isLoading && (
        <ActivityIndicator
          testID="login-loading-indicator"
          accessibilityLabel="login-loading-indicator"
          style={styles.spacing}
        />
      )}

      {error && (
        <Text testID="login-error-message" accessibilityLabel="login-error-message" style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 32, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
  button: { backgroundColor: '#2997ff', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
  error: { color: '#d32f2f', marginTop: 16, textAlign: 'center' },
  spacing: { marginTop: 16 },
})
