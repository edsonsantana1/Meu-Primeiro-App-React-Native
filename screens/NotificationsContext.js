import React, { createContext, useState } from 'react';

export const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (title, description) => {
    const newNotification = {
      id: Date.now().toString(),
      title,
      description,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  // Função para limpar todas as notificações
  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, clearNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
}
