import React, { createContext, useContext, ReactNode, useState } from 'react';
import Lieu from '../../models/valueObject/Lieu';
import lieuType from '../../models/types/lieuType';
import iServiceGeographie from '../api/geographieAPI/iServiceGeographie';
import ServiceGeographieFactory from '../api/geographieAPI/ServiceGeographieFactory';

type GeographieContextProps = {
  resultatsRecherche: ReadonlyArray<Readonly<Lieu>> | null;
  rechercheLieux: (nomLieu: string) => Promise<void>;
}

const GeographieContext = createContext<GeographieContextProps | null>(null);

export const GeographieProvider = ({ children }: { children: ReactNode }) => {
  /* Attributs */
  const [resultatsRecherche, setResultatsRecherche] = useState<ReadonlyArray<Readonly<Lieu>> | null>(null);

  const serviceGeo: iServiceGeographie = ServiceGeographieFactory.getServiceGeographie();

  /* Méthodes */
  const rechercheLieux = async (nomLieu: string): Promise<void> => {
    // Lancement de la recherche
    const lieuxData: lieuType[] = await serviceGeo.rechercheLieux(nomLieu);

    // Tri des résultats
    const resultLieuxRecherche: Readonly<Lieu>[] = [];
    lieuxData.forEach(lieuData => {
      const lieu = new Lieu(lieuData);
      resultLieuxRecherche.push(lieu);
    });

    setResultatsRecherche(resultLieuxRecherche);
  }


  return (
    <GeographieContext.Provider value={{resultatsRecherche, rechercheLieux }}>
      {children}
    </GeographieContext.Provider>
  );
};

export const useGeographie = () => {
  const context = useContext(GeographieContext);
  if (!context) {
    throw new Error('useGeographie must be used within a GeographieProvider');
  }
  return context;
};
