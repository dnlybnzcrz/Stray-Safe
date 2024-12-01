import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Text, TextInput, View, Image, ImageBackground, TouchableOpacity } from 'react-native';

import { color } from '@/assets/theme';
import styles from '@/assets/styles';
import illustration from '@/assets/images/common/illustration.png';
import wallpaper3 from '../assets/images/common/wallpaper3.jpg';
import logo from '@/assets/images/common/logo.png';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const requestData = {
      username: username,
      password: password
    }

    router.navigate('feed');
  }

  const handleSignUp = () => {
    router.navigate('signup');
  }

  return (
    <ImageBackground source={wallpaper3} style={styles.backgroundImage}>
      <View style={{ height: "100%", backgroundColor: "rgba(255, 255, 255, 0.4)" }}>
        <Image source={logo} style={[styles.logo, { marginTop: "15%" }]} />

        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}> Log In </Text>
            <Image source={illustration} style={{ width: "80%", height: "35%", resizeMode: "contain", marginBottom: "20px" }} />

            <TextInput
              style={styles.input}
              placeholder='Username'
              placeholderTextColor={color.textSecondary}
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              secureTextEntry placeholder='Password'
              placeholderTextColor={color.textSecondary}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
              <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignUp}>
              <Text style={{ color: color.textSecondary, fontSize: 16 }}> Dont have an account?
                <Text style={{ fontWeight: "bold", fontSize: 16, textDecorationLine: "underline", color: color.textPrimary }}> Sign Up! </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}