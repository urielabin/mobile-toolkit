import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { findTask } from '../data/tasks'
import type { RootStackParamList } from '../navigation/AppNavigator'

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>

export function DetailScreen({ route, navigation }: Props) {
  const task = findTask(route.params.taskId)

  return (
    <View style={styles.container}>
      <Text testID="detail-title" accessibilityLabel="detail-title" style={styles.title}>
        {task?.title ?? 'Task not found'}
      </Text>
      <Text testID="detail-description" accessibilityLabel="detail-description" style={styles.description}>
        {task?.description ?? ''}
      </Text>

      <Pressable
        testID="detail-back-button"
        accessibilityLabel="detail-back-button"
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12 },
  description: { fontSize: 16, color: '#555', marginBottom: 24 },
  button: { alignSelf: 'flex-start', backgroundColor: '#2997ff', borderRadius: 8, padding: 12 },
  buttonText: { color: '#fff', fontWeight: '600' },
})
