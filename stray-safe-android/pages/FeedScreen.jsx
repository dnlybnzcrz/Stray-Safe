import { ScrollView, Text, TouchableOpacity, View, Modal } from "react-native";
import { useNavigation } from "@react-navigation/core";

import CustomNavigation from "@/components/CustomNavigation";
import SelectPost from "@/components/SelectPost";
import PetCard from "@/components/PetCard";

export default function FeedScreen() {
  const navigation = useNavigation();

  return <CustomNavigation>
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ width: "100%", justifyContent: "center", alignItems: "center", paddingBottom: 16, position: "relative" }} >
          <PetCard />
          <PetCard />
          <PetCard />
          <PetCard />
          <PetCard />
        </View>
      </ScrollView>
    </View>

    {/* Add Post Button */}
    <SelectPost navigation={navigation}/>
  </CustomNavigation>
}