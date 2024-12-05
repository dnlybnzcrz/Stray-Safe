import * as FileSystem from 'expo-file-system';
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_LOCAL_API_URL;

const getPosts = async ( type ) => {
  const requestData = {
    type: type
  }

  try {
    const response = await axios.post(`${API_URL}/api/post/get`, requestData);

    return response.data;
  } catch (error) {
    return null;
  }
}

const getImage = async ( imageId ) => {
  const requestData = {
    imageId: imageId
  }

  try {
    const response = await axios.post(`${API_URL}/api/data/get/image`, requestData);

    if (response.data.image) {
      const base64 = response.data.image;
      const fileUri = FileSystem.cacheDirectory + `img${imageId}.jpg`;
      console.log("test 1")

      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return fileUri;
    }
  } catch (error) {
    return null;
  }
}

const createPost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}/api/post/create`, postData);

    return response.data;
  } catch (error) {
    console.error(error)
    return null;
  }
}

const uploadImage = async (media, userData) => {
  try {
    // Check if base64 is present and properly formatted
    if (!media || !media.base64) {
      console.error('Invalid media or base64 data');
      return;
    }

    // Remove the data URL prefix if it exists
    let base64 = media.base64.startsWith('data:image/png;base64,')
      ? media.base64.split(',')[1]
      : media.base64;

    // Check if base64 data is still valid
    if (!base64 || base64.trim() === '') {
      console.error('Base64 data is empty or invalid');
      return;
    }

    // Form the correct fileUri path
    const fileUri = FileSystem.cacheDirectory + 'image.png'; // Ensure the path is valid

    // Write the base64 string as a file
    await FileSystem.writeAsStringAsync(fileUri, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const formData = new FormData();
    formData.append('image', {
      uri: fileUri,
      name: 'image.png',
      type: 'image/png',
    });
    formData.append('author', userData.user_id);

    // Upload the image
    const response = await axios.post(`${API_URL}/api/data/upload/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    return null;
  }
};

export default {
  getImage,
  createPost,
  getPosts,
  uploadImage
};