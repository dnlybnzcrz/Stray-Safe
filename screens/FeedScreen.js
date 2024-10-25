import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

const pets = [
  { id: '1', image: require('../assets/moodeng1.jpg'), location: 'Moodeng', likes: 12, comments: ['Cute cat!'], shares: 1 },
  { id: '2', image: require('../assets/moodeng2.jpg'), location: 'Moodeng', likes: 5, comments: ['I saw this one too!'], shares: 0 },
  { id: '3', image: require('../assets/moodeng4.jpg'), location: 'Moodeng', likes: 8, comments: ['Hope it finds a home.'], shares: 3 },
  { id: '4', image: require('../assets/moodeng5.jpg'), location: 'Moodeng', likes: 10, comments: ['Hope it finds a home.'], shares: 3 },
];

export default function FeedScreen() {
  const [likes, setLikes] = useState(pets.map(pet => pet.likes));
  const [likedStatus, setLikedStatus] = useState(pets.map(() => false));
  const [visibleComments, setVisibleComments] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [commentsData, setCommentsData] = useState(pets.map(pet => pet.comments));

  const handleLikeToggle = (index) => {
    const newLikes = [...likes];
    const newLikedStatus = [...likedStatus];

    if (newLikedStatus[index]) {
      newLikes[index] -= 1;
      newLikedStatus[index] = false;
    } else {
      newLikes[index] += 1;
      newLikedStatus[index] = true;
    }

    setLikes(newLikes);
    setLikedStatus(newLikedStatus);
  };

  const handleCommentToggle = (index) => {
    setVisibleComments(visibleComments === index ? null : index);
  };

  const handleAddComment = (index) => {
    if (newComment.trim()) {
      const updatedComments = [...commentsData];
      updatedComments[index] = [...updatedComments[index], newComment];
      setCommentsData(updatedComments);
      setNewComment('');
    }
  };

  const renderPetItem = ({ item, index }) => (
    <View style={styles.postContainer}>
      <View style={styles.petItem}>
        <Image source={item.image} style={styles.petImage} />
        <Text style={styles.locationBadge}>{item.location}</Text>
      </View>
      <View style={styles.interactionContainer}>
        <TouchableOpacity style={styles.interactionButton} onPress={() => handleLikeToggle(index)}>
          <Ionicons name={likedStatus[index] ? 'heart' : 'heart-outline'} size={20} color={likedStatus[index] ? 'red' : '#333'} />
          <Text style={styles.interactionText}>{likes[index]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton} onPress={() => handleCommentToggle(index)}>
          <Ionicons name="chatbubble-outline" size={20} color="#333" />
          <Text style={styles.interactionText}>{commentsData[index].length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <Ionicons name="share-social-outline" size={20} color="#333" />
          <Text style={styles.interactionText}>{item.shares}</Text>
        </TouchableOpacity>
      </View>
      
      {visibleComments === index && (
        <View style={styles.commentsSection}>
          {commentsData[index].map((comment, commentIndex) => (
            <Text key={commentIndex} style={styles.commentText}>• {comment}</Text>
          ))}
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity onPress={() => handleAddComment(index)}>
              <Ionicons name="send" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFEBE8', '#FFDAC7']}
        style={styles.gradientBackground}
      >
        <View style={styles.innerContainer}>
          {/* Pet List */}
          <ScrollView contentContainerStyle={styles.scrollView}>
            <FlatList
              data={pets}
              renderItem={renderPetItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.petListVertical}
            />
          </ScrollView>

          {/* Report Pet Button */}
          <TouchableOpacity style={styles.reportButton}>
            <Ionicons name="heart" size={24} color="white" style={styles.buttonIcon} />
            <Text style={styles.reportButtonText}>Press Here To Report Pet</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollView: {
    paddingBottom: 100,
  },
  petListVertical: {
    paddingVertical: 10,
  },
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  petItem: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    height: width * 0.5,
  },
  petImage: {
    width: '100%',
    height: '100%',
  },
  locationBadge: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: '#AEC6CF',
    padding: 5,
    borderRadius: 10,
    color: 'white',
    fontSize: 12,
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  commentsSection: {
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  reportButton: {
    position: 'absolute',
    bottom: 20,
    left: '10%',
    right: '10%',
    backgroundColor: '#FF6F61',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 30,
    elevation: 5,
  },
  reportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
