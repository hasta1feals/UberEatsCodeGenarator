import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  message: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  code: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#ff4d4d',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: '#007bff',
    backgroundColor: 'transparent',
  },
  buttonOutlineCancel: {
    borderWidth: 2,
    borderColor: '#ff4d4d',

  },
  buttonOutlineText: {
    color: '#007bff',
  },
  buttonOutlineTextCancel: {
    color: '#FFFFFF',
  },
});

export default styles;
