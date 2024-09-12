// components/LoginScreen.js
import React, { useState , useEffect} from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { getToken } from '../services/authService';
import { getUser } from '../services/userAuth';
import { putAPi } from '../services/apiServices.js';
import styles from './SettingScreenStyle.js'; // Import the styles

const LoginScreen = ({ navigation }) => {
  const [api_key, setApi_key] = useState('');
  const [id_user, setId_user] = useState('');
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);




  useEffect(() => {
    const fetchTokenAndUser = async () => {
      try {
        const retrievedToken = await getToken(); // Wait for the token
        setToken(retrievedToken);

        const userData = await getUser(retrievedToken); // Wait for user data
        console.log('Fetched user data:', userData); // Log user data to the console
 
        setData(userData);
        setId_user(userData.user.id);
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    };

    fetchTokenAndUser();
  }, []);

LoginScreen
  const handleInsert = async () => {
    try {
      await putAPi(api_key, id_user);
      Alert.alert('Success', 'Send in successfully!');
      // Optionally navigate to another screen
      navigation.navigate('MainTabs', { screen: 'HomeScreen' });

    } catch (error) {
      Alert.alert(' Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set API_KEY</Text>
      <TextInput
        style={styles.input}
        placeholder="API_KEY"
        value={api_key}
        onChangeText={setApi_key}
    
      />

      <Button title="Submit" onPress={handleInsert} />
    </View>
  );
};

export default LoginScreen;
