import ServiceGeographie from "../../services/api/geographieAPI/ServiceGeographieOW";
import ServicePersistenceFactory from "../../services/persistence/ServicePersistenceFactory";
import lieuType from "../types/lieuType";
import Lieu from "../valueObject/Lieu";

class LieuxFavorisBuilder {
  private static serviceGeo: ServiceGeographie = new ServiceGeographie(process.env.OPEN_GEO_API_URL ?? "");

  private constructor() { }

  public static async rechercheLieux(nomLieu: string): Promise<Lieu[]> {
    const lieuxData: lieuType[] = await LieuxFavorisBuilder.serviceGeo.rechercheLieux(nomLieu);

    const resultLieuxRecherche: Lieu[] = [];

    lieuxData.forEach(lieuData => {
      const lieu = new Lieu(lieuData);

      resultLieuxRecherche.push(lieu);
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
    if (!lieu.key) {
      throw new Error("[ERREUR] Suppression impossible : UID du lieu manquant");
    }

    const servicePersistence = ServicePersistenceFactory.getServicePersistence();
    servicePersistence.supprimerLieuFavori(lieu.key, UIDutilisateur);
  }

  // Fonctions utiles
  private static transformerObjectToType(lieu: Lieu): lieuType {
    const lieuxType: lieuType = {
      key: lieu.key,
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