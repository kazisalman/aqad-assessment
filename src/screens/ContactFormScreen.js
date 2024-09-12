import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { insertContact } from '../database/schema'; 
import TextInput from '../components/TextInput';

const ContactFormScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    insertContact(name, email, message, success => {
      if (success) {
        Alert.alert('Success', 'Contact message saved successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        Alert.alert('Error', 'Failed to save contact message.');
      }
    });
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Name" 
        value={name} 
        onChangeText={setName}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Message" 
        value={message} 
        onChangeText={setMessage} 
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,

  },
});

export default ContactFormScreen;
