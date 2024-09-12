import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, Alert } from 'react-native';

import { getToken } from '../services/authService';
import { getUser } from '../services/userAuth';
import { getApiNumber } from '../services/apiServices'; // Fix typo in import
import { getApiKey } from '../services/apiServices';

export default function SmsScreen({ navigation }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [idUser, setIdUser] = useState('');
  const [number, setNumber] = useState('');
  const [sms, setSms] = useState('');


  useEffect(() => {
    const fetchTokenAndUser = async () => {
      try {
        const retrievedToken = await getToken(); // Wait for the token
        setToken(retrievedToken);

        const userData = await getUser(retrievedToken); // Wait for user data
        console.log('Fetched user data:', userData); // Log user data to the console

        setData(userData);
        setIdUser(userData.user.id);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenAndUser();
  }, []);
  const handleSms = async () => {
    try {
      const apiKey = await getApiKey(idUser); // Fetch API key
      console.log('API Key String:', apiKey.data[0].api_key); // Log to ensure it's the correct key
  
      // Fetch the number using the correct API key
      const fetchedNumberResponse = await getApiNumber(apiKey.data[0].api_key);
      console.log('Fetched response:', fetchedNumberResponse); // Log the response
  
      const responseText = fetchedNumberResponse.data;
      
      setSms(responseText); // Correct usage of setSms to set the state value
  
      setNumber(apiKey.data[0].api_key); // Set the extracted number in state
  
      Alert.alert('Success', 'Sent successfully!');
    } catch (error) {
      console.error('Error in handleSms:', error);
      Alert.alert('Failed', error.message);
    }
  };
  
  
  
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <Text>SMS</Text>
      <Text>Message: {sms || 'No message'}</Text>
      <Button title="Submit" onPress={handleSms} />
    </View>
  );
}
