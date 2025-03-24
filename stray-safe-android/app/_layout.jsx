import { useEffect, useState } from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import HomeScreen from '@/pages/HomeScreen';
import LoginScreen from '@/pages/LoginScreen';
import SignupScreen from '@/pages/SignupScreen';
import FeedScreen from '@/pages/FeedScreen';
import FoundScreen from '@/pages/FoundScreen';
import AdoptScreen from '@/pages/AdoptScreen';
import ReportScreen from '@/pages/ReportScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const handleLogin = (state) => {
    console.log('handleLogin', state);
    setIsLoggedIn(state);
  }

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        {!isLoggedIn ? (
          <Stack.Navigator initialRouteName="home">
            <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }}>
              {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="signup" component={SignupScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        ) : (
          <Drawer.Navigator screenOptions={{ headerShown: false}}>
            <Drawer.Screen name="feed" component={FeedScreen} />
            <Drawer.Screen name="found" component={FoundScreen} />
            <Drawer.Screen name="adopt" component={AdoptScreen} />
            <Drawer.Screen name="report" component={ReportScreen} />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

