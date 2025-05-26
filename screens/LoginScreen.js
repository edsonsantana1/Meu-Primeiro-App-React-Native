import React, { useContext, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      const fakeToken = 'fake-token-123';
      const userData = {
        name: 'João da Silva',
        email: 'joao@example.com',
        image: 'https://placekitten.com/200/200',
      };
      login(fakeToken, userData);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text variant="headlineMedium" style={styles.title}>
          Bem-vindo
        </Text>

        <TextInput
          label="Usuário"
          value={username}
          onChangeText={setUsername}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          buttonColor="#6C63FF"
        >
          Entrar
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    alignItems: 'center',
  },
  title: {
    marginBottom: 24,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#333',
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    width: '100%',
    marginTop: 8,
    borderRadius: 8,
  },
});
