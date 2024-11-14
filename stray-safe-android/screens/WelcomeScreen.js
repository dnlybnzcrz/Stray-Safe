import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const images = [
  require('../assets/welcome1.png'), // Replace with your actual image paths
  require('../assets/welcome2.png'),
  require('../assets/welcome3.png'),
];

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const fadeAnimCurrent = useRef(new Animated.Value(1)).current; // Current image starts fully visible
  const fadeAnimNext = useRef(new Animated.Value(0)).current; // Next image starts fully transparent

  const fadeToNextImage = () => {
    // Fade out the current image and fade in the next image at the same time
    Animated.parallel([
      Animated.timing(fadeAnimCurrent, {
        toValue: 0, // Fade out current image
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimNext, {
        toValue: 1, // Fade in next image
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Update indices after animation completes
      setCurrentIndex(nextIndex);
      setNextIndex((nextIndex + 1) % images.length);

      // Reset fade values for the next transition
      fadeAnimCurrent.setValue(1);
      fadeAnimNext.setValue(0);
    });
  };

  useEffect(() => {
    const interval = setInterval(fadeToNextImage, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Current Image */}
      <Animated.Image
        source={images[currentIndex]}
        style={[styles.image, { opacity: fadeAnimCurrent }]}
      />

      {/* Next Image with Fade-in Effect */}
      <Animated.Image
        source={images[nextIndex]}
        style={[styles.image, { opacity: fadeAnimNext }]}
      />

      {/* Ombre gradient overlay for the bottom 1/4 of the screen */}
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.9 }}
        style={styles.gradientOverlay}
      />

      {/* Overlay containing text and buttons */}
      <View style={styles.overlayContent}>
        <Text style={styles.title}>Together, we can make every street a kinder place for stray animals.</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.signUpButton]}
            onPress={() => navigation.navigate('SignUpScreen')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.signInButton]}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={[styles.buttonText, styles.signInButtonText]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: height,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 1.2, 
  },
  overlayContent: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 1,
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#fff',
  },
  signInButton: {
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInButtonText: {
    color: '#fff',
  },
});
