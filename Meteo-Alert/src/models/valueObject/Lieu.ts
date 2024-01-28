import AlerteFactory from "../../services/alertes/AlerteFactory";
import iAlerte from "../../services/alertes/iAlerte";
import MeteoBuilder from "../builder/MeteoBuilder";
import dtUniteCoordonnee from "../datatype/unite/dtUniteCoordonnee";
import EvenementEnum from "../enum/EvenementEnum";
import lieuType from "../types/lieuType";
import { alerteType } from "../types/alerteType";
import Meteo from "./Meteo";
import critereKeys from "../types/critereKeys";

class Lieu {
  public readonly key: string; // A justifier dans le rapport (Economie lors des requêtes BDD)
  public readonly nom: string;
  public readonly pays: string;
  public readonly region: string;
  public readonly longitude: dtUniteCoordonnee;
  public readonly latitude: dtUniteCoordonnee;
  private meteo: Meteo | null;
  private reglageAlerte: iAlerte[];

  constructor(data: lieuType) {
    if (!data.key) {
      throw new Error("[ERREUR] Création du lieu impossible : l'UID est manquant");
    }

    this.key = data.key;
    this.nom = data.nom;
    this.pays = data.pays;
    this.region = data.region;
    this.longitude = new dtUniteCoordonnee(data.lon);
    this.latitude = new dtUniteCoordonnee(data.lat);
    this.meteo = null;
    this.updateMeteo();
    this.reglageAlerte = AlerteFactory.initAlertes();
  }

  public async updateMeteo() {
    this.meteo = await MeteoBuilder.getMeteo(this.longitude, this.latitude);
  }

  public async getMeteo(actualiser: boolean = true): Promise<Meteo> {
    if (actualiser) await this.updateMeteo();

    if (!this.meteo) {
      throw new Error("Meteo data is not available yet");
    }
    return this.meteo;
  }

  public getReglageAlerte(): ReadonlyArray<Readonly<iAlerte>> {
    const reglageAlerteReadOnly: Readonly<iAlerte>[] = this.reglageAlerte.map(alerte => Object.freeze(alerte));
    return reglageAlerteReadOnly as ReadonlyArray<iAlerte>;
  }

  public async setReglageAlerte(alerte: alerteType): Promise<void> {
    const alerteOld = this.reglageAlerte.find(e => e.typeEvenement === alerte.typeEvenement);

    if (!alerteOld) {
      throw new Error("[ERREUR] Echec setReglageAlerte: impossible de trouver l'alerte indiquée");
    }
    if (!Object.keys(alerteOld.criteres).every(key => key in alerte.criteres)) {
      throw new Error("[ERREUR] Echec setReglageAlerte: les attributs critères ne correspondent pas");
    }

    alerteOld.isActiver = alerte.isActiver;

    Object.entries(alerte.criteres).forEach(([cle, valeur]) => {
      alerteOld.setSeuilPersonnalise(cle as critereKeys, valeur);
    });
  }

  public checkEvenements(): Record<EvenementEnum, boolean> | null {
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