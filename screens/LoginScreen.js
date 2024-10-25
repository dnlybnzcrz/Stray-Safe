import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  KeyboardAvoidingView,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Correct import for Ionicons
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRemembered, setIsRemembered] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('Google login success:', authentication);
      Alert.alert('Success', 'You are logged in with Google!');
      onLogin(); // Proceed with the login
    }
  }, [response, onLogin]); // Include 'onLogin' in the dependency array

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground
        source={require('../assets/wallpaper3.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <Image
              source={require('../assets/LOGO.png')} // Ensure this matches the logo used in the feed screen
              style={styles.logo}
            />
          </View>

          <View style={styles.loginBox}>
            <Text style={styles.title}>Log in</Text>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={() => promptAsync()}
              disabled={!request}
            >
              <Ionicons name="logo-google" size={24} color="white" />
              <Text style={styles.googleButtonText}>Log in with Google</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={setUsername}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity onPress={() => console.log('Forgot password')}>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>

            <View style={styles.rememberMeContainer}>
              <Switch
                value={isRemembered}
                onValueChange={setIsRemembered}
                trackColor={{ false: '#767577', true: '#FF6F61' }}
                thumbColor={isRemembered ? '#FF6F61' : '#f4f3f4'}
              />
              <Text style={styles.rememberMeText}>Remember me</Text>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
              <Text style={styles.loginButtonText}>LOG IN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1, width: width, height: height },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: { marginBottom: 30 },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
  loginBox: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  forgotPassword: { alignSelf: 'flex-end', color: '#3498db', marginTop: 5 },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  rememberMeText: { marginLeft: 5, fontSize: 16, color: '#333' },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#4285F4',
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  googleButtonText: { color: 'white', marginLeft: 10, fontWeight: 'bold', fontSize: 16 },
  loginButton: {
    backgroundColor: '#FF6F61',
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});
