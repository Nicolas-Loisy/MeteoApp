import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import Utilisateur from '../../models/entities/Utilisateur';
import Lieu from '../../models/valueObject/Lieu';
import ServiceCompteFactory from '../compteUtilisateur/ServiceCompteFactory';
import utilisateurType from '../../models/types/utilisateurType';
import ServicePersistenceFactory from '../persistence/ServicePersistenceFactory';
import utilisateurPersistenceType from '../../models/types/utilisateurPersistenceType';

// Définition des attributs disponibles
type UtilisateurContextType = {
  inscription: (email: string, motDePasse: string, utilisateurData: utilisateurType) => Promise<void>
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
  const servicePersistence = ServicePersistenceFactory.getServicePersistence();

  /* Méthodes */
  const inscription = async (email: string, motDePasse: string, utilisateurData: utilisateurType): Promise<void> => {
    // Ajout dans le système d'authentification
    const GUID = await serviceCompte.inscription(email, motDePasse, utilisateurData);

    // Ajout dans la base de données
    const utilisateurPersistance: utilisateurPersistenceType = {
      email: email,
      lieuxFavoris: {},
      prenom: utilisateurData.prenom
    }
    await servicePersistence.inscription(GUID, utilisateurPersistance);

    // Création de l'utilisateur dans l'application
    const utilisateur = new Utilisateur(GUID, email, utilisateurData);
    setUtilisateur(utilisateur);
  }

  const connexion = async (email: string, motDePasse: string): Promise<void> => {
    // Ajout dans le système d'authentification
    const GUID = await serviceCompte.connexion(email, motDePasse);
    console.log("GUID = " + GUID);

    // Ajout dans la base de données
    const utilisateurData = await servicePersistence.getUtilisateurData(GUID);
    console.log(utilisateurData);

    // Création de l'utilisateur dans l'application
    const utilisateur = new Utilisateur(GUID, email, utilisateurData);
    setUtilisateur(utilisateur);
  }

  const deconnexion = async (): Promise<void> => {
    await serviceCompte.deconnexion();
    setUtilisateur(null);
  }

  const reinitialiserMotDePasse = async (email: string): Promise<void> => {
    await serviceCompte.reinitialiserMdp(email);
  }

  const modifierMotDePasse = async (ancienMotDePasse: string, nouveauMotDePasse: string): Promise<void> => {
    await serviceCompte.modifierMdp(ancienMotDePasse, nouveauMotDePasse);
  }

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

  /* UseEffect */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const GUID = await ServiceCompteFactory.getServiceCompte().fetchConnexion();
        if (GUID) {
          // Ajout dans la base de données
          const utilisateurData = await servicePersistence.getUtilisateurData(GUID);

          // Création de l'utilisateur dans l'application
          const utilisateur = new Utilisateur(GUID, utilisateurData.email, utilisateurData);
          setUtilisateur(utilisateur);

        } else {
          setUtilisateur(null);
        }
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
