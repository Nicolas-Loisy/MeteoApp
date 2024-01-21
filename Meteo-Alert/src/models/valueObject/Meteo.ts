import UniteHumidite from "../datatype/UniteHumidite";
import UniteNuage from "../datatype/UniteNuage";
import UnitePrecipitation from "../datatype/UnitePrecipitation";
import UnitePression from "../datatype/UnitePression";
import UniteTemperature from "../datatype/UniteTemperature";
import UniteVentDirection from "../datatype/UniteVentDirection";
import UniteVentVitesse from "../datatype/UniteVentVitesse";
import UniteVisibilite from "../datatype/UniteVisibilite";
import SystemeMesure from "../enum/SystemeMesure";
import meteoData from "../types/meteoData";

class Meteo {
  public readonly heureActualisation: Date;
  public readonly neige: UnitePrecipitation;
  public readonly pluie: UnitePrecipitation;
  public readonly humidite: UniteHumidite;
  public readonly visibilite: UniteVisibilite;
  public readonly ressenti: UniteTemperature;
  public readonly temperature: UniteTemperature;
  public readonly tempMin: UniteTemperature;
  public readonly tempMax: UniteTemperature;
  public readonly ventRafale: UniteVentVitesse;
  public readonly ventVitesse: UniteVentVitesse;
  public readonly ventDirection: UniteVentDirection;
  public readonly pression: UnitePression;
  public readonly pressionTerre: UnitePression;
  public readonly pressionMer: UnitePression;
  public readonly nuage: UniteNuage;

  constructor(
    units: SystemeMesure,
    data: meteoData
  ) {
    this.heureActualisation = new Date();
    this.neige = new UnitePrecipitation(data.neige);
    this.pluie = new UnitePrecipitation(data.pluie);
    this.humidite = new UniteHumidite(data.humidite);
    this.visibilite = new UniteVisibilite(data.visibilite);
    this.ressenti = new UniteTemperature(data.ressenti, units);
    this.temperature = new UniteTemperature(data.temperature, units);
    this.tempMin = new UniteTemperature(data.tempMin, units);
    this.tempMax = new UniteTemperature(data.tempMax, units);
    this.ventRafale = new UniteVentVitesse(data.ventRafale, units);
    this.ventVitesse = new UniteVentVitesse(data.ventVitesse, units);
    this.ventDirection = new UniteVentDirection(data.ventDirection);
    this.pression = new UnitePression(data.pression);
    this.pressionTerre = new UnitePression(data.pressionTerre);
    this.pressionMer = new UnitePression(data.pressionMer);
    this.nuage = new UniteNuage(data.nuage);
  }

  getHeureActualisation(): Date {
    return this.heureActualisation;
  }

  public isDaytime(): boolean {
    const hours = this.heureActualisation.getHours();
    return hours >= 6 && hours < 18;
  }

  /**
   * Getter des valeurs numérique
   */

  getNeige(): number {
    return this.neige.getValeur();
  }

  getPluie(): number {
    return this.pluie.getValeur();
  }

  getHumidite(): number {
    return this.humidite.getValeur();
  }

  getVisibilite(): number {
    return this.visibilite.getValeur();
  }

  getRessenti(): number {
    return this.ressenti.getValeur();
  }

  getTemperature(): number {
    return this.temperature.getValeur();
  }

  getTempMin(): number {
    return this.tempMin.getValeur();
  }

  getTempMax(): number {
    return this.tempMax.getValeur();
  }

  getVentRafale(): number {
    return this.ventRafale.getValeur();
  }

  getVentVitesse(): number {
    return this.ventVitesse.getValeur();
  }

  getVentDirection(): number {
    return this.ventDirection.getValeur();
  }

  getPression(): number {
    return this.pression.getValeur();
  }

  getPressionTerre(): number {
    return this.pressionTerre.getValeur();
  }

  getPressionMer(): number {
    return this.pressionMer.getValeur();
  }

  getNuage(): number {
    return this.nuage.getValeur();
  }

  /**
   * Getter des valeurs avec unité sous format string
   */

  getHeureActualisationStr(): string {
    return this.heureActualisation.toString();
  }

  getNeigeStr(): string {
    return this.neige.toString();
  }

  getPluieStr(): string {
    return this.pluie.toString();
  }

  getHumiditeStr(): string {
    return this.humidite.toString();
  }

  getVisibiliteStr(): string {
    return this.visibilite.toString();
  }

  getRessentiStr(): string {
    return this.ressenti.toString();
  }

  getTemperatureStr(): string {
    return this.temperature.toString();
  }

  getTempMinStr(): string {
    return this.tempMin.toString();
  }

  getTempMaxStr(): string {
    return this.tempMax.toString();
  }

  getVentRafaleStr(): string {
    return this.ventRafale.toString();
  }

  getVentVitesseStr(): string {
    return this.ventVitesse.toString();
  }

  getVentDirectionStr(): string {
    return this.ventDirection.toString();
  }

  getPressionStr(): string {
    return this.pression.toString();
  }

  getPressionTerreStr(): string {
    return this.pressionTerre.toString();
  }

  getPressionMerStr(): string {
    return this.pressionMer.toString();
  }

  getNuageStr(): string {
    return this.nuage.toString();
  }

}

export default Meteo;