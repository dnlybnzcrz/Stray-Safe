import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

export default function RegisterPet() {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [ownerContact, setOwnerContact] = useState('');
  const [petImage, setPetImage] = useState(null);

  const handleAddPhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert('Permission Denied', 'You need to allow access to your photos.');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!pickerResult.canceled) {
        setPetImage(pickerResult.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while selecting an image.');
      console.error('Image Picker Error:', error);
    }
  };

  const handleRegisterPet = () => {
    if (!petName || !petType || !petBreed || !ownerContact) {
      Alert.alert('Incomplete Details', 'Please fill out all fields before submitting.');
      return;
    }

    Alert.alert('Success', 'Your pet has been registered successfully!');
    setPetName('');
    setPetType('');
    setPetBreed('');
    setOwnerContact('');
    setPetImage(null);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <Text style={styles.title}>Register Your Pet</Text>
      <TouchableOpacity style={styles.imageContainer} onPress={handleAddPhoto}>
        {petImage ? (
          <Image source={{ uri: petImage }} style={styles.petImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="camera-outline" size={40} color={theme.colors.textSecondary} />
            <Text style={styles.imageText}>Add Pet Photo</Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pet Name"
          placeholderTextColor={theme.colors.textSecondary}
          value={petName}
          onChangeText={setPetName}
        />
        <TextInput
          style={styles.input}
          placeholder="Pet Type (e.g., Dog, Cat)"
          placeholderTextColor={theme.colors.textSecondary}
          value={petType}
          onChangeText={setPetType}
        />
        <TextInput
          style={styles.input}
          placeholder="Breed (if applicable)"
          placeholderTextColor={theme.colors.textSecondary}
          value={petBreed}
          onChangeText={setPetBreed}
        />
        <TextInput
          style={styles.input}
          placeholder="Owner Contact Number"
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
          value={ownerContact}
          onChangeText={setOwnerContact}
        />
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPet}>
        <Ionicons name="checkmark-circle-outline" size={20} color="#FFF" />
        <Text style={styles.registerButtonText}>Register Pet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    backgroundColor: theme.colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  petImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    marginTop: 10,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.highlight,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: theme.colors.textPrimary,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  registerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 3,
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
