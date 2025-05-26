// contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null); // <== Novo estado
  const [loading, setLoading] = useState(true);

  const login = async (token, userData) => {
    setUserToken(token);
    setUser(userData); // userData = { name, email, image }

    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('name', userData.name);
    await AsyncStorage.setItem('email', userData.email);
    if (userData.image) {
      await AsyncStorage.setItem('image', userData.image);
    }
  };

  const logout = async () => {
    setUserToken(null);
    setUser(null);
    await AsyncStorage.multiRemove(['userToken', 'name', 'email', 'image']);
  };

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const name = await AsyncStorage.getItem('name');
    const email = await AsyncStorage.getItem('email');
    const image = await AsyncStorage.getItem('image');

    if (token) {
      setUserToken(token);
      setUser({ name, email, image });
    }

    setLoading(false);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, user, login, logout, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
