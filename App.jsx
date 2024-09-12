/* eslint-disable semi */
// Main App file 
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { initializeDatabase } from './src/services/dbService';
import MainNavigator from './AppNavigation'

const App = () => {
  useEffect(() => {
    // Initialize SQLite Database
    initializeDatabase();

    // Ignore specific warnings (optional)
    LogBox.ignoreLogs(['Setting a timer']);
  }, []);


  return (
    <MainNavigator />
  );
};

export default App;
