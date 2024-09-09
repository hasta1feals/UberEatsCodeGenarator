// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../components/LoginScreenjson';; // Import your LoginScreen
import HomeScreen from '../components/HomeScreen.js'; // Import your HomeScreen

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="LoginScreen" component={LoginScreen} />
        {/* You can add more tabs here */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
