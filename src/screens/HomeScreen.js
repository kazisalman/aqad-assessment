import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getUsers } from '../database/schema';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchEmailAndUserData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        console.log("storedEmail",storedEmail)
        setEmail(storedEmail);
  
        if (storedEmail) {
          getLocalUserData(storedEmail);
        }
      } catch (error) {
        console.log("homescreen error",error)
      }
    };

    fetchEmailAndUserData();
  }, []);

 

  const getLocalUserData = (email) => {
    getUsers(users => {
      const user = users.find(u => u.email === email);
      if (user) {
        setUserData(user);
        console.log('User found locally:', user);
      } else {
        console.log('User not found in local database');
      }
    });
  };



  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to the Home Screen!!!</Text>
      {userData && (
        <Text style={styles.userInfo}>
          User Info: {userData?.name} ({userData?.email})
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfo: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default HomeScreen;
