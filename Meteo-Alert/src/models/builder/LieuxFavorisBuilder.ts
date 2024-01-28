import iAlerte from "../../services/alertes/iAlerte";
import ServiceGeographie from "../../services/api/geographieAPI/ServiceGeographieOW";
import ServicePersistenceFactory from "../../services/persistence/ServicePersistenceFactory";
import lieuType from "../types/lieuType";
import { alerteType } from "../types/alerteType";
import Lieu from "../valueObject/Lieu";

class LieuxFavorisBuilder {
  private constructor() { }

  private static serviceGeo: ServiceGeographie = new ServiceGeographie(process.env.OPEN_GEO_API_URL!);
  private static servicePersistence = ServicePersistenceFactory.getServicePersistence();

  public static async rechercheLieux(nomLieu: string): Promise<Lieu[]> {
    // Lancement de la recherche
    const lieuxData: lieuType[] = await LieuxFavorisBuilder.serviceGeo.rechercheLieux(nomLieu);

    // Tri des résultats
    const resultLieuxRecherche: Lieu[] = [];
    lieuxData.forEach(lieuData => {
      const lieu = new Lieu(lieuData);

      resultLieuxRecherche.push(lieu);
    });

    return resultLieuxRecherche;
  }

  public static async getLieuxFavoris(UIDutilisateur: string): Promise<Lieu[]> {
    const lieuxType = await LieuxFavorisBuilder.servicePersistence.getLieuxFavoris(UIDutilisateur);

    const lieuxFavoris: Lieu[] = [];
    lieuxFavoris.push(...this.transformerTypeToObject(lieuxType));

    return lieuxFavoris;
  }

  public static async ajouterLieuFavori(nouveauLieu: Lieu, UIDutilisateur: string): Promise<void> {
    // Sauvegarde du lieu
    const nouveauLieuData = this.transformerObjectToType(nouveauLieu);
    LieuxFavorisBuilder.servicePersistence.ajouterLieuFavori(nouveauLieuData, UIDutilisateur);

    // Sauvegarde des réglages du lieu
    const reglageAlerte = nouveauLieu.getReglageAlerte();
    this.updateReglageAlertes(reglageAlerte, nouveauLieu.key, UIDutilisateur);
  }

  public static async supprimerLieuFavori(lieu: Lieu, UIDutilisateur: string): Promise<void> {
    LieuxFavorisBuilder.servicePersistence.supprimerLieuFavori(lieu.key, UIDutilisateur);
  }

  public static async updateReglageAlertes(alertes: ReadonlyArray<iAlerte>, keyLieu: string, UIDutilisateur: string) {
    // Converti l'objet lieu au format sauvegardé dans la base de données
    const reglageAlertes: alerteType[] = [];

    alertes.forEach((alerte: iAlerte) => {
      reglageAlertes.push({
        typeEvenement: alerte.typeEvenement,
        isActiver: alerte.isActiver,
        criteres: Object.fromEntries(
          Object.entries(alerte.criteres).map(([key, value]) => [key, value.getValeur()])
        )
      })
    })

    // Enregistrement
    reglageAlertes.forEach((reglageAlerte: alerteType) => {
      LieuxFavorisBuilder.servicePersistence.ajouterReglageAlerte(reglageAlerte, keyLieu, UIDutilisateur);
    })
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