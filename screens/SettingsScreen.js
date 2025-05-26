import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch, List, Button, Divider, Avatar } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';

export default function SettingsScreen() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const { logout } = useContext(AuthContext);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Icon size={60} icon="cog" style={{ marginBottom: 12 }} />
        <Text variant="headlineMedium" style={styles.title}>
          Configurações
        </Text>
      </View>

      <List.Section style={styles.section}>
        <List.Subheader>Notificações</List.Subheader>
        <List.Item
          title="Ativar Notificações"
          right={() => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />}
        />
        <Divider />
      </List.Section>

      <Button
        mode="contained"
        onPress={logout}
        style={styles.button}
        labelStyle={{ color: '#fff' }}
      >
        Sair da Conta
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start', // mudou de space-between para flex-start
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    marginTop: 8,
  },
  section: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingBottom: 10,
    marginBottom: 330, // para criar espaço entre a seção e o botão
  },
  button: {
    marginTop: 1,
    width: '80%',
    borderRadius: 8,
    alignSelf: 'center', // garante centralização mesmo sem alignItems no container
    backgroundColor: '#6200ee', // cor de fundo (exemplo de roxo padrão do Paper)
    paddingVertical: 8, // melhora o toque visual e usabilidade
  },
  
});

