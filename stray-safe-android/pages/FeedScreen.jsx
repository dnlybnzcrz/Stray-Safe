import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import CustomNavigation from "@/components/CustomNavigation";
import MissingCard from "@/components/MissingCard";

export default function FeedScreen() {
    const navigation = useNavigation();
    
    return <CustomNavigation>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MissingCard/>
        </View>
    </CustomNavigation>
}