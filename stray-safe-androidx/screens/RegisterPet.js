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
  ActivityIndicator,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { theme } from '../theme';

const petBreeds = {
  Dog: ['Labrador', 'Golden Retriever', 'German Shepherd', 'Poodle', 'Others'],
  Cat: ['Siamese', 'Persian', 'Maine Coon', 'Bengal', 'Others'],
};

export default function RegisterPet() {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('Dog');
  const [petBreed, setPetBreed] = useState('');
  const [customBreed, setCustomBreed] = useState('');
  const [ownerContact, setOwnerContact] = useState('');
  const [petImage, setPetImage] = useState(null);
  const [loading, setLoading] = useState(false);

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
    if (!petName || !petType || (!petBreed && !customBreed) || !ownerContact || !petImage) {
      Alert.alert('Incomplete Details', 'Please fill out all fields and upload a pet image before submitting.');
      return;
    }
    if (!/^[0-9]+$/.test(ownerContact) || ownerContact.length < 8) {
      Alert.alert('Invalid Contact', 'Please enter a valid phone number.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Your pet has been registered successfully!');
      setPetName('');
      setPetType('Dog');
      setPetBreed('');
      setCustomBreed('');
      setOwnerContact('');
      setPetImage(null);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <Text style={styles.title}>Register Your Pet</Text>
      <TouchableOpacity style={styles.imageContainer} onPress={handleAddPhoto}>
        {petImage ? (
          <Image source={{ uri: petImage }} style={styles.petImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="camera-outline" size={50} color={theme.colors.primary} />
            <Text style={styles.imageText}>Tap to Add Pet Photo</Text>
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
        <Picker
          selectedValue={petType}
          onValueChange={(itemValue) => {
            setPetType(itemValue);
            setPetBreed('');
            setCustomBreed('');
          }}
          style={styles.picker}
        >
          <Picker.Item label="Dog" value="Dog" />
          <Picker.Item label="Cat" value="Cat" />
        </Picker>
        <Picker
          selectedValue={petBreed}
          onValueChange={(itemValue) => {
            setPetBreed(itemValue);
            if (itemValue !== 'Others') {
              setCustomBreed('');
            }
          }}
          style={styles.picker}
          enabled={!!petBreeds[petType]}
        >
          {petBreeds[petType]?.map((breed) => (
            <Picker.Item key={breed} label={breed} value={breed} />
          ))}
        </Picker>
        {petBreed === 'Others' && (
          <TextInput
            style={styles.input}
            placeholder="Please specify the breed"
            placeholderTextColor={theme.colors.textSecondary}
            value={customBreed}
            onChangeText={setCustomBreed}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Owner Contact Number"
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
          value={ownerContact}
          onChangeText={setOwnerContact}
        />
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPet} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Ionicons name="checkmark-circle-outline" size={20} color="#FFF" />}
        <Text style={styles.registerButtonText}>Register Pet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 20, textAlign: 'center' },
  imageContainer: { alignSelf: 'center', width: 160, height: 160, borderRadius: 80, backgroundColor: theme.colors.lightGrey, justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 2, borderColor: theme.colors.primary },
  petImage: { width: '100%', height: '100%', borderRadius: 80 },
  imagePlaceholder: { justifyContent: 'center', alignItems: 'center' },
  imageText: { marginTop: 10, fontSize: 14, fontWeight: 'bold', color: theme.colors.primary },
  inputContainer: { marginBottom: 20 },
  input: { borderWidth: 1, borderColor: theme.colors.highlight, borderRadius: 10, padding: 15, fontSize: 16, color: theme.colors.textPrimary, marginBottom: 15, backgroundColor: '#FFF' },
  picker: { marginBottom: 15, backgroundColor: '#FFF', borderRadius: 10 },
  registerButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.primary, paddingVertical: 15, borderRadius: 10, elevation: 3 },
  registerButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
});
