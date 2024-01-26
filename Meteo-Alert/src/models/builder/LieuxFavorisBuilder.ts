import ServiceGeographie from "../../services/ServiceGeographieOW";
import ServicePersistenceFactory from "../../services/persistence/ServicePersistenceFactory";
import lieuType from "../types/lieuType";
import Lieu from "../valueObject/Lieu";

class LieuxFavorisBuilder {
    private lieuxFavoris: Lieu[];
    private serviceGeo: ServiceGeographie;

    constructor(lieuxFavoris: Lieu[] = [] ) {
        this.lieuxFavoris = this.supprimerDoublons(lieuxFavoris);
        this.serviceGeo = new ServiceGeographie(process.env.OPEN_GEO_API_URL ?? "");
    }

    private supprimerDoublons(lieuxFavoris: Lieu[]): Lieu[] {
        const ensembleUnique = new Set<string>();
        
        return lieuxFavoris.filter(lieu => {
          const clef = `${lieu.getNom()}-${lieu.getPays()}-${lieu.getRegion()}`;

          // Ajouter la clé au set si elle n'est pas déjà présente (si c'est un doublon)
          if (ensembleUnique.has(clef)) {
            return false; // Filtrer (supprimer) le doublon
          }
          ensembleUnique.add(clef); // Ajouter la clé au set pour le suivi

          return true; // Garder l'élément s'il n'est pas un doublon
        });
    }

    public async rechercheLieux(nomLieu: string): Promise<Lieu[]> {
        const lieuxData: lieuType[] = await this.serviceGeo.rechercheLieux(nomLieu);
        
        const resultLieuxRecherche: Lieu[] = [];
        const lieuxMap = new Map<string, Lieu>(); // Utilisation d'une Map pour stocker les lieux uniques
        
        lieuxData.forEach(lieuData => {
            if (lieuData) {
                const key = `${lieuData.name}-${lieuData.country}-${lieuData.state || ''}`; // Utiliser une clé unique basée sur le nom, le pays et la région
                
                if (!lieuxMap.has(key)) {
                    const lieu = new Lieu(lieuData);
                    
                    resultLieuxRecherche.push(lieu);
                    lieuxMap.set(key, lieu); // Ajouter le lieu à la Map pour suivre les doublons
                }
            }
        });
        
        return resultLieuxRecherche;
    }

    // public ajouterLieuParDonnees(nom: string, pays: string, region: string, longitude: number, latitude: number, uid: string): void {
    //     // const serviceCompte = ServiceCompteFactory.getServiceCompte();
        
    //     let lieuData: lieuType = {
    //         name: nom,
    //         lon: longitude,
    //         lat: latitude,
    //         country: pays,
    //         state: region
    //     }
        
    //     const lieu = new Lieu(lieuData);
    //     this.lieuxFavoris.push(lieu);
    //     // serviceCompte.updateFavoris(JSON.stringify(this.lieuxFavoris), uid);
    // }

    public ajouterLieu(lieu: Lieu, uid: string): void {
        const servicePersistence = ServicePersistenceFactory.getServicePersistence();
        
        if (this.isLieuAlreadyExist(lieu)) {
            // throw new Error("Le lieu est déjà dans la liste des favoris.");
            console.log("Le lieu est déjà dans la liste des favoris.");
        } else {
            console.log("Ajout nouveau lieu dans la liste des favoris.");
            this.lieuxFavoris.push(lieu);
            servicePersistence.updateLieuxFavoris(JSON.stringify(this.lieuxFavoris), uid);
        }
    }

    private isLieuAlreadyExist(lieu: Lieu): boolean {
        return this.lieuxFavoris.some(l => 
            l && l.getNom() && l.getNom() === lieu.getNom() 
            && l.getPays() === lieu.getPays() 
            && l.getRegion() === lieu.getRegion()
        );
    }

    public supprimerLieu(nom: string, region?: string, pays?: string): void {
        const index = this.lieuxFavoris.findIndex((lieu) =>
            lieu.getNom() === nom &&
            (!region || lieu.getRegion() === region) &&
            (!pays || lieu.getPays() === pays)
        );
    
        if (index !== -1) {
            this.lieuxFavoris.splice(index, 1);
        }
    }    

    public getLieux(): Lieu[] {
        return this.lieuxFavoris;
    }

    public getNbLieux(): Number {
        return this.lieuxFavoris.length;
    }

    public trouverLieu(nom: string, region?: string, pays?: string): Lieu | undefined {
        return this.lieuxFavoris.find(lieu =>
            lieu.getNom() === nom &&
            (!region || lieu.getRegion() === region) &&
            (!pays || lieu.getPays() === pays)
        );
    }    
}

export default LieuxFavorisBuilder;