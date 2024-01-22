import dtUniteHumidite from "../datatype/dtUniteHumidite";
import dtUniteNuage from "../datatype/dtUniteNuage";
import dtUnitePrecipitation from "../datatype/dtUnitePrecipitation";
import dtUnitePression from "../datatype/dtUnitePression";
import dtUniteTemperature from "../datatype/dtUniteTemperature";
import dtUniteVentDirection from "../datatype/dtUniteVentDirection";
import dtUniteVentVitesse from "../datatype/dtUniteVentVitesse";
import dtUniteVisibilite from "../datatype/dtUniteVisibilite";
import SystemeMesureEnum from "../enum/SystemeMesureEnum";
import meteoType from "../types/meteoType";

class Meteo {
  public readonly heureActualisation: Date;
  public readonly neige: dtUnitePrecipitation;
  public readonly pluie: dtUnitePrecipitation;
  public readonly humidite: dtUniteHumidite;
  public readonly visibilite: dtUniteVisibilite;
  public readonly ressenti: dtUniteTemperature;
  public readonly temperature: dtUniteTemperature;
  public readonly tempMin: dtUniteTemperature;
  public readonly tempMax: dtUniteTemperature;
  public readonly ventRafale: dtUniteVentVitesse;
  public readonly ventVitesse: dtUniteVentVitesse;
  public readonly ventDirection: dtUniteVentDirection;
  public readonly pression: dtUnitePression;
  public readonly pressionTerre: dtUnitePression;
  public readonly pressionMer: dtUnitePression;
  public readonly nuage: dtUniteNuage;

  constructor(
    units: SystemeMesureEnum,
    data: meteoType
  ) {
    this.heureActualisation = new Date();
    this.neige = new dtUnitePrecipitation(data.neige);
    this.pluie = new dtUnitePrecipitation(data.pluie);
    this.humidite = new dtUniteHumidite(data.humidite);
    this.visibilite = new dtUniteVisibilite(data.visibilite);
    this.ressenti = new dtUniteTemperature(data.ressenti, units);
    this.temperature = new dtUniteTemperature(data.temperature, units);
    this.tempMin = new dtUniteTemperature(data.tempMin, units);
    this.tempMax = new dtUniteTemperature(data.tempMax, units);
    this.ventRafale = new dtUniteVentVitesse(data.ventRafale, units);
    this.ventVitesse = new dtUniteVentVitesse(data.ventVitesse, units);
    this.ventDirection = new dtUniteVentDirection(data.ventDirection);
    this.pression = new dtUnitePression(data.pression);
    this.pressionTerre = new dtUnitePression(data.pressionTerre);
    this.pressionMer = new dtUnitePression(data.pressionMer);
    this.nuage = new dtUniteNuage(data.nuage);
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