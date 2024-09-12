import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { insertUser } from '../database/schema';
import TextInput from '../components/TextInput';


const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (name, text) => {
    setFormData({
      ...formData,
      [name]: text,
    });
  };

  const handleSignup = () => {
    auth()
      .createUserWithEmailAndPassword(formData?.email, formData?.password)
      .then(() => {
        console.log('User account created & signed in!');
        AsyncStorage.setItem("email",formData?.email)
        insertUser(formData?.name, formData?.email, formData?.password, result => {
          console.log('User saved locally', result);
        })
        setFormData({
    name: "",
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

        console.error(error);
      });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={formData?.name}
        onChangeText={(value) => handleChange("name", value)}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={formData?.email}
        onChangeText={(value) => handleChange("email", value)}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={formData?.password}
        onChangeText={(value) => handleChange("password", value)}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="Signup" onPress={handleSignup} />
      <Text style={styles.link} onPress={() => navigation.navigate('LOGIN')}>
        Already have an account? Login here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
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
  link: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'center',
  },
});

export default SignupScreen;
