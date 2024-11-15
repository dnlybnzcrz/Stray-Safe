import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Touchable, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation()

  return (
    <ImageBackground
      source={require('../assets/wallpaper3.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Semi-transparent overlay */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>Your Profile</Text>
        {/* Profile content goes here */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: theme.dimensions.width,
    height: theme.dimensions.height,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // 30% opacity
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    ...theme.fonts.titleFont,
    color: theme.colors.primary, // Coral color
  },
  loginButton: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
