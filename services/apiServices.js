// services/authService.js
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Base URL of your backend
const API_URL = 'http://172.20.10.6:3000'; // Replace with your machine's IP address

// Function to handle login

export const putAPi = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    const { token } = response.data;

    // Save the token securely using Expo SecureStore
    await SecureStore.setItemAsync('jwtToken', token);

    return token;
  } catch (error) {
    // Extract and log detailed error information
    const status = error.response?.status || 'Unknown status';
    const errorMessage = error.response?.data?.message || error.message || 'Error logging in';
    const errorDetails = error.response?.data || 'No additional details available';

    console.error(`Error occurred during login:
      Status: ${status}
      Message: ${errorMessage}
      Details: ${JSON.stringify(errorDetails)}
    `);

    // Throw a more informative error
    throw new Error(errorMessage);
  }
}


// Function to retrieve the token
export const getToken = async () => {
  return await SecureStore.getItemAsync('jwtToken');
};

// Function to clear the token
export const clearToken = async () => {
  await SecureStore.deleteItemAsync('jwtToken');
};
