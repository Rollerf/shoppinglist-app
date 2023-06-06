import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import ListScreen from './src/screens/ListScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  const environment = process.env.NODE_ENV;
  console.debug("Environment " + environment);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='List'>
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})