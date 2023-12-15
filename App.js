import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, ImageBackground } from "react-native";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import { Modal, TextInput } from 'react-native';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modifiedText, setModifiedText] = useState("");

  const initialTasks = [
    { key: "1", text: "Apprendre un tour de magie et le montrer à quelqu'un" },
    { key: "2", text: "Organiser une soirée jeux de société avec des amis" },
    { key: "3", text: "Apprendre une chorégraphie de danse populaire" },
    { key: "4", text: "Créer une playlist de chansons joyeuses et la partager avec des proches" },
    { key: "5", text: "Faire un pique-nique improvisé dans un parc" },
    { key: "6", text: "Regarder un film culte que vous n'avez jamais vu auparavant" },
    { key: "7", text: "Participer à un atelier de peinture ou de poterie" },
  ];

  useEffect(() => {
    setTasks(
      initialTasks.map((task, index) => ({ ...task, key: String(index) }))
    );
  }, []);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.key !== taskId);
    setTasks(updatedTasks);
  };

  const editTask = (editedTask) => {
    setTasks((prevTasks) => {
      const taskIndex = prevTasks.findIndex((task) => task.key === editedTask.key);
      const updatedTasks = [...prevTasks];
      updatedTasks[taskIndex] = editedTask;
      return updatedTasks;
    });
  };

  const openModal = (text, taskId) => {
    setModifiedText(text);
    setSelectedTask(tasks.find((task) => task.key === taskId));
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const saveModifiedText = () => {
    if (selectedTask) {
      const editedTask = { ...selectedTask, text: modifiedText };
      editTask(editedTask);
      setIsModalVisible(false);
    }
    closeModal();
  };

  return (
    <ImageBackground
      source={require('./assets/fond.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TaskInput onAddTask={addTask} />
        <TaskList tasks={tasks} onRemoveTask={removeTask} onEditTask={openModal} />
        <Modal transparent={true} visible={isModalVisible}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalBackground}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <TextInput
                    value={modifiedText}
                    onChangeText={(text) => setModifiedText(text)}
                    placeholder="Modifier le texte"
                    style={styles.input}
                  />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
                      <Text style={styles.buttonText}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={saveModifiedText} style={styles.confirmButton}>
                      <Text style={styles.buttonText}>Confirmer</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "transparent",
    marginTop: 100,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#BFBDC3",
    padding: 10,
    marginRight: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "green",
    padding: 10,
    marginLeft: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});

export default App;
