import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TaskList = ({ tasks, onRemoveTask, onEditTask  }) => {
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onEditTask(item.text)}>
        <View style={styles.taskContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.taskText} numberOfLines={2} ellipsizeMode="tail">
              {item.text}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.removeButtonContainer}
            onPress={() => onRemoveTask(item.key)}
          >
            <Text style={styles.removeButtonText}>Supprimer</Text>
          </TouchableOpacity>
        </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#AB6D00',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  taskText: {
    flex: 1,
    maxWidth: '100%', 
  },
  removeButtonContainer: {
    backgroundColor: '3C09A2',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
  },
});

export default TaskList;
