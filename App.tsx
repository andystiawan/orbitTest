/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import HomeScreen from './src/view/HomeScreen';
import DeviceScreen from './src/view/DeviceScreen';
import ModemScreen from './src/view/ModemScreen';

function App(): JSX.Element {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Device" component={DeviceScreen} />
        <Stack.Screen name="Modem" component={ModemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
