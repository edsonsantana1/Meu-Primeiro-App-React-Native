import React, { createContext, useState } from 'react';

export const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const isFav = favorites.some(f => f.id === taskId);
    if (isFav) {
      setFavorites(favorites.filter(f => f.id !== taskId));
    } else {
      setFavorites([...favorites, task]);
    }
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    setFavorites(favorites.filter(f => f.id !== taskId));
  };

  return (
    <TasksContext.Provider value={{
      tasks,
      setTasks,
      favorites,
      toggleFavorite,
      addTask,
      deleteTask,
    }}>
      {children}
    </TasksContext.Provider>
  );
}
