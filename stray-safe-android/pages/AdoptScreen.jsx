import { ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import CustomNavigation from "@/components/CustomNavigation";
import SelectPost from "@/components/SelectPost";
import PetCard from "@/components/PetCard";

export default function AdoptScreen() {
  const navigation = useNavigation();

  return <CustomNavigation>
    <View style={{ flex: 1, paddingBottom: 16 }}>
      <ScrollView>
        <PetCard />
        <PetCard />
        <PetCard />
        <PetCard />
        <PetCard />
      </ScrollView>
    </View>

    {/* Add Post Button */}
    <SelectPost navigation={navigation} />
  </CustomNavigation>
}