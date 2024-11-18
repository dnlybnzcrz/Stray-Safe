import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePostContext } from '../context/PostContext'; // Import the PostContext
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

export default function NotificationsScreen() {
  const { notifications } = usePostContext(); // Access notifications from context
  const navigation = useNavigation(); // Navigation hook

  const handleNotificationClick = (post) => {
    // Navigate to the DetailsScreen with post data
    navigation.navigate('Details', {
      image: post.image,
      location: post.location,
      likes: post.likes,
      comments: post.comments,
      shares: post.shares,
      type: post.type,
      contactNumber: post.contactNumber || 'No contact number provided',
      postContent: post.postContent || 'No content provided.',
    });
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationCard}
      onPress={() => handleNotificationClick(item.post)} // Navigate on click
    >
      <Image source={item.icon} style={styles.notificationIcon} />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
        <Text style={styles.notificationTimestamp}>{item.timestamp}</Text>
      </View>
      <Ionicons name="arrow-forward-outline" size={20} color={theme.colors.primary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
    
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 5,
  },
  notificationDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },
  notificationTimestamp: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
});
