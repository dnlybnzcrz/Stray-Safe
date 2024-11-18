import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { usePostContext } from '../context/PostContext';
import { theme } from '../theme';

export default function MapScreen() {
  const navigation = useNavigation();
  const { posts } = usePostContext();

  // Default location: Barangay Sacred Heart, Kamuning, Quezon City
  const defaultLocation = {
    latitude: 14.6261,
    longitude: 121.0423,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const [userLocation, setUserLocation] = useState(defaultLocation); // Default to Barangay Sacred Heart
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Request location permissions
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Denied',
            'Permission to access location was denied. Default location will be used.'
          );
          setError('Permission denied');
          return;
        }

        // Get the user's current location
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } catch (err) {
        Alert.alert('Error', 'Unable to fetch location. Default location will be used.');
        setError('Location fetch failed');
      }
    })();
  }, []);

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  // Extract valid locations from posts
  const postLocations = posts
    .map((post) => ({
      id: post.id,
      latitude: post.location?.latitude,
      longitude: post.location?.longitude,
      title: post.type,
      description: post.location?.address || 'No address provided',
    }))
    .filter((post) => post.latitude && post.longitude); // Filter out invalid locations

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={openDrawer} style={styles.iconContainer}>
            <Image
              source={require('../assets/sidebar.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/LOGO.png')}
              style={styles.logoImage}
            />
          </View>
        </View>
      </View>

      <MapView
        style={styles.map}
        initialRegion={userLocation} // Start with user's location or default
        showsUserLocation={true} // Show the user's current location
      >
        {/* Display user post locations */}
        {postLocations.map((post) => (
          <Marker
            key={post.id}
            coordinate={{ latitude: post.latitude, longitude: post.longitude }}
            title={post.title}
            description={post.description}
            image={require('../assets/paw-icon.png')} // Use the custom paw icon
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'column',
    height: 100,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: theme.colors.primary,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: 40,
    resizeMode: 'contain',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
