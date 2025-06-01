import React, { useState } from 'react';
import { View, FlatList, TextInput, Button } from 'react-native';
import { List, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Comprar café', notes: '' },
    { id: 2, title: 'Enviar relatório', notes: '' }
  ]);
  const [newTask, setNewTask] = useState('');

  // Função para adicionar tarefa
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), title: newTask, notes: '' }]);
      setNewTask('');
    }
  };

  // Função para remover tarefa
  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <View>
      <TextInput
        placeholder="Nova tarefa"
        value={newTask}
        onChangeText={setNewTask}
      />
      <Button title="Adicionar" onPress={addTask} />
      
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            onPress={() => navigation.navigate('TaskDetails', { task: item })}
            right={() => (
              <IconButton icon="delete" onPress={() => removeTask(item.id)} />
            )}
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;