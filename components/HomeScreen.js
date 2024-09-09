import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, Alert } from 'react-native';

import { getToken } from '../services/authService';
import { getUser } from '../services/userAuth';

export default function HomeScreen({navigation}) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const switchTosettings = async () => {
    try {
    
      navigation.navigate('Settingsscreen');
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    const fetchTokenAndUser = async () => {
      try {
        const retrievedToken = await getToken(); // Wait for the token
        setToken(retrievedToken);

        const userData = await getUser(retrievedToken); // Wait for user data
        console.log('Fetched user data:', userData); // Log user data to the console

        setData(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenAndUser();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <Text>Home Screen</Text>
      <Text>Your token: {token || 'No token found'}</Text>
      
      {/* Safely access the message and user email */}
      <Text>Message: {data?.message || 'No message'}</Text>
      <Text>User Email: {data?.user?.email || 'No email available'}</Text>
      <Text>User ID: {data?.user?.id || 'No user ID available'}</Text>


      <Button title="Login" onPress={switchTosettings} />

    </View>
  );
}
