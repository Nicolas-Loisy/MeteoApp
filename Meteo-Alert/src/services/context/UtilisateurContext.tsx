import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import Utilisateur from '../../models/entities/Utilisateur';
import Lieu from '../../models/valueObject/Lieu';
import ServiceCompteFactory from '../compteUtilisateur/ServiceCompteFactory';
import utilisateurType from '../../models/types/utilisateurType';
import ServicePersistenceFactory from '../persistence/ServicePersistenceFactory';
import lieuType from '../../models/types/lieuType';
import iAlerte from '../alertes/iAlerte';
import AlerteFactory from '../alertes/AlerteFactory';
import utilisateurDataType from '../../models/types/pertistence/utilisateurDataType';
import lieuxFavorisDataType from '../../models/types/pertistence/lieuxFavorisDataType';
import reglageAlerteDataType from '../../models/types/pertistence/reglageAlerteData';
import EvenementEnum from '../../models/enum/EvenementEnum';
import meteoType from '../../models/types/meteoType';
import ErreurContextUtilisateur from '../../models/enum/erreurs/ErreurContexUtilisateur';
import i18n, { langueDefaut } from '../i18n/i18n';
import SystemeMesureEnum from '../../models/enum/SystemeMesureEnum';
import langueType from '../../models/types/langueType';
import reglageAppData from '../../models/types/pertistence/reglageAppData';
import { changeLanguage } from 'i18next';

// Définition des attributs disponibles
type UtilisateurContextType = {
  inscription: (motDePasse: string, utilisateurData: utilisateurType) => Promise<void>
  connexion: (email: string, motDePasse: string) => Promise<void>;
  deconnexion: () => Promise<void>;
  reinitialiserMotDePasse: (email: string) => Promise<void>;
  modifierMotDePasse: (ancienMotDePasse: string, nouveauMotDePasse: string) => Promise<void>;
  ajouterLieuFavori: (lieu: Readonly<Lieu>) => Promise<void>;
  supprimerLieuFavori: (lieu: Readonly<Lieu>) => Promise<void>;
  setSeuilPersonnalise: (keyLieu: string, typeEvenement: EvenementEnum, critere: keyof meteoType, valeur: number) => Promise<void>;
  setLangue: (langue: langueType) => Promise<void>;
  setSystemeMesure: (systemeMesure: SystemeMesureEnum) => Promise<void>;

  // Utilisateur privé de ses attributs devant être non accessibles par le front
  readonly utilisateur: Readonly<Omit<Utilisateur, "getLieuxFavoris" | "ajouterLieuFavori" | "supprimerLieuFavori">> | null; 
  readonly lieuxFavoris: ReadonlyArray<Readonly<Lieu>>;
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

  /* Fonctions locales */

  /* Récupération de l'ensemble des données d'un utilisateur et création de l'objet Utilisateur */
  const getUtilisateur = async (GUID: string): Promise<Utilisateur> => {
    // Récupération depuis la base de données
    const utilisateurData: utilisateurDataType = await servicePersistence.getUtilisateurData(GUID);
    const utilisateurAttributs: utilisateurType = {
      ...utilisateurData
    };

    // Récupération de la liste de lieux favoris
    const lieuxFavoris: Readonly<Lieu>[] = [];
    for (const [key, value] of Object.entries(utilisateurData.lieuxFavoris)) {
      const reglageAlerte: readonly iAlerte[] = AlerteFactory.initAlertesFromData(value.reglageAlerte);

      const lieuType: lieuType = {
        key: key,
        nom: value.nom,
        lat: value.lat,
        lon: value.lon,
        pays: value.pays,
        region: value.region,
        reglageAlerte: reglageAlerte
      }

      const lieu = new Lieu(lieuType);
      lieuxFavoris.push(lieu);
    }

    // Récupération des réglages de l'application
    const reglageAppData = utilisateurData.reglageApp ?? {
      langue: langueDefaut,
      systemeMesure: SystemeMesureEnum.METRIQUE
    }

    // Création de l'utilisateur dans l'application
    const utilisateur = new Utilisateur(GUID, utilisateurAttributs, reglageAppData, lieuxFavoris);
    return utilisateur;
  }

  /* Enregistrement des lieux favoris dans la base de données */
  const enregistrerLieuxFavoris = async () => {
    if (!utilisateur) throw new Error();

    // Création du format de données nécessaire pour la persistance
    const lieuxFavoris: ReadonlyArray<Readonly<Lieu>> = utilisateur.getLieuxFavoris();
    const lieuxData: lieuxFavorisDataType = {};

    lieuxFavoris.forEach((lieu: Readonly<Lieu>) => {
      // Conversion des reglages alertes
      const reglageAlerte: ReadonlyArray<Readonly<iAlerte>> = lieu.getReglageAlerte();
      const reglageAlerteData: reglageAlerteDataType = {};

      reglageAlerte.forEach((alerte: iAlerte) => {
        reglageAlerteData[alerte.typeEvenement] = {
          isActiver: alerte.isActiver,
          criteres: alerte.getCritere()
        }
      });

      // Conversion du lieu
      lieuxData[lieu.key] = {
        lat: lieu.latitude.getValeur(),
        lon: lieu.longitude.getValeur(),
        nom: lieu.nom,
        pays: lieu.pays,
        region: lieu.region,
        reglageAlerte: reglageAlerteData
      }
    });

    // Enregistrement des modifications dans la bdd
    servicePersistence.updateLieuxFavoris(lieuxData, utilisateur.uid);
  }

  const enregistrerReglageApp = async () => {
    if (!utilisateur) throw new Error();

    // Conversion des réglages
    const reglageApp = utilisateur.getReglageApp();
    const reglageAppData: reglageAppData = {
      langue: reglageApp.getLangue(),
      systemeMesure: reglageApp.getSystemeMesure()
    }

    // Enregistrer des modifications dans la bdd
    servicePersistence.updateReglage(reglageAppData, utilisateur.uid);
  }

  /* Méthodes */
  const inscription = async (motDePasse: string, utilisateurAttributs: utilisateurType): Promise<void> => {
    // Ajout de l'utilisateur dans le système d'authentification
    const GUID = await serviceCompte.inscription(utilisateurAttributs.email, motDePasse);

    const reglageApp: reglageAppData = {
      langue: langueDefaut,
      systemeMesure: SystemeMesureEnum.METRIQUE
    }

    // Ajout de l'utilisateur dans la base de données
    const utilisateurPersistance: utilisateurDataType = {
      lieuxFavoris: {},
      reglageApp,
      ...utilisateurAttributs
    }

    await servicePersistence.inscription(GUID, utilisateurPersistance);

    // Création de l'utilisateur dans l'application
    const utilisateur = new Utilisateur(GUID, utilisateurAttributs, reglageApp );
    setUtilisateur(utilisateur);
  }

  const connexion = async (email: string, motDePasse: string): Promise<void> => {
    // Ajout dans le système d'authentification
    const GUID = await serviceCompte.connexion(email, motDePasse);
    const utilisateur = await getUtilisateur(GUID);
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
    if (!utilisateur) throw ErreurContextUtilisateur.ERREUR_UTILISATEUR_NON_CONNECTE;

    // Ajout du lieu dans utilisateur (Application)
    utilisateur.ajouterLieuFavori(lieu);

    // Enregistrement dans la BDD
    await enregistrerLieuxFavoris();

    // Mise à jour du context
    setLieuxFavoris(utilisateur.getLieuxFavoris());
    
  }

  const supprimerLieuFavori = async (lieu: Readonly<Lieu>) => {
    if (!utilisateur) throw ErreurContextUtilisateur.ERREUR_UTILISATEUR_NON_CONNECTE;

    // Suppression du lieu dans utilisateur (Application)
    utilisateur.supprimerLieuFavori(lieu);

    // Enregistrement dans la BDD
    await enregistrerLieuxFavoris();

    // Mise à jour du context
    setLieuxFavoris(utilisateur.getLieuxFavoris()); 
  }

  const setSeuilPersonnalise = async (keyLieu: string, typeEvenement: EvenementEnum, critere: keyof meteoType, valeur: number) => {
    if (!utilisateur) throw ErreurContextUtilisateur.ERREUR_UTILISATEUR_NON_CONNECTE;

    const lieu = lieuxFavoris.find(lieuFav => lieuFav.key === keyLieu);
    if (!lieu) throw ErreurContextUtilisateur.ERREUR_LIEU_FAV_NON_TROUVE;

    // Mise à jour dans utilisateur (Application)
    lieu.setSeuilPersonnalise(typeEvenement, critere, valeur);

    // Enregistrement dans la BDD
    enregistrerLieuxFavoris();

    // Mise à jour du contexte
    setLieuxFavoris(utilisateur.getLieuxFavoris());
  }

  const setLangue = async (langue: langueType): Promise<void> => {
    if (utilisateur) {
      // Mise à jour dans utilisateur (Application)
      utilisateur.getReglageApp().setLangue(langue);
      i18n.changeLanguage(langue);

      // Enregistrement dans la BDD
      enregistrerReglageApp();
    }
  }

  const setSystemeMesure = async (systemeMesure: SystemeMesureEnum): Promise<void> => {
    if (utilisateur) {
      // Mise à jour dans utilisateur (Application)
      utilisateur.getReglageApp().setSystemeMesure(systemeMesure);

      // Enregistrement dans la BDD
      enregistrerReglageApp();
    }
  }

  /* UseEffect */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const GUID = await ServiceCompteFactory.getServiceCompte().fetchConnexion();
        if (GUID) {
          const utilisateur = await getUtilisateur(GUID);
          setUtilisateur(utilisateur);
        } else {
          setUtilisateur(null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (utilisateur) {
      setLieuxFavoris(utilisateur.getLieuxFavoris());
      changeLanguage(utilisateur.getReglageApp().getLangue());
    }
  }, [utilisateur]);

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
        setSeuilPersonnalise,
        setLangue,
        setSystemeMesure,

        lieuxFavoris,
        utilisateur
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
    throw ErreurContextUtilisateur.ERREUR_USE_CONTEXT_HORS_PROVIDER;
  }
  return context;
};
