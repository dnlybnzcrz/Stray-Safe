import { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DrawerActions, useNavigationState } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/core';

import styles from '@/assets/styles';
import { color } from '@/assets/theme';
import smallLogo from '@/assets/images/common/small-logo.png';
import logo from '@/assets/images/common/logo.png';

export default function CustomNavigation({ children }) {
  const navigation = useNavigation();
  const [currentScreen, setCurrentRoute] = useState('feed');
  const currentRoute = useNavigationState(state => state.routes[state.index].name);

  useEffect(() => {
    setCurrentRoute(currentRoute);
  }, [currentRoute]);

  const tabItems = [{
    name: 'Missing',
    route: 'feed'
  }, {
    name: 'Found',
    route: 'found' // TODO: ADD FOUND SCREEN
  }, {
    name: 'For Adoption',
    route: 'adopt' // TODO: ADD ADOPTION SCREEN
  }]

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={color.accent} barStyle="light-content" />
      <SafeAreaView style={{ flex: 1}}>
        {/* Header */}
        <View style={{ height: 75, backgroundColor: color.accent, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 }}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={smallLogo} style={styles.smallLogo} />
          </TouchableOpacity>
          <View>
            <Image source={logo} style={{ width: 160, height: 50 }} />
          </View>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={smallLogo} style={styles.smallLogo} />
          </TouchableOpacity>
        </View>

        {/* Navigation Items */}
        <View style={[styles.tabContainer, { display: 'flex' }]}>
          {tabItems.map((item, index) => (
            <TouchableOpacity key={index} style={[styles.tabButton, { borderBlockColor: color.white, borderBottomWidth: currentScreen === item.route ? 2 : 0, padding: 4, }]}
              onPress={() => navigation.navigate(item.route)}>
              <Text style={{ color: color.white, margin: 4, fontSize: 18, fontWeight: currentScreen === item.route ? '700' : '400', textAlign: 'center' }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <View style={[ styles.content, { flex: 1 }]}>
          {children}
        </View>

        {/* Bottom Navigation */}
        <View style={{ backgroundColor: color.white, marginTop: 'auto', borderTopWidth: 1, borderTopColor: '#ccc', padding: 10, alignItems: 'center' }}>
          <TouchableOpacity>
            <Text>Test</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};