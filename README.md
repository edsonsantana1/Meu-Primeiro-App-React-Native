# 📱 Meu Primeiro App React Native

Este é um aplicativo desenvolvido com **React Native** utilizando **Expo**. Ele foi pensado para demonstrar funcionalidades básicas de autenticação, perfil de usuário, tarefas e favoritos, com um design moderno e intuitivo.

## ✨ Funcionalidades

- Tela de Login personalizada
- Edição e salvamento de perfil com nome, e-mail e foto
- Adição e visualização de tarefas
- Favoritar tarefas
- Interface com navegação via Drawer e Bottom Tabs
- Armazenamento local usando AsyncStorage

## API Utilizada

O aplicativo utiliza a API pública de geolocalização de IP da **ipquery.io** para obter dados precisos sobre o endereço IP do usuário.

**Endpoint utilizado:**  
https://api.ipquery.io/?format=json

### O que essa API fornece:

- Localização geográfica: país, estado/região, cidade, latitude, longitude, código postal (quando disponível).
- Informações do ISP: nome, ASN (Número do Sistema Autônomo), organização.
- Detecção de privacidade: informações sobre VPN, proxy, etc.

### Importante:

Alguns dados, como o código postal, podem não estar disponíveis para todos os IPs consultados, dependendo da base de dados e da localização.

## 📦 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

## 🚀 Como executar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/edsonsantana1/Meu-Primeiro-App-React-Native.git
2. cd Meu-Primeiro-App-React-Native

3. npm install

4. npx expo start
