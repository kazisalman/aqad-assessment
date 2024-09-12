import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import Seperator from '../components/Seperator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInput from '../components/TextInput';


const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
     email: "",
    password: "",
  });

  const handleChange = (name, text) => {
    setFormData({
      ...formData,
      [name]: text,
    });
  };

  const handleLogin = () => {
    auth()
    .signInWithEmailAndPassword(formData?.email, formData?.password)
      .then(() => {
        console.log('User signed in!');
        AsyncStorage.setItem("email",formData?.email)
        setFormData({
          email: "",
        password: "",
        })
        navigation.navigate("HOMESTACK")
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        Alert.alert(error?.message)
      });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData?.email}
        onChangeText={(value) => handleChange("email", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData?.password}
        onChangeText={(value) => handleChange("password", value)}
      />
      <Seperator />

      <Button style title="Login" onPress={handleLogin} />
      <Seperator />
      <Button title="Go to Signup" onPress={() => navigation.navigate('SIGNUP')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 8,
    color: "#000"
  },
});

export default LoginScreen;
