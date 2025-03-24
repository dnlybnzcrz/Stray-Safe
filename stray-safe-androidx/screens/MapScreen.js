import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { usePostContext } from '../context/PostContext';
import { theme } from '../theme';

export default function MapScreen() {
  const navigation = useNavigation();
  const { posts } = usePostContext();

  // Fixed location: Barangay Sacred Heart, Kamuning, Quezon City
  const barangaySacredHeart = {
    latitude: 14.630398409712429,
    longitude: 121.04328523678565,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

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
    .filter((post) => post.latitude && post.longitude); // Ensure valid coordinates

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

      {/* Map View focusing on Barangay Sacred Heart */}
      <MapView
        style={styles.map}
        initialRegion={barangaySacredHeart}
        showsUserLocation={false} // Disabled to keep focus on Barangay Sacred Heart
      >
        {/* Marker at Barangay Sacred Heart */}
        <Marker
          coordinate={barangaySacredHeart}
          title="Barangay Sacred Heart"
          description="Focused area for monitoring"
        />

        {/* Display user post locations */}
        {postLocations.map((post) => (
          <Marker
            key={post.id}
            coordinate={{ latitude: post.latitude, longitude: post.longitude }}
            title={post.title}
            description={post.description}
            image={require('../assets/paw-icon.png')} // Custom paw icon
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
});
