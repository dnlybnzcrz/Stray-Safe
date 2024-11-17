import React, { createContext, useContext, useState } from 'react';

// Create the PostContext
const PostContext = createContext();

// Initial posts data
const initialPosts = [
  {
    id: '1',
    image: require('../assets/welcome10.png'),
    location: 'Scout Limbaga St.',
    likes: 12,
    comments: ['I saw this one too!'],
    shares: 1,
    type: 'missing',
  },
  {
    id: '2',
    image: require('../assets/stray4.jpg'),
    location: 'K-1st St.',
    likes: 5,
    comments: ['Looks well-fed!'],
    shares: 0,
    type: 'found',
  },
  {
    id: '3',
    image: require('../assets/adopt1.png'),
    location: 'Adoption Center, City',
    likes: 8,
    comments: ['Hope it finds a home!'],
    shares: 3,
    type: 'forAdoption',
  },
];

// PostProvider component to manage posts
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(initialPosts);

  // Function to add a new post
  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  // Provide the posts and the addPost function to the context
  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};

// Custom hook to use the PostContext
export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};
