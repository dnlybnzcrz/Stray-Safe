import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DetailsScreen({ route }) {
  // Extract the item passed through navigation
  const { image, location, likes, comments, shares } = route.params;

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>Location: {location}</Text>
      <Text style={styles.text}>Likes: {likes}</Text>
      <Text style={styles.text}>Shares: {shares}</Text>
      <Text style={styles.text}>Comments:</Text>
      {comments.map((comment, index) => (
        <Text key={index} style={styles.comment}>
          - {comment}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  comment: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
});
