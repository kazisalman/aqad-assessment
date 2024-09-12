// HeaderButton.js
import React from 'react';
import { Button, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderButton = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('email');
      navigation.navigate('LOGIN'); 
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <View style={{marginRight:13}} >
    <Button
      title="Logout"
      onPress={handleLogout}
    />
      </View>

  );
};

export default HeaderButton;
