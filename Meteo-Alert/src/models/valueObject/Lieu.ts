import MeteoBuilder from "../builder/MeteoBuilder";
import dtUniteCoordonnee from "../datatype/unite/dtUniteCoordonnee";
import lieuType from "../types/lieuType";
import Meteo from "./Meteo";

class Lieu {
  // private alertes: List<ReglageAlerte> = [];
  public readonly nom: string;
  public readonly pays: string;
  public readonly region: string;
  public readonly longitude: dtUniteCoordonnee;
  public readonly latitude: dtUniteCoordonnee;
  private meteo: Meteo | null;

  constructor(
    data: lieuType
  ) {
    this.nom = data.nom;
    this.pays = data.pays;
    this.region = data.region;
    this.longitude = new dtUniteCoordonnee(data.lon);
    this.latitude = new dtUniteCoordonnee(data.lat);
    this.meteo = null;
    this.updateMeteo()
  }

  // getAlertes(): List<ReglageAlerte> {
  //   return this.alertes;
  // }

  async updateMeteo() {
    const meteoBuilder = MeteoBuilder.getInstance();
    this.meteo = await meteoBuilder.getMeteo(this.longitude, this.latitude);
  }

  async getMeteo(actualiser: boolean = true): Promise<Meteo> {
    if (actualiser) await this.updateMeteo();
    if (!this.meteo) {
      throw new Error("Meteo data is not available yet");
    }
    return this.meteo;
  }
}

export default Lieu;