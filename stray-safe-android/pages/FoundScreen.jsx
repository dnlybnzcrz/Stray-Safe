import { useFocusEffect } from "@react-navigation/core";
import { useEffect, useState, useCallback } from "react";
import { ScrollView, View, BackHandler, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/core";

import CustomNavigation from "@/components/CustomNavigation";
import SelectPost from "@/components/SelectPost";
import PetCard from "@/components/PetCard";
import webConnection from "@/utils/webConnection";

export default function FoundScreen() {
  const [type] = useState('found');
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        fetchPosts();
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [posts])
  );

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await webConnection.getPosts( type );
    
    if (response.posts) {
      setPosts(response.posts);
    }
  };

  return (
    <CustomNavigation>
      <View style={{ flex: 1, paddingBottom: 16 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={fetchPosts} />
          }
        >
          {posts.length > 0 && posts.map((post, index) => (
            <PetCard key={index} post={post} />
          ))}
        </ScrollView>
      </View>

      {/* Add Post Button */}
      <SelectPost navigation={navigation} />
    </CustomNavigation>
  );
}