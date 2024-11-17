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
import { theme } from '../theme';

const notifications = [
  {
    id: '1',
    title: 'Missing Pet Alert',
    description: 'A dog was reported missing near Scout Limbaga St.',
    timestamp: '2 hours ago',
    icon: require('../assets/warning.png'), // Replace with your icon
  },
  {
    id: '2',
    title: 'New Pet Found',
    description: 'A stray cat was found near K-1st St.',
    timestamp: '4 hours ago',
    icon: require('../assets/found.png'), // Replace with your icon
  },
  {
    id: '3',
    title: 'Adoption Request',
    description: 'A user is interested in adopting a pet from Sct. Delgado St.',
    timestamp: '1 day ago',
    icon: require('../assets/warning.png'), // Replace with your icon
  },
  {
    id: '4',
    title: 'Lost Pet Found',
    description: 'A missing dog from K-2nd St. has been found.',
    timestamp: '3 days ago',
    icon: require('../assets/warning.png'), // Replace with your icon
  },
];

export default function NotificationsScreen() {
  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <Image source={item.icon} style={styles.notificationIcon} />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
        <Text style={styles.notificationTimestamp}>{item.timestamp}</Text>
      </View>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="arrow-forward-outline" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
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
    borderRadius: 20,
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
  actionButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
