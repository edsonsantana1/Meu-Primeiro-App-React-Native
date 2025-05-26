import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Avatar, Text, Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const { logout } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Nome do Usuário');
  const [email, setEmail] = useState('email@exemplo.com');
  const [image, setImage] = useState('https://placekitten.com/200/200');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedName = await AsyncStorage.getItem('name');
      const savedEmail = await AsyncStorage.getItem('email');
      const savedImage = await AsyncStorage.getItem('image');
      if (savedName) setName(savedName);
      if (savedEmail) setEmail(savedEmail);
      if (savedImage) setImage(savedImage);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar perfil.');
    }
  };

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('image', image);
      Alert.alert('Sucesso', 'Perfil salvo com sucesso!');
      setEditing(false);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar perfil.');
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Permita acesso à galeria para alterar a foto.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Avatar.Image size={110} source={{ uri: image }} />
          <View style={styles.editIcon}>
            <MaterialIcons name="edit" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {editing ? (
        <>
          <TextInput
            label="Nome"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            mode="outlined"
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={saveProfile}
            style={styles.button}
            buttonColor="#6C63FF"
          >
            Salvar
          </Button>
        </>
      ) : (
        <>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{email}</Text>
          <Button
            mode="contained"
            onPress={() => setEditing(true)}
            style={styles.button}
            buttonColor="#6C63FF"
          >
            Editar Perfil
          </Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F7F7FA',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6C63FF',
    borderRadius: 20,
    padding: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 20,
    width: '80%',
    borderRadius: 8,
  },
});
