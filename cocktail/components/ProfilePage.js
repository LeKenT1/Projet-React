import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from "react-native";

const titles = [
  "Maître des Mojitos",
  "Gourou du Gin Tonic",
  "Prince de la Piña Colada",
  "Sorcier de la Sangria",
  "Capitaine du Cosmopolitan",
  "Dieu du Daiquiri",
];

const ProfilePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [Name, setName] = useState("Brad Pitt");

  const handleTitleChange = (title) => {
    setSelectedTitle(title);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text style={styles.selectedTitle}>{selectedTitle}</Text>
      </View>
      <TouchableOpacity style={styles.titleButton} onPress={toggleModal}>
        <Text style={styles.titleButtonText}>Sélectionner un titre</Text>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={titles}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.titleItem}
                  onPress={() => handleTitleChange(item)}
                >
                  <Text style={styles.titleText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </Modal>
      <TextInput
        style={styles.input}
        placeholder="Nom Prénom"
        value={Name}
        onChangeText={(text) => setName(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6bd60",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  selectedTitle: {
    fontSize: 18,
    fontStyle: "italic",
  },
  titleButton: {
    backgroundColor: "#f28482",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  titleButtonText: {
    color: "white",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#f5cac3",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "70%",
  },
  titleItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  titleText: {
    fontSize: 22,
  },
  input: {
    height: 60,
    width: "80%",
    borderColor: "gray",
    backgroundColor: "#f7ede2",
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 22,
  },
});

export default ProfilePage;
