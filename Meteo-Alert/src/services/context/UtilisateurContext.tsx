import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { changeLanguage } from 'i18next';

import ServiceCompteFactory from '../auth/ServiceCompteFactory';
import ServicePersistenceFactory from '../persistence/ServicePersistenceFactory';
import AlerteFactory from '../alertes/AlerteFactory';

import Utilisateur from '../../models/entities/Utilisateur';
import Lieu from '../../models/valueObject/Lieu';
import iAlerte from '../alertes/iAlerte';

import i18n, { langueDefaut, langues } from '../i18n/i18n';

import ReglageApp from '../../config/ReglageApp';

import SystemeMesureEnum from '../../models/enum/SystemeMesureEnum';
import EvenementEnum from '../../models/enum/EvenementEnum';
import ErreurContextUtilisateur from '../../models/enum/erreurs/ErreurContexUtilisateur';

import utilisateurInfosType from '../../models/types/utilisateurInfosType';
import lieuType from '../../models/types/lieuType';
import meteoType from '../../models/types/meteoType';

import reglagePersistence from '../../models/types/pertistence/reglageAppPersistence';
import utilisateurPersistence from '../../models/types/pertistence/utilisateurPersistence';
import lieuxFavorisPersistence from '../../models/types/pertistence/lieuxFavorisPersistence';
import reglageAlertePersistence from '../../models/types/pertistence/reglageAlertePersistence';
import utilisateurFront from '../../models/types/front/utilisateurFront';
import ServiceBackgroundTask from '../background/ServiceBackgroundTask';

// Définition des attributs disponibles
type UtilisateurContextType = {
  // Gestion du compte
  inscription: (motDePasse: string, utilisateurData: utilisateurInfosType) => Promise<void>
  connexion: (email: string, motDePasse: string) => Promise<void>;
  deconnexion: () => Promise<void>;
  reinitialiserMotDePasse: (email: string) => Promise<void>;
  modifierMotDePasse: (ancienMotDePasse: string, nouveauMotDePasse: string) => Promise<void>;

  // Gestion des lieux
  ajouterLieuFavori: (lieu: Readonly<Lieu>) => Promise<void>;
  supprimerLieuFavori: (lieu: Readonly<Lieu>) => Promise<void>;
  setSeuilPersonnalise: (keyLieu: string, typeEvenement: EvenementEnum, critere: keyof meteoType, valeur: number) => Promise<void>;
  setActiverAlerte: (keyLieu: string, typeEvenement: EvenementEnum, bool: boolean) => Promise<void>;
  
  // Gestion des réglages
  setLangue: (langue: string) => Promise<void>;
  setSystemeMesure: (systemeMesure: SystemeMesureEnum) => Promise<void>;

  // Utilisateur privé de ses attributs devant être non accessibles par le front
  readonly utilisateur: utilisateurFront | null;
  readonly lieuxFavoris: ReadonlyArray<Readonly<Lieu>>;
};

// Création du contexte
const UtilisateurContext = createContext<UtilisateurContextType | null>(null);

// Création du composant
export const UtilisateurProvider = ({ children }: { children: ReactNode }) => {
  /* Attributs */
  const [utilisateurModele, setUtilisateurModele] = useState<Utilisateur | null>(null);
  const [utilisateur, setUtilisateur] = useState<utilisateurFront | null>(null);

  const [lieuxFavoris, setLieuxFavoris] = useState<ReadonlyArray<Readonly<Lieu>>>([]);

  const serviceCompte = ServiceCompteFactory.getServiceCompte();
  const servicePersistence = ServicePersistenceFactory.getServicePersistence();

  /* Fonctions locales */

  /* Récupération de l'ensemble des données d'un utilisateur et création de l'objet Utilisateur */
  const getUtilisateur = async (GUID: string): Promise<Utilisateur> => {
    // Récupération depuis la base de données
    const utilisateurData: utilisateurPersistence = await servicePersistence.getUtilisateurData(GUID);

    // Récupération des réglages de l'application
    const reglageAppData = utilisateurData.reglageApp ?? {
      langue: langueDefaut,
      systemeMesure: SystemeMesureEnum.METRIQUE
    }
    const reglageApp: ReglageApp = ReglageApp.getInstance(reglageAppData);

    // Récupération de la liste de lieux favoris
    const lieuxFavoris: Readonly<Lieu>[] = [];
    for (const [key, value] of Object.entries(utilisateurData.lieuxFavoris)) {
      
      // Création du lieu
      const lieuType: lieuType = {
        key: key,
        nom: value.nom,
        lat: value.lat,
        lon: value.lon,
        pays: value.pays,
        region: value.region,
      }

      const lieu = new Lieu(lieuType);

      // Configuration des alertes
      const reglageAlerte: readonly iAlerte[] = AlerteFactory.initAlertesFromData(value.reglageAlerte, reglageApp.getSystemeMesure());
      lieu.initReglageAlerte(reglageAlerte);
      
      // Ajout du lieu
      lieuxFavoris.push(lieu);
    }

    // Initialisation des données personnelles
    if (!utilisateurData.utilisateurInfos) throw new Error("Impossible de récupérer les informations de l'utilisateur");
    const utilisateurAttributs: utilisateurInfosType = utilisateurData.utilisateurInfos;

    const utilisateur = new Utilisateur(GUID, utilisateurAttributs, reglageApp, lieuxFavoris);
    return utilisateur;
  }

  /* Enregistrement des lieux favoris dans la base de données */
  const enregistrerLieuxFavoris = async () => {
    if (!utilisateurModele) throw new Error();

    // Création du format de données nécessaire pour la persistance
    const lieuxFavoris: ReadonlyArray<Readonly<Lieu>> = utilisateurModele.getLieuxFavoris();
    const lieuxData: lieuxFavorisPersistence = {};

    lieuxFavoris.forEach((lieu: Readonly<Lieu>) => {
      // Conversion des reglages alertes
      const reglageAlerte: ReadonlyArray<Readonly<iAlerte>> = lieu.getReglageAlerte();
      const reglageAlerteData: reglageAlertePersistence = {};

      reglageAlerte.forEach((alerte: iAlerte) => {
        const criteres = alerte.getCritere();
        const criteresPersistence: Partial<meteoType> = Object.entries(criteres)
          .reduce((acc, [nomCrit, crit]) => {
            return {...acc, [nomCrit]: crit.valeur};
          }, {} as Partial<meteoType>);

        reglageAlerteData[alerte.typeEvenement] = {
          isActiver: alerte.getActiver(),
          criteres: criteresPersistence
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
    servicePersistence.updateLieuxFavoris(lieuxData, utilisateurModele.uid);
  }

  const enregistrerReglageApp = async () => {
    if (!utilisateurModele) throw new Error();

    // Conversion des réglages
    const reglageApp = utilisateurModele.getReglageApp();
    const reglagePersistence: reglagePersistence = {
      langue: reglageApp.getLangue(),
      systemeMesure: reglageApp.getSystemeMesure()
    }

    // Enregistrer des modifications dans la bdd
    servicePersistence.updateReglage(reglagePersistence, utilisateurModele.uid);
  }

  /* Méthodes */
  const inscription = async (motDePasse: string, utilisateurAttributs: utilisateurInfosType): Promise<void> => {
    // Ajout de l'utilisateur dans le système d'authentification
    const GUID = await serviceCompte.inscription(utilisateurAttributs.email, motDePasse);

    const reglageAppPersistence: reglagePersistence = {
      langue: langueDefaut,
      systemeMesure: SystemeMesureEnum.METRIQUE
    }
    const reglageApp: ReglageApp = ReglageApp.getInstance(reglageAppPersistence);

    // Ajout de l'utilisateur dans la base de données
    const utilisateurPersistance: utilisateurPersistence = {
      lieuxFavoris: {},
      reglageApp: reglageAppPersistence,
      utilisateurInfos: utilisateurAttributs
    }

    await servicePersistence.inscription(GUID, utilisateurPersistance);

    // Création de l'utilisateur dans l'application
    const utilisateur = new Utilisateur(GUID, utilisateurAttributs, reglageApp);
    setUtilisateurModele(utilisateur);
  }

  const connexion = async (email: string, motDePasse: string): Promise<void> => {
    // Ajout dans le système d'authentification
    const GUID = await serviceCompte.connexion(email, motDePasse);
    const utilisateur = await getUtilisateur(GUID);
    setUtilisateurModele(utilisateur);
  }

  const deconnexion = async (): Promise<void> => {
    await serviceCompte.deconnexion();
    setUtilisateurModele(null);
  }

  const reinitialiserMotDePasse = async (email: string): Promise<void> => {
    await serviceCompte.reinitialiserMdp(email);
  }

  const modifierMotDePasse = async (ancienMotDePasse: string, nouveauMotDePasse: string): Promise<void> => {
    await serviceCompte.modifierMdp(ancienMotDePasse, nouveauMotDePasse);
  }

  const ajouterLieuFavori = async (lieu: Readonly<Lieu>) => {
    if (!utilisateurModele) throw ErreurContextUtilisateur.ERREUR_UTILISATEUR_NON_CONNECTE;

    // Configuration des alertes
    const reglageAlerte: readonly iAlerte[] = AlerteFactory.initAlertes(utilisateurModele.getReglageApp().getSystemeMesure());
    lieu.initReglageAlerte(reglageAlerte);

    // Ajout du lieu dans utilisateur (Application)
    utilisateurModele.ajouterLieuFavori(lieu);

    // Enregistrement dans la BDD
    await enregistrerLieuxFavoris();

    // Mise à jour du context
    setLieuxFavoris(utilisateurModele.getLieuxFavoris());
  }

  const supprimerLieuFavori = async (lieu: Readonly<Lieu>) => {
    if (!utilisateurModele) throw ErreurContextUtilisateur.ERREUR_UTILISATEUR_NON_CONNECTE;

    // Suppression du lieu dans utilisateur (Application)
    utilisateurModele.supprimerLieuFavori(lieu);

    // Enregistrement dans la BDD
    await enregistrerLieuxFavoris();

    // Mise à jour du context
    setLieuxFavoris(utilisateurModele.getLieuxFavoris());
  }

  const setSeuilPersonnalise = async (keyLieu: string, typeEvenement: EvenementEnum, critere: keyof meteoType, valeur: number) => {
    if (!utilisateurModele) throw ErreurContextUtilisateur.ERREUR_UTILISATEUR_NON_CONNECTE;

    const lieu = lieuxFavoris.find(lieuFav => lieuFav.key === keyLieu);
    if (!lieu) throw ErreurContextUtilisateur.ERREUR_LIEU_FAV_NON_TROUVE;

    // Mise à jour dans utilisateur (Application)
    lieu.setSeuilPersonnalise(typeEvenement, critere, valeur);

    // Enregistrement dans la BDD
    enregistrerLieuxFavoris();

    // Mise à jour du contexte
    setLieuxFavoris(utilisateurModele.getLieuxFavoris());
  }

  const setActiverAlerte = async (keyLieu: string, typeEvenement: EvenementEnum, bool: boolean) => {
    if (!utilisateurModele) throw ErreurContextUtilisateur.ERREUR_UTILISATEUR_NON_CONNECTE;

    const lieu = lieuxFavoris.find(lieuFav => lieuFav.key === keyLieu);
    if (!lieu) throw ErreurContextUtilisateur.ERREUR_LIEU_FAV_NON_TROUVE;

    // Mise à jour dans utilisateur (Application)
    lieu.setActiverAlerte(typeEvenement, bool);

    // Enregistrement dans la BDD
    enregistrerLieuxFavoris();

    // Mise à jour du contexte
    setLieuxFavoris(utilisateurModele.getLieuxFavoris());
  }

  const setLangue = async (langue: string): Promise<void> => {
    if (!langues.find(l => l === langue)) throw new Error();

    if (utilisateurModele) {
      // Mise à jour dans utilisateur (Application)
      utilisateurModele.getReglageApp().setLangue(langue);
      i18n.changeLanguage(langue);

      // Enregistrement dans la BDD
      enregistrerReglageApp();
    }
  }

  const setSystemeMesure = async (systemeMesure: SystemeMesureEnum): Promise<void> => {
    if (utilisateurModele) {
      // Mise à jour dans utilisateur (Application)
      utilisateurModele.getReglageApp().setSystemeMesure(systemeMesure);

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
          setUtilisateurModele(utilisateur);
        } else {
          setUtilisateurModele(null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const utilisateurFront: utilisateurFront | null =
      utilisateurModele ? {
        GUID: utilisateurModele.uid,
        prenom: utilisateurModele.getPrenom(),
        mail: utilisateurModele.getMail(),
        reglageApp: {
          langue: utilisateurModele.getReglageApp().getLangue(),
          systemeMesure: utilisateurModele.getReglageApp().getSystemeMesure()
        }
      } : null;

    setUtilisateur(utilisateurFront);

    if (utilisateurModele) {
      setLieuxFavoris(utilisateurModele.getLieuxFavoris());
      changeLanguage(utilisateurModele.getReglageApp().getLangue());
    }
  }, [utilisateurModele]);

  // Enregistre une tâche de fond pour envoyer les notifs 
  useEffect(() => {
    if (utilisateurModele) {
      ServiceBackgroundTask.registerBackgroundFetchAsync(lieuxFavoris, utilisateurModele)
    }
  }, [lieuxFavoris])

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
        setActiverAlerte,

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
