import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { NotificationsProvider } from './screens/NotificationsContext';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import LoginScreen from './screens/LoginScreen';
import FavoritesScreen from './screens/FavoritesScreen'; // ✅ import tela de favoritos
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import { TasksProvider } from './contexts/TasksContext';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { userToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {userToken ? (
        <Drawer.Navigator initialRouteName="MainTabs">
          <Drawer.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ title: 'Início', headerTitle: '' }}
          />
          <Drawer.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{ title: 'Favoritos', headerTitle: '' }} // ✅ Favoritos no menu lateral
          />
          <Drawer.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Configurações', headerTitle: '' }}
          />
        </Drawer.Navigator>
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <NotificationsProvider>
          <TasksProvider>
            <AppContent />
          </TasksProvider>
        </NotificationsProvider>
      </AuthProvider>
    </PaperProvider>
  );
}