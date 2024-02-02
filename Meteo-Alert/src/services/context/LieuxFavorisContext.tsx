import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import Lieu from '../../models/valueObject/Lieu';
import { useUser } from './UserContext';

type LieuxFavorisContext = {
  lieuxFavoris: ReadonlyArray<Readonly<Lieu>>;
  setLieuxFavoris: (lieuxFavoris: ReadonlyArray<Readonly<Lieu>>) => void;
}

const LieuxFavorisContext = createContext<LieuxFavorisContext | null>(null);

export const LieuxFavorisProvider = ({ children }: { children: ReactNode }) => {
  const [lieuxFavoris, setLieuxFavoris] = useState<ReadonlyArray<Readonly<Lieu>>>([]);
  const { utilisateur } = useUser();

  useEffect(() => {
    if (utilisateur) 
      setLieuxFavoris(utilisateur?.getLieuxFavoris());
  }, [utilisateur]) 

  return (
    <LieuxFavorisContext.Provider value={{ lieuxFavoris, setLieuxFavoris }}>
      {children}
    </LieuxFavorisContext.Provider>
  );
};

export const useLieuxFavoris = () => {
  const context = useContext(LieuxFavorisContext);
  if (!context) {
    throw new Error('useLieu must be used within a LieuxFavorisProvider');
  }
  return context;
};
