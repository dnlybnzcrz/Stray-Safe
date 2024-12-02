import { useEffect, useRef, useState } from 'react';
import { Text, View, Dimensions, StatusBar, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '@/assets/styles';
import { useNavigation } from '@react-navigation/core';

import * as images from '@/assets/images/welcome';
import linearGradient from '@/assets/images/common/linear-gradient.png';

const { width, height } = Dimensions.get('window');

const imageArray = [
  images.welcome1,
  images.welcome2,
  images.welcome3,
  images.welcome4,
  images.welcome5,
  images.welcome6,
  images.welcome7,
  images.welcome8,
  images.welcome9,
  images.welcome10,
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [renderIndex, setRenderIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRenderIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % imageArray.length;
        flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const onSignUp = () => {
    navigation.navigate('signup');
  }

  const onSignIn = () => {
    navigation.navigate('login');
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <FlatList
        ref={flatListRef}
        data={imageArray}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={item} style={{ width, height }} />
            <ImageBackground source={linearGradient} style={{ width, height, position: 'absolute' }} />
          </View>
        )}
      />

      <View style={{ position: 'absolute', bottom: 50, width: '100%', alignItems: 'center', paddingHorizontal: 20, }}>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}> Together, we can make every street a kinder place for stray animals. </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
          <TouchableOpacity onPress={onSignUp} style={{ backgroundColor: "white", paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30, borderWidth: 2, alignItems: 'center', }}>
            <Text style={{ color: "black", fontSize: 16, fontWeight: 'bold' }}> Sign Up </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onSignIn} style={{ borderColor: "white", paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30, borderWidth: 2, alignItems: 'center', }}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: 'bold' }}> Sign In </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  );
}