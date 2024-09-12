import React, { useState, useEffect, Suspense, lazy } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ContactFormScreen from '../screens/ContactFormScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HeaderButton from '../components/LogoutButton';
import UserSignupListScreen from '../screens/UserSignupListScreen';

// const HomeScreen = lazy(() => import('../screens/HomeScreen'));
// const DashboardScreen = lazy(() => import('../screens/DashboardScreen'));
// const ContactFormScreen = lazy(() => import('../screens/ContactFormScreen'));
// const ProfileScreen = lazy(() => import('../screens/ProfileScreen'));
// const UserSignupListScreen = lazy(() => import('../screens/UserSignupListScreen'));
const LoginScreen = lazy(() => import('../screens/LoginScreen'));
const SignupScreen = lazy(() => import('../screens/SignupScreen'));

const Tab = createBottomTabNavigator();

const LoadingFallback = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

const TabNavigator = () => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const auth = getAuth();
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Tab.Navigator
        screenOptions={({ navigation }) => ({
          headerRight: () => <HeaderButton navigation={navigation} />,
          tabBarLabelStyle: {
            textAlign: 'center',
            fontSize: 14, // Adjust font size if needed
            paddingBottom: 10, // Adjust padding to align text vertically,
          },
          tabBarStyle: {
            height: 60, // Adjust the height of the tab bar
            paddingBottom: 10, // Padding for better vertical alignment
          
          },
          tabBarItemStyle: {
            justifyContent: 'center', // Center-align items vertically          
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Form" component={ContactFormScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Users" component={UserSignupListScreen} />
      </Tab.Navigator>
    </Suspense>
  )
};

export default TabNavigator;
