import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { theme } from '../theme'; // Import the theme object

export default function ReportPetScreen({ navigation }) {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePost = () => {
    // Handle post logic here, such as sending data to a server or updating state
    console.log('Post content:', postContent);
    if (selectedImage) {
      console.log('Selected media:', selectedImage);
    }
    navigation.goBack();
  };

  const pickImage = async () => {
    // Ask for permission to access media library
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission to access media library is required!');
      return;
    }

    // Launch image picker
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePost} style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Image
          source={require('../assets/sidebar.png')} // Ensure this path matches your project structure
          style={styles.profilePlaceholder}
        />
        <TextInput
          style={styles.input}
          placeholder="Report a Pet?"
          placeholderTextColor={theme.colors.textSecondary}
          multiline
          value={postContent}
          onChangeText={setPostContent}
        />
      </View>

      {/* Display selected image if available */}
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.previewImage} />
      )}

      {/* Button to pick photo/video */}
      <TouchableOpacity style={styles.mediaButton} onPress={pickImage}>
        <Text style={styles.mediaButtonText}>Add Photo/Video</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
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
  postButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  postButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profilePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: theme.colors.textPrimary,
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginTop: 20,
  },
  mediaButton: {
    backgroundColor: theme.colors.primary,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  mediaButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
