'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserRole } from '../types';
import { storage } from '../storage';
import { CURRENT_USER, CURRENT_LEARNER } from '../mockData';

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: typeof CURRENT_USER | typeof CURRENT_LEARNER;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentRole, setCurrentRoleState] = useState<UserRole>('admin');
  const [currentUser, setCurrentUser] = useState<typeof CURRENT_USER | typeof CURRENT_LEARNER>(CURRENT_USER);

  useEffect(() => {
    const savedRole = storage.getCurrentRole();
    setCurrentRoleState(savedRole);
    setCurrentUser(savedRole === 'learner' ? CURRENT_LEARNER : CURRENT_USER);
  }, []);

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    storage.setCurrentRole(role);
    setCurrentUser(role === 'learner' ? CURRENT_LEARNER : CURRENT_USER);
  };

  return (
    <AppContext.Provider value={{ currentRole, setCurrentRole, currentUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
