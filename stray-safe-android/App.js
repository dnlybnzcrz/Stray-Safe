import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, ActivityIndicator, View } from 'react-native';
import Welcome from './screens/Welcome';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import FeedScreen from './screens/FeedScreen';
import MapScreen from './screens/MapScreen';
import DetailsScreen from './screens/DetailsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} screenOptions={{ headerShown: false }}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} screenOptions={{ headerShown: false }}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} screenOptions={{ headerShown: false }}/>
        <Stack.Screen name="FeedScreen" component={FeedScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}