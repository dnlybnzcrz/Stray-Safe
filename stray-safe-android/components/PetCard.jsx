import { View, Image, Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import styles from "@/assets/styles"
import { color } from "@/assets/theme"
import missing1 from "@/assets/images/placeholder/missing1.png"

const post = {
  comment: 5,
  share: 2,
  like: 3,
}

export default function PetCard() {
  return <View style={styles.petCard}>
    <View style={{ padding: 12, borderBottomWidth: 1 }}>
      <Image source={missing1} style={styles.petPhoto}></Image>
    </View>
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 12, paddingLeft: 64, paddingRight: 64 }}>
      <TouchableOpacity style={{ display: 'flex', flexDirection: 'row' }}>
        <Ionicons name="heart-outline" size={20} color={color.black} />
        <Text style={{ marginLeft: 5 }}>{post.like}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ display: 'flex', flexDirection: 'row' }}>
        <Ionicons name="chatbubble-outline" size={20} color={color.black} />
        <Text style={{ marginLeft: 5 }}>{post.comment}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ display: 'flex', flexDirection: 'row' }}>
        <Ionicons name="share-social-outline" size={20} color={color.black} />
        <Text style={{ marginLeft: 5 }}>{post.share}</Text>
      </TouchableOpacity>
    </View>
  </View>
}