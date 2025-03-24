import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { color } from '@/assets/theme';
import styles from '@/assets/styles';
import illustration from '@/assets/images/common/illustration.png';
import wallpaper3 from '../assets/images/common/wallpaper3.jpg';
import logo from '@/assets/images/common/logo.png';

export default function SignUp() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const requestData = {
        username: username,
        email: email,
        contact_number: contactNo,
        password: password
      }

      navigation.navigate('home');
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogin = () => {
    navigation.navigate('login');
  }

  return <ImageBackground source={wallpaper3} style={styles.ImageBackground}>
    <View style={{ height: "100%", backgroundColor: "rgba(255, 255, 255, 0.4)" }}>
      <Image source={logo} style={[styles.logo, { marginTop: "15%" }]} />

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}> Sign Up </Text>
          <Image source={illustration} style={{ width: "80%", height: "25%", resizeMode: "contain", marginBottom: "20px" }} />

          <TextInput
            style={styles.input}
            placeholder='Username'
            placeholderTextColor={color.textSecondary}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder='Email'
            placeholderTextColor={color.textSecondary}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder='Contact Number'
            placeholderTextColor={color.textSecondary}
            value={contactNo}
            onChangeText={setContactNo}
          />
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder='Password'
            placeholderTextColor={color.textSecondary}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder='Confirm Password'
            placeholderTextColor={color.textSecondary}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.buttonPrimary} onPress={handleSignUp}>
            <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin}>
              <Text style={{ color: color.textSecondary, fontSize: 16 }}> Already have an account?
                <Text style={{ fontWeight: "bold", fontSize: 16, textDecorationLine: "underline", color: color.textPrimary }}> Log In!</Text>
              </Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  </ImageBackground>
}