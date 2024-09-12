import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import TabNavigator from './src/navigation/TabNavigator';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        if (email) {
          setInitialRoute('HOMESTACK');
        } else {
          setInitialRoute('LOGIN');
        }
      } catch (error) {
        console.error('Failed to load user login status:', error);
        setInitialRoute('LOGIN');
      }
    };

    checkLoginStatus();
  }, []);

  if (!initialRoute) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="LOGIN"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SIGNUP"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HOMESTACK"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
