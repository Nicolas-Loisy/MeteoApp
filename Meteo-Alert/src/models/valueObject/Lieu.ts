import iAlerte from "../../services/alertes/iAlerte";
import MeteoBuilder from "../builder/MeteoBuilder";
import dtUniteCoordonnee from "../datatype/unite/dtUniteCoordonnee";
import EvenementEnum from "../enum/EvenementEnum";
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
  private reglageAlerte: ReadonlyArray<Readonly<iAlerte>>;

  constructor(data: lieuType) {
    this.key = data.key;
    this.nom = data.nom;
    this.pays = data.pays;
    this.region = data.region;
    this.longitude = new dtUniteCoordonnee(data.lon);
    this.latitude = new dtUniteCoordonnee(data.lat);
    this.meteo = null;
    this.updateMeteo();
    this.reglageAlerte = data.reglageAlerte;
  }

  public async updateMeteo() {
    this.meteo = await MeteoBuilder.getMeteo(this.longitude, this.latitude);
  }

  public async getMeteo(actualiser: boolean = true): Promise<Meteo> {
    if (!this.meteo || actualiser) {
      this.meteo = await MeteoBuilder.getMeteo(this.longitude, this.latitude);
    }

    return this.meteo;
  }

  public getReglageAlerte(): ReadonlyArray<Readonly<iAlerte>> {
    return this.reglageAlerte.slice();
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

  public setSeuilPersonnalise(typeEvenement: EvenementEnum, critere: keyof meteoType, valeur: number): void {
    const alerte = this.reglageAlerte.find(alerte => alerte.typeEvenement === typeEvenement);
    if (!alerte) throw ErreurLieu.EVENEMENT_MANQUANT;

    alerte.setSeuilPersonnalise(critere, valeur);
  }
}

export default Lieu;