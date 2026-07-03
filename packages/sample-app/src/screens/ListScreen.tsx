import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useLayoutEffect } from 'react'
import { FlatList, Pressable, StyleSheet, Text } from 'react-native'
import { TASKS } from '../data/tasks'
import type { RootStackParamList } from '../navigation/AppNavigator'

type Props = NativeStackScreenProps<RootStackParamList, 'List'>

export function ListScreen({ navigation }: Props) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          testID="list-logout-button"
          accessibilityLabel="list-logout-button"
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      ),
    })
  }, [navigation])

  return (
    <FlatList
      testID="list-screen"
      accessibilityLabel="list-screen"
      data={TASKS}
      keyExtractor={(task) => task.id}
      renderItem={({ item }) => (
        <Pressable
          testID={`list-item-${item.id}`}
          accessibilityLabel={`list-item-${item.id}`}
          style={styles.row}
          onPress={() => navigation.navigate('Detail', { taskId: item.id })}
        >
          <Text style={styles.rowTitle}>{item.title}</Text>
        </Pressable>
      )}
    />
  )
}

const styles = StyleSheet.create({
  row: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  rowTitle: { fontSize: 16 },
  logoutText: { color: '#2997ff', fontWeight: '600', marginRight: 4 },
})
