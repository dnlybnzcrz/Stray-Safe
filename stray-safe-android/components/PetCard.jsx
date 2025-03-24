import { useState, useEffect } from "react"
import { View, Image, Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import styles from "@/assets/styles"
import { color } from "@/assets/theme"
import missing1 from "@/assets/images/placeholder/missing1.png"
import smallLogo from "@/assets/images/common/small-logo.png"
import webConnection from "@/utils/webConnection"

const unkownData = {
  username: "dev",
  content: "garapata",
  imageIds: []
}

const impressions = {
  comment: 5,
  share: 2,
  like: 3,
}

export default function PetCard({ post = unkownData }) {
  const [displayImage, setDisplayImage] = useState(null)
  const imageIds = post.images

  useEffect(() => {
    const fetchImage = async () => {
      if (imageIds.length > 0) {
        const imageUri = await webConnection.getImage(imageIds[0])

        setDisplayImage(imageUri)
      } else {
        console.log("No images found")
      }
    }

    fetchImage();
  }, [post])

  return (
    <View style={styles.petCard}>
      <View style={{ padding: 12, borderBottomWidth: 1 }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Image source={smallLogo} style={{ width: 50, height: 50, resizeMode: 'contain', margin: 10 }} />
          <View style={{ marginTop: 5 }}>
            <Text style={{ fontWeight: "bold" }}>{post.username}</Text>
            <Text style={{ flex: 1, flexWrap: 'wrap' }}>
              {post.content}
            </Text>
          </View>
        </View>
        <Image source={ displayImage == null ? missing1 : {uri: displayImage} } style={styles.petPhoto}></Image>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 12, paddingLeft: 64, paddingRight: 64 }}>
        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row' }}>
          <Ionicons name="heart-outline" size={20} color={color.black} />
          <Text style={{ marginLeft: 5 }}>{impressions.like}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row' }}>
          <Ionicons name="chatbubble-outline" size={20} color={color.black} />
          <Text style={{ marginLeft: 5 }}>{impressions.comment}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row' }}>
          <Ionicons name="share-social-outline" size={20} color={color.black} />
          <Text style={{ marginLeft: 5 }}>{impressions.share}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}