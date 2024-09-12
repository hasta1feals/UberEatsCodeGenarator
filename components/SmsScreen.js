import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import styles from './SmsScreenStyle'; // Adjust the path as needed

import { getToken } from '../services/authService';
import { getUser } from '../services/userAuth';
import { getApiNumber } from '../services/apiServices'; // Fix typo in import
import { getApiKey } from '../services/apiServices';
import { cancelApiNumber } from '../services/apiServices';
import { getSmscode } from '../services/apiServices';



export default function SmsScreen({ navigation }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [idUser, setIdUser] = useState('');
  const [number, setNumber] = useState('');
  const [sms, setSms] = useState('');
const [orderId, setOrderId] = useState('');
const [test, setTest] = useState('');
const [responseCode, setResponseCode] = useState(null);




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
  
      // Log the full response to ensure it's correct
      console.log('Fetched response:', fetchedNumberResponse);
  
      const responseText = fetchedNumberResponse.data;
  
      // Log the responseText to see if it matches your expectations
      console.log('Response Text:', responseText);
  
      if (responseText && responseText.includes('ORDER_ID_') && responseText.includes('NUMBER_')) {
        // Extract the ORDER_ID and NUMBER using split
        const orderId = responseText.split('ORDER_ID_')[1].split('_NUMBER_')[0]; // Extract the order id
        const number = responseText.split('NUMBER_')[1]; // Extract the number
  
        console.log('Extracted Order ID:', orderId);
        console.log('Extracted Number:', apiKey.data[0].api_key);
        setTest(apiKey.data[0].api_key)
  
        setSms(responseText); // Store the full response in state if needed
        setNumber(number); // Store the extracted number in state
        setOrderId(orderId); // Store the extracted order ID in state
  
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error in handleSms:', error);
      Alert.alert('Failed', error.message);
    }
  };
  
  
  const cancelSMS = async () => {
    try {
      await cancelApiNumber(test, orderId);
  
      console.log('cancel:', orderId);
      console.log('cancel:', test);
  
      // Reset state variables
      setNumber(null); // or setNumber('') if you prefer an empty string
      setResponseCode(''); // Reset response code
  
    } catch (error) {
      console.error('Error in cancelSMS:', error);
      Alert.alert('Failed', error.message);
    }
  };
  
  const getCode = async () => {
    try {
     const hallo =   await getSmscode(test, orderId);
    const responseText = hallo.data
        console.log('reponse:', responseText); 
        if (responseText === "WAITING"){
            setResponseCode("Druk mij weer over 10 secondes!")

        }else {
            setResponseCode(hallo.data)
        }
    } catch (error) {
      console.error('Error in handleSms:', error);
      Alert.alert('Failed', error.message);
    }
  };
  
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
    <Text style={styles.heading}>SMS</Text>
  
    {/* Message Display */}
    <Text style={styles.message}>
      {(() => {
        if (number) {
          return `Message: 0${number}`;
        } else {
          return 'Message: No message';
        }
      })()}
    </Text>
  
    {/* Code Display */}
    <Text style={styles.code}>
      {(() => {
        if (responseCode) {
          return `Code: ${responseCode}`;
        } else {
          return 'Code: No code';
        }
      })()}
    </Text>
  
    {/* Submit button */}
    <TouchableOpacity style={styles.button} onPress={handleSms}>
      <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>
  
    {/* Get Code button */}
    <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={getCode}>
      <Text style={[styles.buttonText, styles.buttonOutlineText]}>Get Code</Text>
    </TouchableOpacity>
  
    {/* Cancel button */}
    <TouchableOpacity style={[styles.buttonCancel, styles.buttonOutlineCancel]} onPress={cancelSMS}>
      <Text style={[styles.buttonText, styles.buttonOutlineTextCancel]}>Cancel</Text>
    </TouchableOpacity>
  </View>
  
  
  );
}
