import ServiceGeographie from "../../services/api/geographieAPI/ServiceGeographieOW";
import ServicePersistenceFactory from "../../services/persistence/ServicePersistenceFactory";
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
        const key = `${lieuData.nom}-${lieuData.pays}-${lieuData.region || ''}`; // Utiliser une clé unique basée sur le nom, le pays et la région

        if (!lieuxMap.has(key)) {
          const lieu = new Lieu(lieuData);

          resultLieuxRecherche.push(lieu);
          lieuxMap.set(key, lieu); // Ajouter le lieu à la Map pour suivre les doublons
        }
      }
    });

    return resultLieuxRecherche;
  }

  public static async enregistrerLieuxFavoris(lieux: Lieu[], UIDutilisateur: string): Promise<void> {
    const servicePersistence = ServicePersistenceFactory.getServicePersistence();

    const lieuxType: lieuType[] = [];
    lieuxType.push(... this.transformerObjectToType(lieux));

    servicePersistence.updateLieuxFavoris(lieuxType, UIDutilisateur);
  }

  public static async getLieuxFavoris(UIDutilisateur: string): Promise<Lieu[]> {
    const lieuxFavoris: Lieu[] = [];

    const servicePersistence = ServicePersistenceFactory.getServicePersistence();
    const lieuxType = await servicePersistence.getLieuxFavoris(UIDutilisateur);

    lieuxFavoris.push(...this.transformerTypeToObject(lieuxType));

    return lieuxFavoris;
  }

  private static transformerObjectToType(lieux: Lieu[]): lieuType[] {
    const lieuxType: lieuType[] = [];
    
    lieux.forEach((lieu: Lieu) => {
      lieuxType.push({
        nom: lieu.nom,
        lon: lieu.longitude.getValeur(),
        lat: lieu.latitude.getValeur(),
        pays: lieu.pays,
        region: lieu.region
      })
    })

    return lieuxType;
  }

  private static transformerTypeToObject(lieuxType: lieuType[]): Lieu[] {
    const lieux: Lieu[] = [];
    
    lieuxType.forEach((lieuType: lieuType) => {
      lieux.push(new Lieu(lieuType));
    })

    return lieux;
  }

  // private supprimerDoublons(lieuxFavoris: Lieu[]): Lieu[] {
  //     const ensembleUnique = new Set<string>();

  //     return lieuxFavoris.filter(lieu => {
  //       const clef = `${lieu.nom}-${lieu.pays}-${lieu.region}`;

  //       // Ajouter la clé au set si elle n'est pas déjà présente (si c'est un doublon)
  //       if (ensembleUnique.has(clef)) {
  //         return false; // Filtrer (supprimer) le doublon
  //       }
  //       ensembleUnique.add(clef); // Ajouter la clé au set pour le suivi

  //       return true; // Garder l'élément s'il n'est pas un doublon
  //     });
  // }

  // private isLieuAlreadyExist(lieu: Lieu): boolean {
  //     return this.lieuxFavoris.some(l => 
  //         l && l.nom && l.nom === lieu.nom 
  //         && l.pays === lieu.pays 
  //         && l.region === lieu.region
  //     );
  // }

  // public supprimerLieu(nom: string, region?: string, pays?: string): void {
  //     const index = this.lieuxFavoris.findIndex((lieu) =>
  //         lieu.nom === nom &&
  //         (!region || lieu.region === region) &&
  //         (!pays || lieu.pays === pays)
  //     );

  //     if (index !== -1) {
  //         this.lieuxFavoris.splice(index, 1);
  //     }
  // }    

  // public getLieux(): Lieu[] {
  //     return this.lieuxFavoris;
  // }

  // public getNbLieux(): Number {
  //     return this.lieuxFavoris.length;
  // }

  // public trouverLieu(nom: string, region?: string, pays?: string): Lieu | undefined {
  //     return this.lieuxFavoris.find(lieu =>
  //         lieu.nom === nom &&
  //         (!region || lieu.region === region) &&
  //         (!pays || lieu.pays === pays)
  //     );
  // } 
}

export default LieuxFavorisBuilder;