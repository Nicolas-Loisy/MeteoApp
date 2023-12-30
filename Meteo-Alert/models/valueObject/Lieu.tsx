import MeteoBuilder from "../builder/MeteoBuilder";
import UniteCoordonnee from "../datatype/UniteCoordonnee";
import Meteo from "./Meteo";

class Lieu {
  // private alertes: List<ReglageAlerte> = [];
  private readonly nom: string;
  private readonly pays: string;
  private readonly region: string;
  private readonly longitude: UniteCoordonnee;
  private readonly latitude: UniteCoordonnee;
  private meteo: Meteo | null;

  constructor(
    nom: string,
    pays: string,
    region: string,
    longitude: UniteCoordonnee,
    latitude: UniteCoordonnee
  ) {
    this.nom = nom;
    this.pays = pays;
    this.region = region;
    this.longitude = longitude;
    this.latitude = latitude;
    this.meteo = null;
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

  getLongitude(): UniteCoordonnee {
    return this.longitude;
  }

  getLatitude(): UniteCoordonnee {
    return this.latitude;
  }

  async updateMeteo() {
    const meteoBuilder = MeteoBuilder.getInstance();
    this.meteo = await meteoBuilder.getMeteo(this.longitude, this.latitude);
  }

  async getMeteo(): Promise<Meteo> {
    await this.updateMeteo();
    if (!this.meteo) {
      throw new Error("Meteo data is not available yet");
    }
    return this.meteo;
  }
}

export default Lieu;