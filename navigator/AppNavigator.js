import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Tab Navigator
import { createStackNavigator } from '@react-navigation/stack'; // Stack Navigator
import { NavigationContainer } from '@react-navigation/native'; // Navigation Container

// Import Screens
import LoginScreen from '../components/LoginScreen';
import HomeScreen from '../components/HomeScreen';
import SettingsScreen from '../components/Settingsscreen';
import SmsScreen from '../components/SmsScreen';


// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

// Create the stack navigator
const Stack = createStackNavigator();

// Bottom Tab Navigator Component
function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="SmsScreen" component={SmsScreen} />

     
    </Tab.Navigator>
  );
}

// Stack Navigator with the LoginScreen and the Tab Navigator nested
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Auth Screen - No bottom tabs */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        
        {/* Main App after login */}
        <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
