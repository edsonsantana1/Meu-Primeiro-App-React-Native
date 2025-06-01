import React, { useState, useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Text,
  Card,
  Avatar,
  List,
  Divider,
  FAB,
  TextInput,
  Dialog,
  Portal,
  Button,
  IconButton,
  Surface,
} from 'react-native-paper';

import { NotificationsContext } from './NotificationsContext';
import { TasksContext } from '../contexts/TasksContext';



export default function HomeScreen() {
  const { addNotification } = useContext(NotificationsContext);
  const { tasks, favorites, toggleFavorite, addTask, deleteTask } = useContext(TasksContext);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [tempTitle, setTempTitle] = useState('');
  const [tempDescription, setTempDescription] = useState('');
  const [tempDetail, setTempDetail] = useState('');

  const openCreateDialog = () => {
    setEditingTaskId(null);
    setTempTitle('');
    setTempDescription('');
    setTempDetail('');
    setDialogVisible(true);
  };

  const openEditDialog = (task) => {
    setEditingTaskId(task.id);
    setTempTitle(task.title);
    setTempDescription(task.description);
    setTempDetail(task.detail || '');
    setDialogVisible(true);
  };

  const saveTask = () => {
    if (!tempTitle.trim() || !tempDescription.trim()) {
      alert('Título e descrição são obrigatórios.');
      return;
    }

    if (editingTaskId === null) {
      addTask({
        id: Date.now(),
        title: tempTitle,
        description: tempDescription,
        detail: tempDetail,
      });
    } else {
      const updatedTasks = tasks.map(t =>
        t.id === editingTaskId
          ? { ...t, title: tempTitle, description: tempDescription, detail: tempDetail }
          : t
      );
      
    }

    setDialogVisible(false);
  };

  const onDeleteTask = (id) => {
    deleteTask(id);
    addNotification('Tarefa excluída', `A tarefa foi removida.`);
    setDialogVisible(false);
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Card style={styles.card}>
          <Card.Title
            title="Bem-vindo"
            subtitle=""
            left={(props) => <Avatar.Icon {...props} icon="home" />}
          />
          <Card.Content>
            <Text>Aplicativo desenvolvido para criar e salvar blocos.</Text>
          </Card.Content>
          <Card.Actions>
            {/* Removi o botão adicionar aos favoritos do card de bem-vindo conforme pedido */}
          </Card.Actions>
        </Card>

        <List.Section>
          <List.Subheader>Minha Lista</List.Subheader>

          {tasks.length === 0 && (
            <Text style={styles.noTaskText}>Nenhuma tarefa criada ainda.</Text>
          )}

          {tasks.map((task) => (
            <Surface key={task.id} style={styles.taskSurface} elevation={2}>
              <List.Item
                title={task.title}
                description={task.description}
                onPress={() => openEditDialog(task)}
                // Remove o ícone de pasta (folder)
                // left={null} ou não passe nada aqui
                right={(props) => (
                  <IconButton
                    {...props}
                    icon={favorites.some(f => f.id === task.id) ? 'heart' : 'heart-outline'}
                    color={favorites.some(f => f.id === task.id) ? '#e91e63' : undefined}
                    onPress={() => toggleFavorite(task.id)}
                    accessibilityLabel="Favoritar tarefa"
                  />
                )}
              />
              {task.detail ? (
                <Text style={styles.taskDetailText}>{task.detail}</Text>
              ) : (
                <Text style={styles.taskNoDetail}>Nenhum detalhe adicionado.</Text>
              )}
            </Surface>
          ))}
        </List.Section>
      </ScrollView>

      <FAB style={styles.fab} icon="plus" label="Adicionar" onPress={openCreateDialog} />

      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
          style={styles.dialog}
        >
          <Dialog.Title>{editingTaskId === null ? 'Nova Tarefa' : 'Editar Tarefa'}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Título"
              value={tempTitle}
              onChangeText={setTempTitle}
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Descrição"
              value={tempDescription}
              onChangeText={setTempDescription}
              multiline
              numberOfLines={2}
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Detalhes"
              value={tempDetail}
              onChangeText={setTempDetail}
              multiline
              style={[styles.input, styles.detailInput]}
              mode="outlined"
              textAlignVertical="top"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancelar</Button>
            {/* Botão excluir ao lado de cancelar e salvar */}
            {editingTaskId !== null && (
              <Button onPress={() => onDeleteTask(editingTaskId)} color="#d32f2f">
                Excluir
              </Button>
            )}
            <Button onPress={saveTask}>Salvar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

//att1
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Profile') iconName = focused ? 'account' : 'account-outline';
          else if (route.name === 'Notifications') iconName = focused ? 'bell' : 'bell-outline';
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />  {/* <-- aqui */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
}


// mantenha seus estilos existentes


const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    marginBottom: 24,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  noTaskText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
    marginTop: 20,
  },
  taskSurface: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  taskDetailText: {
    marginHorizontal: 16,
    marginBottom: 10,
    color: '#555',
  },
  taskNoDetail: {
    marginHorizontal: 16,
    marginBottom: 10,
    fontStyle: 'italic',
    color: '#aaa',
  },
  dialog: {
    marginHorizontal: 10,
  },
  detailInput: {
    height: 150,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },
});
