import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, List, Divider, Button, Surface } from 'react-native-paper';
import { NotificationsContext } from './NotificationsContext';

export default function NotificationsScreen() {
  const { notifications, clearNotifications } = useContext(NotificationsContext);

  const renderItem = ({ item }) => (
    <React.Fragment key={item.id}>
      <List.Item
        title={item.title}
        description={item.description}
        left={(props) => <List.Icon {...props} icon="bell" />}
      />
      <Divider />
    </React.Fragment>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>

      {notifications.length === 0 ? (
        <Surface style={styles.emptyBox}>
          <Text style={styles.emptyText}>Nenhuma notificação ainda.</Text>
        </Surface>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 80 }} // para não ficar atrás do botão
        />
      )}

      {notifications.length > 0 && (
        <Button
          mode="contained"
          onPress={clearNotifications}
          style={styles.clearButton}
        >
          Limpar Notificações
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clearButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  emptyBox: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#666',
    fontSize: 16,
  },
});
