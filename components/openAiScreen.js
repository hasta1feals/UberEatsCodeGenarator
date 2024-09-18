import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, Alert,ScrollView ,ActivityIndicator, KeyboardAvoidingView,Platform, scrollViewRef} from 'react-native';
import styles from './openAiStyle.js'; // Import the styles


import { message } from '../services/openAiServices.js';

export default function OpenAiScreen({navigation}) {
  const [input, setInput] = useState(null);
  const [messages, setMessages] = useState([]); // To store the conversation
  const scrollViewRef = useRef(null); // Ref to scroll the view
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    const fetchTokenAndUser = async () => {
      try {
  
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

 
  }, []);


   
  
  
  const sendMessage = async () => {
    setLoading(true);
    try {
      const response = await message(input);
      const responseText = response.data.message;
  

      const updatedMessages = [...messages]; // Copy the current messages
  
      // Add the user's message
      if (input) {
        updatedMessages.push({ text: input, sender: 'user' });
      }
  
      // Add the bot's response
      if (responseText) {
        updatedMessages.push({ text: responseText, sender: 'bot' });
      }
  
      setMessages(updatedMessages); // Update the state with the new array of messages
      setInput(''); // Clear the input field after sending
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) {
    return (
        <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.chatBox}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg, index) => {
  let messageStyle;

 
  if (msg.sender === 'user') {
    messageStyle = styles.userMessage;  
  } else {
    messageStyle = styles.botMessage;   
  }

  return (
    <View key={index} style={messageStyle}>
      <Text>{msg.text}</Text>
    </View>
  );
})}

        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
          />
          <Button title="Send" onPress={() => sendMessage()} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

