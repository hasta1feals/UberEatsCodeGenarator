// components/LoginScreen.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f8f9fa',
      },
      header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 24,
        textAlign: 'center',
      },
      token: {
        fontSize: 18,
        color: '#495057',
        marginBottom: 16,
        textAlign: 'center',
      },
      info: {
        fontSize: 16,
        color: '#6c757d',
        marginBottom: 8,
        textAlign: 'center',
      },
});

export default styles;
