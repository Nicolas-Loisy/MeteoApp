import ServiceGeographie from "../../services/ServiceGeographie";
import UniteCoordonnee from "../datatype/UniteCoordonnee";
import JSONObject from "../interface/JSONObject";
import Lieu from "../valueObject/Lieu";

class LieuxFavorisBuilder {
    private lieuxFavoris: Lieu[];
    private serviceGeo: ServiceGeographie;

    constructor(lieuxFavoris: Lieu[] = [] ) {
        this.lieuxFavoris = lieuxFavoris;
        this.serviceGeo = new ServiceGeographie(process.env.OPEN_GEO_API_URL ?? "");
    }

    public async rechercheLieux(nomLieu: string): Promise<Lieu[]> {
        const lieuxData: JSONObject = await this.serviceGeo.rechercheLieux(nomLieu);
        
        const resultLieuxRecherche: Lieu[] = [];
        const lieuxMap = new Map<string, Lieu>(); // Utilisation d'une Map pour stocker les lieux uniques
        
        Object.values(lieuxData).forEach(lieuData => {
            if (lieuData) {
                const formatJson: { lieuData: JSONObject } = {
                    lieuData: lieuData as JSONObject,
                };

                const key = `${formatJson.lieuData['name']}-${formatJson.lieuData['country']}-${formatJson.lieuData['state'] || ''}`; // Utiliser une clé unique basée sur le nom, le pays et la région
                if (!lieuxMap.has(key)) {
                    const longitude = new UniteCoordonnee(parseFloat(String(formatJson.lieuData['lon'])));
                    const latitude = new UniteCoordonnee(parseFloat(String(formatJson.lieuData['lat'])));
                    const lieu = new Lieu(String(formatJson.lieuData['name']), String(formatJson.lieuData['country']), String(formatJson.lieuData['state']), longitude, latitude);
                    
                    resultLieuxRecherche.push(lieu);
                    lieuxMap.set(key, lieu); // Ajouter le lieu à la Map pour suivre les doublons
                }
            }
        });
        
        return resultLieuxRecherche;
    }

    public ajouterLieuParDonnees(nom: string, pays: string, region: string, longitude: UniteCoordonnee, latitude: UniteCoordonnee): void {
        const lieu = new Lieu(nom, pays, region, longitude, latitude);
        this.lieuxFavoris.push(lieu);
    }

    public ajouterLieu(lieu: Lieu): void {
        const existeDeja = this.lieuxFavoris.some(l => 
            l.getNom() === lieu.getNom() 
            && l.getPays() === lieu.getPays() 
            && l.getRegion() === lieu.getRegion()
        );
        if (!existeDeja) {
            this.lieuxFavoris.push(lieu);
        } else {
            throw new Error("Le lieu est déjà dans la liste des favoris.");
        }
    }

    public supprimerLieu(nom: string): void {
        const index = this.lieuxFavoris.findIndex((lieu) => lieu.getNom() === nom);

        if (index !== -1) {
            this.lieuxFavoris.splice(index, 1);
        }
    }

    public getLieux(): Lieu[] {
        return this.lieuxFavoris;
    }

    public getFirstLieux(): string {
        return this.lieuxFavoris[0].getNom();
    }

    public getNbLieux(): Number {
        return this.lieuxFavoris.length;
    }
}

export default LieuxFavorisBuilder;