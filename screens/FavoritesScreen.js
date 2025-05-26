import React, { useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';
import { TasksContext } from '../contexts/TasksContext';

export default function FavoritesScreen() {
  const { favorites } = useContext(TasksContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <IconButton icon="heart" size={32} iconColor="#E91E63" />
        <Text variant="headlineMedium" style={styles.title}>Meus Favoritos</Text>
      </View>
      

      {favorites.length === 0 ? (
        <Text style={styles.noFavorites}>Nenhuma tarefa favoritada ainda.</Text>
      ) : (
        favorites.map(task => (
          <Card key={task.id} style={styles.card} elevation={2}>
            <Card.Title title={task.title} />
            <Card.Content>
              <Text style={styles.description}>{task.description}</Text>
              {task.detail ? (
                <Text style={styles.detail}>{task.detail}</Text>
              ) : (
                <Text style={styles.noDetail}>Nenhum detalhe adicionado.</Text>
              )}
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#777',
  },
  noFavorites: {
    textAlign: 'center',
    marginTop: 40,
    color: '#aaa',
  },
  card: {
    marginBottom: 12,
    borderRadius: 8,
  },
  description: {
    marginBottom: 8,
  },
  detail: {
    color: '#555',
  },
  noDetail: {
    fontStyle: 'italic',
    color: '#aaa',
  },
});
