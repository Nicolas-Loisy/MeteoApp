import React, { ReactNode, createContext, useContext, useState } from 'react';
import Utilisateur from '../../models/Utilisateur';

type UserContextType = {
  utilisateur: Utilisateur | null;
  setUtilisateur: (user: Utilisateur | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);

  return (
    <UserContext.Provider value={{ utilisateur, setUtilisateur }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
