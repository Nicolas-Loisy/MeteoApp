import AlerteFactory from "../../services/alertes/AlerteFactory";
import iAlerte from "../../services/alertes/iAlerte";
import MeteoBuilder from "../builder/MeteoBuilder";
import dtUniteCoordonnee from "../datatype/unite/dtUniteCoordonnee";
import EvenementEnum from "../enum/EvenementEnum";
import lieuType from "../types/lieuType";
import Meteo from "./Meteo";

class Lieu {
  public readonly UID: string; // A justifier dans le rapport (Economie lors des requêtes BDD)
  public readonly nom: string;
  public readonly pays: string;
  public readonly region: string;
  public readonly longitude: dtUniteCoordonnee;
  public readonly latitude: dtUniteCoordonnee;
  private meteo: Meteo | null;
  private reglageAlerte: iAlerte[];

  constructor(data: lieuType) {
    if (!data.UID) {
      throw new Error("[ERREUR] Création du lieu impossible : l'UID est manquant");
    }
    
    this.UID = data.UID;
    this.nom = data.nom;
    this.pays = data.pays;
    this.region = data.region;
    this.longitude = new dtUniteCoordonnee(data.lon);
    this.latitude = new dtUniteCoordonnee(data.lat);
    this.meteo = null;
    this.updateMeteo();
    this.reglageAlerte = AlerteFactory.initAlertes();
  }

  async updateMeteo() {
    this.meteo = await MeteoBuilder.getMeteo(this.longitude, this.latitude);
  }

  async getMeteo(actualiser: boolean = true): Promise<Meteo> {
    if (actualiser) await this.updateMeteo();
    if (!this.meteo) {
      throw new Error("Meteo data is not available yet");
    }
    return this.meteo;
  }

  public checkEvenements(): Record<EvenementEnum, boolean> | null{
    if (this.meteo) {
      const resultatsEvenements: Record<EvenementEnum, boolean> = this.reglageAlerte.reduce((acc, alerte) => {
        acc[alerte.typeEvenement] = alerte.checkEvenement(this.meteo!);
        
        return acc;
      }, {} as Record<EvenementEnum, boolean>);
    
      return resultatsEvenements;
    }

    return null;
  }
}

export default Lieu;