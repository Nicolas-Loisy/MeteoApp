import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import ObserverConnexion from './ObserverConnexion';
import ServiceCompteFactory from './ServiceCompteFactory';
import iServiceCompte from './iServiceCompte';

const UserContext = createContext({
  serviceCompte: {} as iServiceCompte,
  statutConnecte: false as boolean | undefined,
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const serviceCompte: iServiceCompte = ServiceCompteFactory.getServiceCompte();
  const [statutConnecte, setStatutConnecte] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const observer = new ObserverConnexion(setStatutConnecte);
    serviceCompte.addObserver(observer);

    return () => {
      serviceCompte.remObserver(observer);
    };
  }, []);

  return (
    <UserContext.Provider value={{ serviceCompte, statutConnecte }}>
      {children}
    </UserContext.Provider>
  );
};
