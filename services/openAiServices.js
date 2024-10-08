// services/authService.js
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Base URL of your backend
const API_URL = 'http://172.20.10.2:3000'; // Replace with your machine's IP address

// Function to handle login

export const message = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/ai-response`, {
      message
    });

  


    return response;
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



