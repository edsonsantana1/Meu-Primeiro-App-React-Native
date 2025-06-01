import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const TaskDetailsScreen = ({ route }) => {
  const { task } = route.params;
  const [notes, setNotes] = useState(task.notes);

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{task.title}</Text>
      <TextInput
        placeholder="Adicione anotações..."
        value={notes}
        onChangeText={setNotes}
        multiline
      />
      <Button title="Salvar Anotações" onPress={() => alert('Notas salvas!')} />
    </View>
  );
};

export default TaskDetailsScreen;