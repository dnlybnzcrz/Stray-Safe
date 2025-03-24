import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { color } from "@/assets/theme";
import styles from "@/assets/styles";
import webConnection from "@/utils/webConnection";
import smallLogo from "@/assets/images/common/small-logo.png";
import CustomNavigation from "@/components/CustomNavigation";
import MapModal from "@/components/MapModal";

export default function ReportScreen({ route }) {
  const navigation = useNavigation();
  const [type, setType] = useState();
  const [postContent, setPostContent] = useState('');
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [userData, setUserData] = useState({
    "user_id": 4,
    "username": "john_doe",
    "email": "john@example.com",
    "contact_no": "1234567890"
  });

  useEffect(() => {
    setType(route.params.type);
  }, [route])

  useEffect(() => {
    console.log('todo: get user data');
  }, [])

  const onAddMedia = async () => {
    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!pickerResult.canceled && pickerResult.assets) {
        const uri = pickerResult.assets[0].uri;
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

        setSelectedMedia([...selectedMedia, { uri, base64 }]);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while selecting the media.');
      console.error('Media Picker Error:', error);
    }
  };

  const onHandlePost = async () => {
    const imageIds = await Promise.all(selectedMedia.map(async (media) => {
      const response = await webConnection.uploadImage(media, userData);
      return response.imageId;
    }));

    const postData = {
      user_id: userData.user_id,
      type,
      content: postContent,
      location: address,
      image_ids: imageIds
    }

    await webConnection.createPost(postData, imageIds)
      .then(() => {
        navigation.navigate('feed')
      });
  };

  const handleRemoveMedia = (index) => {
    setSelectedMedia(selectedMedia.filter((_, i) => i !== index));
  };

  return <CustomNavigation>
    <View style={[styles.card, { marginHorizontal: "auto", marginTop: 20 }]}>
      <View style={{ borderBottomColor: color.grey, borderBottomWidth: 1, width: "95%", paddingBottom: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}> Create {type} post</Text>
      </View>
      <View style={{ width: "100%", display: 'flex', flexDirection: "row" }}>
        <Image source={smallLogo} style={{ width: 50, height: 50, resizeMode: 'contain', marginTop: 20, marginHorizontal: 8 }} />
        <TextInput style={{ backgroundColor: "#EBEBEB", marginTop: 20, padding: 16, borderRadius: 16, textAlignVertical: "top", flex: 1 }}
          placeholder="What's happening?"
          multiline
          value={postContent}
          onChangeText={setPostContent}
        >
        </TextInput>
      </View>

      {/* Media Section */}
      {selectedMedia.length > 0 && (
        <View style={styles.mediaContainer}>
          {selectedMedia.map((media, index) => (
            <View key={index} style={styles.mediaWrapper}>
              <Image source={{ uri: media.uri }} style={styles.mediaPreview} />
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

      {/* Location */}
      <TouchableOpacity
        style={styles.locationButton}
        onPress={() => setIsMapVisible(true)}
        disabled={loadingLocation}
      >
        <View style={styles.locationContent}>
          <Ionicons name="location-outline" size={20} color={color.accent} />
          <Text style={styles.locationText}>{address || 'Add Location'}</Text>
        </View>
      </TouchableOpacity>

      {/* Media and posting */}
      <View style={{ display: "flex", flexDirection: "row", marginLeft: "auto" }}>
        <TouchableOpacity style={styles.addMediaButton} onPress={onAddMedia}>
          <Ionicons name="image-outline" size={20} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onHandlePost()} style={[styles.addMediaButton, { marginLeft: 8 }]}>
          <Text style={{ color: color.white, fontWeight: "bold", fontSize: 16 }}> Post </Text>
        </TouchableOpacity>
      </View>
    </View>

    <MapModal
      isMapVisible={isMapVisible}
      setIsMapVisible={setIsMapVisible}
      setLoadingLocation={setLoadingLocation}
      setAddress={setAddress}
    />
  </CustomNavigation>
}