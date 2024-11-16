import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme'; // Import the theme object

const { width } = Dimensions.get('window');

const pets = [
  {
    id: '1',
    image: require('../assets/stray1.jpg'),
    location: 'Scout Limbaga St.',
    likes: 12,
    comments: ['I saw this one too!'],
    shares: 1,
    type: 'missing',
  },
  {
    id: '2',
    image: require('../assets/stray2.jpg'),
    location: 'K-1st St.',
    likes: 5,
    comments: ['Cute dog!'],
    shares: 0,
    type: 'found',
  },
  {
    id: '3',
    image: require('../assets/stray3.jpg'),
    location: 'Sct. Delgado St.',
    likes: 8,
    comments: ['Hope it finds a home.'],
    shares: 3,
    type: 'forAdoption',
  },
  {
    id: '4',
    image: require('../assets/stray4.jpg'),
    location: 'K-2nd St.',
    likes: 10,
    comments: ['Hope it finds a home.'],
    shares: 3,
    type: 'missing',
  },
  {
    id: '5',
    image: require('../assets/stray5.jpg'),
    location: 'Sct. Fernandez St.',
    likes: 7,
    comments: ['Beautiful dog!'],
    shares: 2,
    type: 'found',
  },
  {
    id: '6',
    image: require('../assets/adopt1.png'),
    location: 'Sct. Gandia St.',
    likes: 15,
    comments: ['Adopt, don’t shop!'],
    shares: 5,
    type: 'forAdoption',
  },
];

export default function FeedScreen({ navigation}) {
  const [likes, setLikes] = useState(pets.map((pet) => pet.likes));
  const [likedStatus, setLikedStatus] = useState(pets.map(() => false));
  const [visibleComments, setVisibleComments] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [commentsData, setCommentsData] = useState(
    pets.map((pet) => pet.comments)
  );
  const [selectedTab, setSelectedTab] = useState('missing');

  const filteredPets = pets.filter((pet) => pet.type === selectedTab);

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

  const handleImageClick = (pet) => {
    navigation.navigate('DetailsScreen', {
      image: pet.image,
      location: pet.location,
      likes: pet.likes,
      comments: pet.comments,
      shares: pet.shares,
    });
  };

  const handleReportPetPress = () => {
    console.log('Report Pet button pressed');
    navigation.navigate('ReportPet'); // Assuming you have a navigation route for reporting
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Tabs for selecting categories */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setSelectedTab('missing')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'missing' && styles.activeTabText,
            ]}
          >
            Missing
          </Text>
          {selectedTab === 'missing' && <View style={styles.activeTabLine} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setSelectedTab('found')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'found' && styles.activeTabText,
            ]}
          >
            Found
          </Text>
          {selectedTab === 'found' && <View style={styles.activeTabLine} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setSelectedTab('forAdoption')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'forAdoption' && styles.activeTabText,
            ]}
          >
            For Adoption
          </Text>
          {selectedTab === 'forAdoption' && (
            <View style={styles.activeTabLine} />
          )}
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={[theme.colors.background, theme.colors.lightBlueAccent]}
        style={styles.gradientBackground}
      >
        {/* List of pets based on the selected tab */}
        <FlatList
          data={filteredPets}
          renderItem={({ item, index }) => (
            <View style={styles.postContainer}>
              <TouchableOpacity onPress={() => handleImageClick(item)}>
                <View style={styles.petItem}>
                  <Image source={item.image} style={styles.petImage} />
                  <Text style={styles.locationBadge}>{item.location}</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.interactionContainer}>
                <TouchableOpacity
                  style={styles.interactionButton}
                  onPress={() => handleLikeToggle(index)}
                >
                  <Ionicons
                    name={likedStatus[index] ? 'heart' : 'heart-outline'}
                    size={20}
                    color={
                      likedStatus[index]
                        ? theme.colors.orangeAccent
                        : theme.colors.textPrimary
                    }
                  />
                  <Text style={styles.interactionText}>{likes[index]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.interactionButton}
                  onPress={() => handleCommentToggle(index)}
                >
                  <Ionicons
                    name="chatbubble-outline"
                    size={20}
                    color={theme.colors.textPrimary}
                  />
                  <Text style={styles.interactionText}>
                    {commentsData[index].length}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.interactionButton}>
                  <Ionicons
                    name="share-social-outline"
                    size={20}
                    color={theme.colors.textPrimary}
                  />
                  <Text style={styles.interactionText}>{item.shares}</Text>
                </TouchableOpacity>
              </View>

              {visibleComments === index && (
                <View style={styles.commentsSection}>
                  {commentsData[index].map((comment, commentIndex) => (
                    <Text key={commentIndex} style={styles.commentText}>
                      • {comment}
                    </Text>
                  ))}
                  <View style={styles.commentInputContainer}>
                    <TextInput
                      style={styles.commentInput}
                      placeholder="Add a comment..."
                      placeholderTextColor={theme.colors.textSecondary}
                      value={newComment}
                      onChangeText={setNewComment}
                    />
                    <TouchableOpacity onPress={() => handleAddComment(index)}>
                      <Ionicons
                        name="send"
                        size={24}
                        color={theme.colors.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.petListVertical}
        />

        {/* Restyled Report Pet Button */}
        <TouchableOpacity
          style={styles.reportButton}
          onPress={handleReportPetPress}
        >
          <Ionicons
            name="heart"
            size={20}
            color="#FFF"
            style={styles.buttonIcon}
          />
          <Text style={styles.reportButtonText}>Press Here To Report Pet</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative',
  },
  tabText: {
    color: '#FFF',
    fontSize: 16,
    paddingBottom: 5,
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  activeTabLine: {
    height: 4,
    backgroundColor: '#FFF',
    width: '100%',
    position: 'absolute',
    bottom: -10,
    borderRadius: 60,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  petListVertical: {
    paddingVertical: 10,
  },
  postContainer: {
    backgroundColor: '#FFF',
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
    backgroundColor: theme.colors.orangeAccent,
    padding: 5,
    borderRadius: 10,
    color: '#FFF',
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
    color: theme.colors.textPrimary,
  },
  commentsSection: {
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
  },
  commentText: {
    fontSize: 14,
    color: theme.colors.textPrimary,
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
    color: theme.colors.textPrimary,
  },
  reportButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 30,
    margin: 20,
    elevation: 5,
  },
  reportButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 5,
  },
});
