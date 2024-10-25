import React, { useState, useCallback } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/TabNavigator'; // Import the DrawerNavigator
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6F61" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <DrawerNavigator /> // Use DrawerNavigator when logged in
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
