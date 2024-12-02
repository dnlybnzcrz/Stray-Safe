import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import CustomNavigation from "@/components/CustomNavigation";
import MissingCard from "@/components/MissingCard";

export default function FeedScreen() {
    const navigation = useNavigation();

    return <CustomNavigation>
        <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center', paddingBottom: 16 }}>
            <MissingCard />
            <MissingCard />
            <MissingCard />
            <MissingCard />
            <MissingCard />
        </View>
    </CustomNavigation>
}