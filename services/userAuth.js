import axios from 'axios';

export const getUser = async (tokenUser) => {
  try {
    // Make the authenticated request
    const response = await axios.get('http://172.20.10.6:3000/protected', {
      headers: {
        'Authorization': `Bearer ${tokenUser}`,
      },
    });
    
    // Return the user data from the API
    return response.data;

  } catch (error) {
    // Log the error details for debugging
    console.error('Error fetching protected data:', error.message);

    // Define a fallback error message if none is provided
    const errorMessage = error.response?.data?.message || 'Failed to fetch protected data';

    // Throw a more informative error
    throw new Error(errorMessage);
  }
}
