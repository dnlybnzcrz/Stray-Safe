import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { usePostContext } from '../context/PostContext'; // Import PostContext
import { theme } from '../theme';

export default function ReportPetScreen({ navigation, route }) {
  const { addPost } = usePostContext(); // Access addPost function from PostContext
  const [postContent, setPostContent] = useState('');
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [postType, setPostType] = useState(
    route.params?.type
      ? route.params.type.replace(/([a-z])([A-Z])/g, '$1 $2')
          .charAt(0)
          .toUpperCase() + route.params.type.replace(/([a-z])([A-Z])/g, '$1 $2').slice(1)
      : ''
  );

  useEffect(() => {
    if (route.params?.location && route.params?.address) {
      setLocation(route.params.location);
      setAddress(route.params.address);
    }
  }, [route.params]);

  const formatPhoneNumber = (number) => {
    let sanitizedNumber = number.replace(/[^\d+]/g, '');

    if (!sanitizedNumber.startsWith('+63')) {
      sanitizedNumber = `+63${sanitizedNumber.replace(/^\+63/, '')}`;
    }

    sanitizedNumber = sanitizedNumber.slice(0, 13); // Max length for valid format

    const formattedNumber = sanitizedNumber
      .replace(/^(\+63)(\d{0,3})/, '$1 $2')
      .replace(/(\d{3})(\d{0,3})/, '$1 $2')
      .replace(/(\d{3})(\d{0,4})$/, '$1 $2');

    return formattedNumber.trim();
  };

  const handleContactChange = (input) => {
    const formatted = formatPhoneNumber(input);
    setContactNumber(formatted);
  };

  const handleAddPhoto = async () => {
    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!pickerResult.canceled) {
        setSelectedMedia((prevMedia) => [
          ...prevMedia,
          pickerResult.uri || pickerResult.assets[0].uri,
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while selecting the media.');
      console.error('Media Picker Error:', error);
    }
  };

  const handleAddLocation = async () => {
    setLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to add a location.');
        setLoadingLocation(false);
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });

      let [reversedAddress] = await Location.reverseGeocodeAsync({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });

      let formattedAddress = `${reversedAddress.name || ''} ${
        reversedAddress.street || ''
      }, ${reversedAddress.city || ''}, ${reversedAddress.region || ''}, ${
        reversedAddress.country || ''
      }`;
      setAddress(formattedAddress.trim());
    } catch (error) {
      Alert.alert('Error', 'Could not fetch the location. Please try again.');
      console.error(error);
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleRemoveMedia = (index) => {
    const updatedMedia = [...selectedMedia];
    updatedMedia.splice(index, 1);
    setSelectedMedia(updatedMedia);
  };

  const handlePost = () => {
    if (!location) {
      Alert.alert('Missing Location', 'Please add a location for the pet.');
      return;
    }

    if (!contactNumber.trim() || !contactNumber.startsWith('+63')) {
      Alert.alert('Invalid Contact', 'Please enter a valid contact number starting with +63.');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      image: selectedMedia.length > 0 ? { uri: selectedMedia[0] } : null,
      location: address || 'Location not specified',
      postContent: postContent || 'No content provided.',
      contactNumber: contactNumber || 'No contact number provided.',
      likes: 0,
      comments: [],
      shares: 0,
      type: postType.toLowerCase().replace(/\s+/g, ''), // Normalize type
    };

    console.log('New Post:', newPost); // Debugging: Log the new post
    addPost(newPost); // Add the new post to the context
    navigation.goBack(); // Navigate back to FeedScreen
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.postType}>{postType}</Text>
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Input Section */}
      <View style={styles.inputSection}>
        <Image
          source={require('../assets/sidebar.png')}
          style={styles.profileImage}
        />
        <TextInput
          style={styles.input}
          placeholder="What's happening?"
          placeholderTextColor={theme.colors.textSecondary}
          multiline
          value={postContent}
          onChangeText={setPostContent}
        />
      </View>

      {/* Media Section */}
      {selectedMedia.length > 0 && (
        <View style={styles.mediaContainer}>
          {selectedMedia.map((uri, index) => (
            <View key={index} style={styles.mediaWrapper}>
              <Image source={{ uri: uri }} style={styles.mediaPreview} />
              <TouchableOpacity
                style={styles.removeMediaButton}
                onPress={() => handleRemoveMedia(index)}
              >
                <Ionicons name="close" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Add Location Button */}
      <TouchableOpacity
        style={styles.locationButton}
        onPress={handleAddLocation}
        disabled={loadingLocation}
      >
        {loadingLocation ? (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        ) : (
          <View style={styles.locationContent}>
            <Ionicons name="location-outline" size={20} color={theme.colors.primary} />
            <Text style={styles.locationText}>
              {location ? `Location: ${address}` : 'Add location'}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Add Contact Number */}
      <View style={styles.contactRow}>
        <Ionicons name="call-outline" size={20} color={theme.colors.primary} />
        <TextInput
          style={styles.contactInput}
          placeholder="Add contact number"
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType="phone-pad"
          value={contactNumber}
          onChangeText={handleContactChange}
        />
      </View>

      {/* Add Media Button */}
      <TouchableOpacity style={styles.addMediaButton} onPress={handleAddPhoto}>
        <Ionicons name="image-outline" size={20} color="#FFF" />
        <Text style={styles.addMediaText}>Add Media</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelText: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  postType: {
    fontSize: 18,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    flex: 1,
    fontWeight: 'bold',
  },
  postButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  postButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  input: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    flex: 1,
    padding: 5,
  },
  mediaContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  mediaWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  mediaPreview: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  removeMediaButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 5,
  },
  addMediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
  addMediaText: {
    marginLeft: 10,
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 10,
    fontSize: 16,
    color: theme.colors.primary,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
  },
  contactInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: theme.colors.textPrimary,
  },
});
