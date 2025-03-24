import { useState } from "react"
import { Modal, View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import styles from "@/assets/styles"
import { color } from "@/assets/theme"

export default function SelectPost({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddPost = () => {
    setIsModalVisible(true);
  }

  const handleMissingSelect = () => {
    setIsModalVisible(false)

    navigation.navigate('report', { type: 'missing' })
  }

  const handleFoundSelect = () => {
    setIsModalVisible(false)

    navigation.navigate('report', { type: 'found' })
  }

  const handleAdoptionSelect = () => {
    setIsModalVisible(false)

    navigation.navigate('report', { type: 'adoption' })
  }

  return <View>
    {/* Add Post Button */}
    <TouchableOpacity
      style={{ position: "absolute", bottom: 16, right: 16, alignItems: "center", justifyContent: "center" }}
      onPress={() => handleAddPost()}
    >
      <Ionicons name="add-circle" size={64} color={color.accent} style={{ backgroundColor: "white", borderRadius: 32, padding: 0 }} />
    </TouchableOpacity>
    <Modal
      transparent={true}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Post Type</Text>

          {/* Missing */}
          <TouchableOpacity style={styles.modalButton}
            onPress={() => handleMissingSelect()}
          >
            <Ionicons name="alert-circle-outline" size={24} color={color.accent} />
            <Text style={styles.modalButtonText}>Missing</Text>
          </TouchableOpacity>

          {/* Found */}
          <TouchableOpacity style={styles.modalButton}
            onPress={() => handleFoundSelect()}
          >
            <Ionicons name="paw-outline" size={24} color={color.accent} />
            <Text style={styles.modalButtonText}>Found</Text>
          </TouchableOpacity>

          {/* Adoption */}
          <TouchableOpacity style={styles.modalButton}
            onPress={() => handleAdoptionSelect()}
          >
            <Ionicons name="heart-outline" size={24} color={color.accent} />
            <Text style={styles.modalButtonText}>For Adoption</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.cancelButton} >
            <Text style={{ fontSize: 18, color: color.black, marginTop: 16 }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </View>
}