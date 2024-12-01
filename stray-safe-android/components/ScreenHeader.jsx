import { Image } from 'react-native';
import { color } from '@/assets/theme';
import logo from '@/assets/images/common/logo.png';
import smallLogo from '@/assets/images/common/small-logo.png';

const screenHeader = {
    headerShown: true,
    headerStyle: {
        backgroundColor: color.accent,
    },
    headerTitle: () => (
        <Image
            source={logo}
            style={{ width: 120, height: 50, alignSelf: 'center' }} // Adjust the size as needed
            resizeMode="contain"
        />
    ),
    headerLeft: null,
    headerTintColor: '#fff', // Ensure the back button color matches your theme
};

export default screenHeader;