import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme'; // Import your theme for consistent styling

export default function DetailsScreen({ route }) {
  // Extract the item passed through navigation
  const {
    image,
    location,
    likes,
    comments,
    shares,
    type,
    contactNumber,
    postContent,
  } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
        <Text style={styles.postType}>{type?.toUpperCase()}</Text>
      </View>

      {/* Content Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.postContent}>
          {postContent || 'No content provided.'}
        </Text>
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Details</Text>
        <View style={styles.detailRow}>
          <Ionicons
            name="location-outline"
            size={20}
            color={theme.colors.primary}
          />
          <Text style={styles.detailText}>{location || 'No location provided'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons
            name="call-outline"
            size={20}
            color={theme.colors.primary}
          />
          <Text style={styles.detailText}>
            {contactNumber || 'No contact number provided'}
          </Text>
        </View>
      </View>

      {/* Interactions Section */}
      <View style={styles.interactionsContainer}>
        <View style={styles.interactionItem}>
          <Ionicons name="heart" size={24} color={theme.colors.primary} />
          <Text style={styles.interactionText}>{likes} Likes</Text>
        </View>
        <View style={styles.interactionItem}>
          <Ionicons
            name="share-social-outline"
            size={24}
            color={theme.colors.primary}
          />
          <Text style={styles.interactionText}>{shares} Shares</Text>
        </View>
      </View>

      {/* Comments Section */}
      <View style={styles.commentsContainer}>
        <Text style={styles.sectionTitle}>Comments</Text>
        {comments?.length ? (
          comments.map((comment, index) => (
            <View key={index} style={styles.commentItem}>
              <Ionicons
                name="person-circle-outline"
                size={20}
                color={theme.colors.textPrimary}
              />
              <Text style={styles.commentText}>{comment}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noCommentsText}>No comments yet.</Text>
        )}
      </View>

      {/* Call to Action */}
      <TouchableOpacity style={styles.contactButton}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={20}
          color="#FFF"
          style={styles.contactIcon}
        />
        <Text style={styles.contactButtonText}>Contact Poster</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  postType: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: theme.colors.primary,
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  detailsContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.highlight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 10,
  },
  postContent: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  interactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.highlight,
  },
  interactionItem: {
    alignItems: 'center',
  },
  interactionText: {
    marginTop: 5,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  commentsContainer: {
    padding: 20,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentText: {
    marginLeft: 10,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  noCommentsText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    margin: 20,
    borderRadius: 30,
  },
  contactButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  contactIcon: {
    marginRight: 5,
  },
});
