import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/components/screens/Login';
import SplashScreen from './src/components/screens/SplashScreen';
import KisiselBilgiler from './src/components/screens/Kisiselbilgiler';
import Pet from './src/components/screens/Pet';
import Welcome from './src/components/screens/Welcome';
import BottomTabNavigator from './src/components/TabNavigation/BottomTabNavigator';
import Settings from './src/components/screens/Settings';
import AddPet from './src/components/screens/AddPet';
import SingOut from './src/components/screens/SingOut'

const Stack = createStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator headerMode = {null} initialRouteName = 'SplashScreen' mode = 'card'>
        <Stack.Screen name = 'BottomTabNavigation' children = {BottomTabNavigator} />               
        <Stack.Screen name = 'SplashScreen' component = {SplashScreen} />
        <Stack.Screen name = 'Login' component = {Login} />       
        <Stack.Screen name = 'KisiselBilgiler' component = {KisiselBilgiler} />
        <Stack.Screen name = 'Pet' component = {Pet} />
        <Stack.Screen name = 'Welcome' component = {Welcome} />
        <Stack.Screen name = 'Settings' component = {Settings} />
        <Stack.Screen name = 'AddPet' component = {AddPet} />
        <Stack.Screen name = 'SingOut' component = {SingOut} />                 
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;