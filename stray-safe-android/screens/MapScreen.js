import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const strayCatLocations = [
 { id: '1', latitude: 14.62780260343709, longitude: 121.03551786228103, title: 'Cat 1', description: 'Stray cat spotted here' },
  { id: '2', latitude: 14.631238713795275, longitude: 121.04116122990891, title: 'Cat 2', description: 'Cat found near the park' },
  { id: '3', latitude: 14.625975525875248, longitude: 121.0365585593531, title: 'Cat 3', description: 'Cat spotted in the alley' },
];

export default function MapScreen() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        return;
      }

      // Get the user's current location
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 10.0922,
        longitudeDelta: 10.0421,
      });
    })();
  }, []);

  if (!userLocation) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={userLocation}
        showsUserLocation={true} // Show the user's current location
      >
        {/* Display markers for stray cat locations */}
        {strayCatLocations.map(cat => (
          <Marker
            key={cat.id}
            coordinate={{ latitude: cat.latitude, longitude: cat.longitude }}
            title={cat.title}
            description={cat.description}
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
