import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import Utilisateur from '../../models/entities/Utilisateur';
import Lieu from '../../models/valueObject/Lieu';
import ServiceCompteFactory from '../compteUtilisateur/ServiceCompteFactory';
import utilisateurType from '../../models/types/utilisateurType';

// Définition des attributs disponibles
type UtilisateurContextType = {
  inscription: (email: string, motDePasse: string, utilisateurData: Object) => Promise<void>
  connexion: (email: string, motDePasse: string) => Promise<void>;
  deconnexion: () => Promise<void>;
  reinitialiserMotDePasse: (email: string) => Promise<void>;
  modifierMotDePasse: (ancienMotDePasse: string, nouveauMotDePasse: string) => Promise<void>;
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
  /* Attributs */
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
  const [lieuxFavoris, setLieuxFavoris] = useState<ReadonlyArray<Readonly<Lieu>>>([]);
  const serviceCompte = ServiceCompteFactory.getServiceCompte();

  /* Méthodes */
  const inscription = async (email: string, motDePasse: string, utilisateurData: Object): Promise<void> => {
    try {
      const utilisateur = await serviceCompte.inscription(email, motDePasse, utilisateurData);
      setUtilisateur(utilisateur);
    } catch(error: any) {
      console.error(error);
      throw error;
    }
  }

  const connexion = async (email: string, motDePasse: string): Promise<void> => {
    try {
      const utilisateur = await serviceCompte.connexion(email, motDePasse);
      setUtilisateur(utilisateur);
    } catch(error: any) {
      console.error(error);
      throw error;
    }
  }

  const deconnexion = async (): Promise<void> => {
    try {
      await serviceCompte.deconnexion();
      setUtilisateur(null);
    } catch(error: any) {
      console.error(error);
      throw error;
    }
  }

  const reinitialiserMotDePasse =  async (email: string): Promise<void> => {
    try {
      await serviceCompte.reinitialiserMdp(email);
    } catch(error: any) {
      console.error(error);
      throw error;
    }
  }

  const modifierMotDePasse = async (ancienMotDePasse: string, nouveauMotDePasse: string): Promise<void> => {
    try {
      await serviceCompte.modifierMdp(ancienMotDePasse, nouveauMotDePasse);
    } catch(error: any) {
      console.error(error)
      throw error;
    }
  }

  const ajouterLieuFavori = async (lieu: Readonly<Lieu>) => {
    if (utilisateur) {
      try {
        await utilisateur?.ajouterLieuFavori(lieu);
        setLieuxFavoris(utilisateur.getLieuxFavoris());
      } catch (error: any){
        console.error(error);
        throw error;
      }
    }
  }
  
  const supprimerLieuFavori = async (lieu: Readonly<Lieu>) => {
    if (utilisateur) {
      try {
        await utilisateur?.supprimerLieuFavori(lieu);
        setLieuxFavoris(utilisateur.getLieuxFavoris());
      } catch (error: any) {
        console.error(error);
        throw error;
      }
    }
  }

  /* UseEffect */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const utilisateur = await ServiceCompteFactory.getServiceCompte().fetchConnexion();
        setUtilisateur(utilisateur);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (utilisateur) {
      setLieuxFavoris(utilisateur.getLieuxFavoris());
    }
  }, [utilisateur])

  return (
    <UtilisateurContext.Provider 
      value={{ 
        inscription, 
        connexion, 
        deconnexion, 
        reinitialiserMotDePasse, 
        modifierMotDePasse, 
        ajouterLieuFavori, 
        supprimerLieuFavori, 
        lieuxFavoris, 
        prenom: utilisateur?.getPrenom() ?? null, 
        mail: utilisateur?.getMail() ?? null, 
        UID: utilisateur?.uid ?? null
      }}
      >
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
