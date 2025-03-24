import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MapScreen from '../screens/MapScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RegisterPetScreen from '../screens/RegisterPet';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CustomHeader() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/LOGO.png')}
            style={styles.logoImage}
          />
        </View>
      </View>
    </View>
  );
}

function MapStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ header: () => <CustomHeader /> }}
      />
    </Stack.Navigator>
  );
}

function RegisterPetStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RegisterPet"
        component={RegisterPetScreen}
        options={{ header: () => <CustomHeader /> }}
      />
    </Stack.Navigator>
  );
}

function DashboardStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ header: () => <CustomHeader /> }}
      />
    </Stack.Navigator>
  );
}

function NotificationsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ header: () => <CustomHeader /> }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Map') {
            iconName = 'map';
          } else if (route.name === 'RegisterPet') {
            iconName = 'paw';
          } else if (route.name === 'Dashboard') {
            iconName = 'analytics';
          } else if (route.name === 'Notifications') {
            iconName = 'notifications';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 1,
          borderTopColor: theme.colors.highlight,
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
      <Tab.Screen name="Map" component={MapStackNavigator} options={{ tabBarLabel: 'Map', headerShown: false }} />
      <Tab.Screen name="RegisterPet" component={RegisterPetStackNavigator} options={{ tabBarLabel: 'Register', headerShown: false }} />
      <Tab.Screen name="Dashboard" component={DashboardStackNavigator} options={{ tabBarLabel: 'Dashboard', headerShown: false }} />
      <Tab.Screen name="Notifications" component={NotificationsStackNavigator} options={{ tabBarLabel: 'Notifications', headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return <TabNavigator />;
}

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    height: 60,
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
});