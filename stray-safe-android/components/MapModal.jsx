import { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

import styles from '@/assets/styles';
import pawIcon from "@/assets/images/common/paw-icon.png";

export default function MapModal({ isMapVisible, setIsMapVisible, setAddress, setLoadingLocation }) {
  const [markerLocation, setMarkerLocation] = useState(defaultLocation);

  const handleConfirmLocation = async () => {
    setLoadingLocation(true);
    try {
      const response = await Location.reverseGeocodeAsync({
        latitude: markerLocation.latitude,
        longitude: markerLocation.longitude,
      });

      const formattedAddress = `${response[0]?.street || ''}, ${response[0]?.city || ''}, ${response[0]?.region || ''}`;

      setAddress(formattedAddress.trim());
      setIsMapVisible(false);
    } catch (error) {
      console.error('Error getting address:', error);
      Alert.alert('Error', 'Unable to fetch address. Please try again.');
    } finally {
      setLoadingLocation(false);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
      setAddress(reverseGeocode[0]?.street || 'Add Location');
    })();
  }, []);

  return <Modal visible={isMapVisible} animationType="slide">
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={defaultLocation}
        onRegionChangeComplete={(region) => setMarkerLocation(region)}
      />
      <View style={styles.pinContainer}>
        <Image
          source={pawIcon}
          style={styles.pawIcon}
        />
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmLocation}
      >
        <Text style={styles.confirmButtonText}> Confirm Location </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.closeMapButton}
        onPress={() => setIsMapVisible(false)}
      >
        <Ionicons name="close" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  </Modal>
}

const defaultLocation = {
  latitude: 14.6261,
  longitude: 121.0423,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};