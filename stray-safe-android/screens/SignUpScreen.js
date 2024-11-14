import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import api from '../api'; // Import the Axios instance

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const requestData = {
        username: username,
        email: "qdycruz@tip.edu.ph",
        password: password,
        contact_number: phoneNumber,
      }
  
      console.log("Sending sign up request..."); // Debug statement
      const response = await axios.post("http://10.0.2.2:3000/api/user/signup", requestData);
      console.log("Response received:", response); // Debug statement
  
      navigation.goBack(); // Redirect to login if successful
    } catch (error) {
      console.error('Error during sign up:', error.response ? error.response.data : error);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/wallpaper3.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Image
          source={require('../assets/LOGO.png')}
          style={styles.logo}
        />
        <View style={styles.card}>
          <Text style={styles.header}>Sign Up</Text>
          <Image
            source={require('../assets/illustration.png')}
            style={styles.illustration}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.loginRedirectText}>
              Already have an account? <Text style={styles.loginRedirectLink}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(250, 244, 235, 0.7)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 500,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  card: {
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  illustration: {
    width: 250,
    height: 160,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F2D8B1',
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  signUpButton: {
    width: '100%',
    backgroundColor: '#5EBD3E',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  signUpButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginRedirectText: {
    color: '#333',
    fontSize: 14,
  },
  loginRedirectLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#5EBD3E',
  },
});
