import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import Utilisateur from '../../models/entities/Utilisateur';
import Lieu from '../../models/valueObject/Lieu';

// Définition des attributs disponibles
type UtilisateurContextType = {
  setUtilisateur: (user: Utilisateur | null) => void;
  ajouterLieuFavori: (lieu: Readonly<Lieu>) => Promise<void>;
  supprimerLieuFavori: (lieu: Readonly<Lieu>) => Promise<void>;
  readonly lieuxFavoris: ReadonlyArray<Readonly<Lieu>>;
  readonly prenom: string | null;
  readonly mail: string | null;
  readonly UID: string | null;
};

// Création du contexte
const UtilisateurContext = createContext<UtilisateurContextType | null>(null);

// Création du composant
export const UtilisateurProvider = ({ children }: { children: ReactNode }) => {
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
  const [lieuxFavoris, setLieuxFavoris] = useState<ReadonlyArray<Readonly<Lieu>>>([]);
  const [prenom, setPrenom] = useState<string | null>(null);
  const [mail, setMail] = useState<string | null>(null);
  const [UID, setUID] = useState<string | null>(null);

  useEffect(() => {
    if (utilisateur) {
      setPrenom(utilisateur.getPrenom());
      setMail(utilisateur.getMail());
      setUID(utilisateur.uid);
      setLieuxFavoris(utilisateur.getLieuxFavoris());
    }
  }, [utilisateur])

  const ajouterLieuFavori = async (lieu: Readonly<Lieu>) => {
    if (utilisateur) {
      await utilisateur?.ajouterLieuFavori(lieu);
      setLieuxFavoris(utilisateur.getLieuxFavoris());
    }
  }
  
  const supprimerLieuFavori = async (lieu: Readonly<Lieu>) => {
    if (utilisateur) {
      await utilisateur?.supprimerLieuFavori(lieu);
      setLieuxFavoris(utilisateur.getLieuxFavoris());
    }
  }

  return (
    <UtilisateurContext.Provider value={{ setUtilisateur, ajouterLieuFavori, supprimerLieuFavori, lieuxFavoris, prenom, mail, UID}}>
      {children}
    </UtilisateurContext.Provider>
  );
};

// Utilisation du contexte
export const useUtilisateur = () => {
  const context = useContext(UtilisateurContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
