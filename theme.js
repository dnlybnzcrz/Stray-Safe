import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const theme = {
  colors: {
    primary: '#FF6F61', // Coral
    secondary: '#4285F4', // Blue (Google button)
    background: '#fff', // White background for boxes
    text: '#333', // Dark text color
    placeholder: '#aaa', // Placeholder text color
    link: '#3498db', // Link color (for forgot password, etc.)
  },
  dimensions: {
    width,
    height,
  },
  fonts: {
    titleFont: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 16,
    },
  },
  button: {
    roundedButton: {
      backgroundColor: '#FF6F61', // Coral
      paddingVertical: 15,
      borderRadius: 10,
      width: '100%',
      alignItems: 'center',
    },
    googleButton: {
      flexDirection: 'row',
      backgroundColor: '#4285F4', // Blue (Google)
      width: '100%',
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },
  },
};
