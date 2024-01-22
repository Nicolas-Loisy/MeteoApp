import MeteoBuilder from "../builder/MeteoBuilder";
import dtUniteCoordonnee from "../datatype/dtUniteCoordonnee";
import lieuType from "../types/lieuType";
import Meteo from "./Meteo";

class Lieu {
  // private alertes: List<ReglageAlerte> = [];
  private readonly nom: string;
  private readonly pays: string;
  private readonly region: string;
  private readonly longitude: dtUniteCoordonnee;
  private readonly latitude: dtUniteCoordonnee;
  private meteo: Meteo | null;

  constructor(
    data: lieuType
  ) {
    this.nom = data.name;
    this.pays = data.country;
    this.region = data.state;
    this.longitude = new dtUniteCoordonnee(data.lon);
    this.latitude = new dtUniteCoordonnee(data.lat);
    this.meteo = null;
    this.updateMeteo()
  }

  // getAlertes(): List<ReglageAlerte> {
  //   return this.alertes;
  // }

  getNom(): string {
    return this.nom;
  }

  getPays(): string {
    return this.pays;
  }

  getRegion(): string {
    return this.region;
  }

  getLongitude(): dtUniteCoordonnee {
    return this.longitude;
  }

  getLatitude(): dtUniteCoordonnee {
    return this.latitude;
  }

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