// services/authService.js
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Base URL of your backend
const API_URL = 'http://172.20.10.6:3000'; // Replace with your machine's IP address

// Function to handle login

export const putAPi = async (api_key, id_user) => {
  try {
    const response = await axios.post(`${API_URL}/api`, {
      api_key,
      id_user,
    });

    const message = "Succes";

    // Save the token securely using Expo SecureStore
    return message;
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

export const getApiNumber = async (juicyApiKey) => {
  try {
    const response = await axios.get(
      `https://juicysms.com/api/makeorder?key=${juicyApiKey}&serviceId=3&country=NL`
    );

    // Check if the response data exists and is what you expect
    if (response?.data) {
      console.log('API Response:', response.data); // Log the response for debugging
      return response; // Return the relevant data part of the response
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    // Simplify and clarify error handling
    const status = error.response?.status || 'Unknown status';
    const errorMessage = error.response?.data?.message || error.message || 'Error occurred';
    
    console.error(`Error fetching API number: 
      Status: ${status}, 
      Message: ${errorMessage}
    `);

    // Throw a more informative error
    throw new Error(`Failed to fetch API number: ${errorMessage}`);
  }
};



export const getApiKey = async (id ) => {
  try {
    const response = await axios.get(`${API_URL}/api/${id}`, {
    
    });

    // Save the token securely using Expo SecureStore
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

