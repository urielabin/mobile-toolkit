import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DetailScreen } from '../screens/DetailScreen'
import { ListScreen } from '../screens/ListScreen'
import { LoginScreen } from '../screens/LoginScreen'

export type RootStackParamList = {
  Login: undefined
  List: undefined
  Detail: { taskId: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="List" component={ListScreen} options={{ title: 'Tasks', headerBackVisible: false }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Task Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
