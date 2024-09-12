import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsers, updateUser } from '../database/schema'; 
import TextInput from '../components/TextInput';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        if (storedEmail) {
          setEmail(storedEmail);
          getUserDetails(storedEmail);
        } else {
          Alert.alert('Error', 'No email found in storage.');
        }
      } catch (error) {
        console.error('Error fetching email from AsyncStorage:', error);
      }
    };

    fetchUserData();
  }, []);

  const getUserDetails = (email) => {
    getUsers(users => {
      const user = users.find(u => u.email === email);
      if (user) {
        setName(user.name);
        setEmail(user.email);
      } else {
        Alert.alert('Error', 'User not found in local database.');
      }
      setLoading(false);
    });
  };

  const handleSave = () => {
    if (name && email) {
      updateUser(email, name, (result) => {
        if (result) {
          Alert.alert('Success', 'Profile updated successfully.');
        } else {
          Alert.alert('Error', 'Failed to update profile.');
        }
      });
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput 
        style={styles.input} 
        value={name} 
        onChangeText={setName} 
        placeholder="Enter your name" 
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput 
        style={styles.input} 
        value={email} 
        onChangeText={setEmail} 
        placeholder="Enter your email" 
        editable={false} // To prevent email from being edited
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default ProfileScreen;
