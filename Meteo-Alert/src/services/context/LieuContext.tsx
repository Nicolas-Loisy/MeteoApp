import React, { createContext, useContext, ReactNode } from 'react';
import Lieu from '../../models/valueObject/Lieu';

type LieuContextProps = {
  lieu: Readonly<Lieu> | null;
  setLieu: (lieu: Readonly<Lieu>) => void;
}

const LieuContext = createContext<LieuContextProps | null>(null);

export const LieuProvider = ({ children }: { children: ReactNode }) => {
  const [lieu, setLieu] = React.useState<Readonly<Lieu> | null>(null);

  return (
    <LieuContext.Provider value={{ lieu, setLieu }}>
      {children}
    </LieuContext.Provider>
  );
};

export const useLieu = () => {
  const context = useContext(LieuContext);
  if (!context) {
    throw new Error('useLieu must be used within a LieuProvider');
  }
  return context;
};
