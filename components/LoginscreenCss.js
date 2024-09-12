// components/LoginScreen.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa', // Light background color
  },
  title: {
    fontSize: 28, // Slightly larger font size
    fontWeight: 'bold', // Bold title
    color: '#343a40', // Darker text color for better readability
    marginBottom: 24, // Increased margin for better spacing
    textAlign: 'center',
  },
  input: {
    height: 50, // Increased height for better usability
    borderColor: '#ced4da', // Slightly darker border color
    borderWidth: 1,
    borderRadius: 8, // More rounded corners
    paddingHorizontal: 16, // Added horizontal padding for better text placement
    marginBottom: 16, // Increased margin for better spacing
    backgroundColor: '#ffffff', // White background for input
    shadowColor: '#00000029', // Subtle shadow for depth
    shadowOffset: { width: 0, height: 1 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 2, // Shadow radius
  },
  inputToprow: {
    height: 50, // Consistent height with other inputs
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#00000029',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default styles;
