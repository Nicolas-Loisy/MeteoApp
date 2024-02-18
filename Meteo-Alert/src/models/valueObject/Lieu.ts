import iAlerte from "../../services/alertes/iAlerte";
import MeteoBuilder from "../builder/MeteoBuilder";
import dtUniteCoordonnee from "../datatype/unite/dtUniteCoordonnee";
import EvenementEnum from "../enum/EvenementEnum";
import SystemeMesureEnum from "../enum/SystemeMesureEnum";
import ErreurLieu from "../enum/erreurs/ErreurLieu";
import lieuType from "../types/lieuType";
import meteoType from "../types/meteoType";
import Meteo from "./Meteo";

class Lieu {
  public readonly key: string;
  public readonly nom: string;
  public readonly pays: string;
  public readonly region: string;
  public readonly longitude: dtUniteCoordonnee;
  public readonly latitude: dtUniteCoordonnee;
  private meteo: Meteo | null;
  private reglageAlerte: ReadonlyArray<Readonly<iAlerte>> | null;

  constructor(data: lieuType) {
    this.key = data.key;
    this.nom = data.nom;
    this.pays = data.pays;
    this.region = data.region;
    this.longitude = new dtUniteCoordonnee(data.lon);
    this.latitude = new dtUniteCoordonnee(data.lat);
    this.meteo = null;
    this.reglageAlerte = null;
  }

  public async updateMeteo(systemeMesure: SystemeMesureEnum) {
    this.meteo = await MeteoBuilder.getMeteo(this.longitude, this.latitude, systemeMesure);
  }

  public async getMeteo(systemeMesure: SystemeMesureEnum, actualiser: boolean = true): Promise<Meteo> {
    if (!this.meteo || actualiser) {
      this.meteo = await MeteoBuilder.getMeteo(this.longitude, this.latitude, systemeMesure);
    }

    return this.meteo;
  }

  public getReglageAlerte(): ReadonlyArray<Readonly<iAlerte>> {
    if (!this.reglageAlerte) throw new Error("Reglage alerte non initialisée");

    return this.reglageAlerte.slice();
  }

  public checkEvenements(): Record<EvenementEnum, boolean> | null {
    if (!this.reglageAlerte) throw new Error("Reglage alerte non initialisée");

    if (this.meteo) {
      const resultatsEvenements: Record<EvenementEnum, boolean> = this.reglageAlerte.reduce((acc, alerte) => {
        acc[alerte.typeEvenement] = alerte.checkEvenement(this.meteo!);

        return acc;
      }, {} as Record<EvenementEnum, boolean>);

      return resultatsEvenements;
    }

    return null;
  }

  public initReglageAlerte(reglageAlerte: ReadonlyArray<Readonly<iAlerte>>): void {
    this.reglageAlerte = reglageAlerte;
  }

  public setSeuilPersonnalise(typeEvenement: EvenementEnum, critere: keyof meteoType, valeur: number): void {
    if (!this.reglageAlerte) throw new Error("Reglage alerte non initialisée");

    const alerte = this.reglageAlerte.find(alerte => alerte.typeEvenement === typeEvenement);
    if (!alerte) throw ErreurLieu.EVENEMENT_MANQUANT;

    alerte.setSeuilPersonnalise(critere, valeur);
  }

  public setActiverAlerte(typeEvenement: EvenementEnum, bool: boolean): void {
    if (!this.reglageAlerte) throw new Error("Reglage alerte non initialisée");

    const alerte = this.reglageAlerte.find(alerte => alerte.typeEvenement === typeEvenement);
    if (!alerte) throw ErreurLieu.EVENEMENT_MANQUANT;

    alerte.setActiver(bool);
  }
}

export default Lieu;