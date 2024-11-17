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
import { usePostContext } from '../context/PostContext'; // Import PostContext
import { theme } from '../theme'; // Import the theme object

const strayCatLocations = [
  { id: '1', latitude: 14.62780260343709, longitude: 121.03551786228103, title: 'Cat 1', description: 'Stray cat spotted here' },
  { id: '2', latitude: 14.631238713795275, longitude: 121.04116122990891, title: 'Cat 2', description: 'Cat found near the park' },
  { id: '3', latitude: 14.625975525875248, longitude: 121.0365585593531, title: 'Cat 3', description: 'Cat spotted in the alley' },
];

export default function MapScreen() {
  const navigation = useNavigation();
  const { posts } = usePostContext(); // Access posts from PostContext
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Request location permissions
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Denied',
            'Permission to access location was denied'
          );
          setError('Permission denied');
          return;
        }

        // Get the user's current location
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (err) {
        Alert.alert('Error', 'Unable to fetch location');
        setError('Location fetch failed');
      }
    })();
  }, []);

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!userLocation) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading map...</Text>
      </View>
    );
  }

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
        initialRegion={userLocation}
        showsUserLocation={true} // Show the user's current location
      >
        {/* Display stray cat markers */}
        {strayCatLocations.map((cat) => (
          <Marker
            key={cat.id}
            coordinate={{ latitude: cat.latitude, longitude: cat.longitude }}
            title={cat.title}
            description={cat.description}
            image={require('../assets/paw-icon.png')} // Use the custom paw icon
          />
        ))}

        {/* Display user post locations */}
        {postLocations.map((post) => (
          <Marker
            key={post.id}
            coordinate={{ latitude: post.latitude, longitude: post.longitude }}
            title={post.title}
            description={post.description}
            pinColor="blue" // Custom pin color for user posts
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
