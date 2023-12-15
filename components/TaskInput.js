import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';

const TaskInput = ({ onAddTask }) => {
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task !== '') {
      const newTask = { key: uuidv4(), text: task };
      onAddTask(newTask);
      setTask('');
    }
  };

  const renderTouchableComponent = () => {
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback
          onPress={addTask}
          background={TouchableNativeFeedback.Ripple('rgba(255, 255, 255, 0.32)', true)}
        >
          {renderContent()}
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          {renderContent()}
        </TouchableOpacity>
      );
    }
  };

  const renderContent = () => (
    <View style={styles.addButton}>
      <Text style={styles.addButtonText}>Ajouter</Text>
    </View>
  );

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, { color: 'white' }]}
        placeholder="Ajouter une tâche"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      {renderTouchableComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingLeft: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
  },
});

export default TaskInput;
