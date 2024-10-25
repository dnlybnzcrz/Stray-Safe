import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import FeedScreen from '../screens/FeedScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MapScreen from '../screens/MapScreen';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function CustomHeader({ navigation, selectedTab, setSelectedTab }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        {/* Profile Icon */}
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.iconContainer}>
          <Image
            source={require('../assets/sidebar.png')} 
            style={styles.profileImage}
          />
        </TouchableOpacity>

        {/* App Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/LOGO.png')} 
            style={styles.logoImage}
          />
        </View>

        {/* Search Icon */}
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="search-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Tabs Below Header */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Missing' && styles.activeTab]}
          onPress={() => setSelectedTab('Missing')}
        >
          <Text style={[styles.tabText, selectedTab === 'Missing' && styles.activeTabText]}>Missing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Found' && styles.activeTab]}
          onPress={() => setSelectedTab('Found')}
        >
          <Text style={[styles.tabText, selectedTab === 'Found' && styles.activeTabText]}>Found</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Following' && styles.activeTab]}
          onPress={() => setSelectedTab('Following')}
        >
          <Text style={[styles.tabText, selectedTab === 'Following' && styles.activeTabText]}>Following</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TabNavigator() {
  const [selectedTab, setSelectedTab] = useState('Missing');

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Feed') {
            iconName = 'paw';
          } else if (route.name === 'Notifications') {
            iconName = 'notifications';
          } else if (route.name === 'Map') {
            iconName = 'map';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
          height: 90,
          paddingBottom: 30,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={({ navigation }) => ({
          tabBarLabel: 'Feed',
          headerTitle: '',
          header: () => (
            <CustomHeader
              navigation={navigation}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          headerTitle: 'Map of Stray Animals',
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Notifications',
          headerTitle: 'Notifications',
        }}
      />
    </Tab.Navigator>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'left',
        drawerType: 'slide',
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: 'Profile',
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    height: 140, // Height adjusted to fit all content
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#FF6F61', // Theme color for the header
    borderBottomWidth: 1, // Adding a border below the entire header
    borderBottomColor: '#ddd', // Color of the border below the header
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
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  logoContainer: {
    flex: 1,
    paddingTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#FF6F61', // Same color as the header
    paddingVertical: 3,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  tabText: {
    color: 'white',
    fontSize: 16,
  },
  activeTab: {
    borderBottomWidth: 3, // Increased to match the main border thickness
    borderBottomColor: '#ddd', // Same color as the header border to align perfectly
    marginTop: -1, // Moves the border up to align with the header border
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
