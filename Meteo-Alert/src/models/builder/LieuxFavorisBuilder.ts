import ServiceGeographie from "../../services/api/geographieAPI/ServiceGeographieOW";
import ServicePersistenceFactory from "../../services/persistence/ServicePersistenceFactory";
import { generateUUID } from "../../utils/uuid";
import lieuType from "../types/lieuType";
import Lieu from "../valueObject/Lieu";

class LieuxFavorisBuilder {
  // private lieuxFavoris: Lieu[];
  private static serviceGeo: ServiceGeographie = new ServiceGeographie(process.env.OPEN_GEO_API_URL ?? "");

  private constructor() {}

  public static async rechercheLieux(nomLieu: string): Promise<Lieu[]> {
    const lieuxData: lieuType[] = await LieuxFavorisBuilder.serviceGeo.rechercheLieux(nomLieu);

    const resultLieuxRecherche: Lieu[] = [];
    const lieuxMap = new Map<string, Lieu>(); // Utilisation d'une Map pour stocker les lieux uniques

    lieuxData.forEach(lieuData => {
      if (lieuData) {
        const key = `${lieuData.nom}-${lieuData.pays}-${lieuData.region}`; // Utiliser une clé unique basée sur le nom, le pays et la région

        if (!lieuxMap.has(key)) {
          const uuid = generateUUID();
          const lieu = new Lieu({
            UID: uuid,
            ...lieuData
          });

          resultLieuxRecherche.push(lieu);
          lieuxMap.set(key, lieu); // Ajouter le lieu à la Map pour suivre les doublons
        }
      }
    });

    return resultLieuxRecherche;
  }

  public static async getLieuxFavoris(UIDutilisateur: string): Promise<Lieu[]> {
    const lieuxFavoris: Lieu[] = [];

    const servicePersistence = ServicePersistenceFactory.getServicePersistence();
    const lieuxType = await servicePersistence.getLieuxFavoris(UIDutilisateur);

    lieuxFavoris.push(...this.transformerTypeToObject(lieuxType));

    return lieuxFavoris;
  }

  public static async ajouterLieuFavori(nouveauLieu: Lieu, UIDutilisateur: string): Promise<void> {
    const servicePersistence = ServicePersistenceFactory.getServicePersistence();
    const nouveauLieuData = this.transformerObjectToType(nouveauLieu);

    servicePersistence.ajouterLieuFavori(nouveauLieuData, UIDutilisateur);
  }

  public static async supprimerLieuFavori(lieu: Lieu, UIDutilisateur: string): Promise<void> {
    if (!lieu.UID) {
      throw new Error("[ERREUR] Suppression impossible : UID du lieu manquant");
    }

    const servicePersistence = ServicePersistenceFactory.getServicePersistence();
    servicePersistence.supprimerLieuFavori(lieu.UID, UIDutilisateur);
  }

  // Fonctions utiles
  private static transformerObjectToType(lieu: Lieu): lieuType {
    const lieuxType: lieuType = {
      UID: lieu.UID,
      nom: lieu.nom,
      lon: lieu.longitude.getValeur(),
      lat: lieu.latitude.getValeur(),
      pays: lieu.pays,
      region: lieu.region
    };
    
    return lieuxType;
  }

  private static transformerTypeToObject(lieuxType: lieuType[]): Lieu[] {
    const lieux: Lieu[] = [];
    
    lieuxType.forEach((lieuType: lieuType) => {
      lieux.push(new Lieu(lieuType));
    })

    return lieux;
  }
}

export default LieuxFavorisBuilder;