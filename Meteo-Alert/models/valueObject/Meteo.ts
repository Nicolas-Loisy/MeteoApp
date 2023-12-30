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
  private readonly heureActualisation: Date;
  private readonly neige: UnitePrecipitation;
  private readonly pluie: UnitePrecipitation;
  private readonly humidite: UniteHumidite;
  private readonly visibilite: UniteVisibilite;
  private readonly ressenti: UniteTemperature;
  private readonly temperature: UniteTemperature;
  private readonly tempMin: UniteTemperature;
  private readonly tempMax: UniteTemperature;
  private readonly ventRafale: UniteVentVitesse;
  private readonly ventVitesse: UniteVentVitesse;
  private readonly ventDirection: UniteVentDirection;
  private readonly pression: UnitePression;
  private readonly pressionTerre: UnitePression;
  private readonly pressionMer: UnitePression;
  private readonly nuage: UniteNuage;

  constructor(
    units: SystemeMesure,
    data: meteoData
  ) {
    this.heureActualisation = new Date();
    this.neige = new UnitePrecipitation(data.neige);
    this.pluie = new UnitePrecipitation(data.pluie);
    this.humidite = new UniteHumidite(data.humidite);
    this.visibilite = new UniteVisibilite(data.visibilite);
    this.ressenti = new UniteTemperature(units, data.ressenti);
    this.temperature = new UniteTemperature(units, data.temperature);
    this.tempMin = new UniteTemperature(units, data.tempMin);
    this.tempMax = new UniteTemperature(units, data.tempMax);
    this.ventRafale = new UniteVentVitesse(units, data.ventRafale);
    this.ventVitesse = new UniteVentVitesse(units, data.ventVitesse);
    this.ventDirection = new UniteVentDirection(data.ventDirection);
    this.pression = new UnitePression(data.pression);
    this.pressionTerre = new UnitePression(data.pressionTerre);
    this.pressionMer = new UnitePression(data.pressionMer);
    this.nuage = new UniteNuage(data.nuage);
  }

  getHeureActualisation(): Date {
    return this.heureActualisation;
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
   * Getter des valeurs avec unité sous format String
   */

  getHeureActualisationStr(): String {
    return this.heureActualisation.toString();
  }

  getNeigeStr(): String {
    return this.neige.toString();
  }

  getPluieStr(): String {
    return this.pluie.toString();
  }

  getHumiditeStr(): String {
    return this.humidite.toString();
  }

  getVisibiliteStr(): String {
    return this.visibilite.toString();
  }

  getRessentiStr(): String {
    return this.ressenti.toString();
  }

  getTemperatureStr(): String {
    return this.temperature.toString();
  }

  getTempMinStr(): String {
    return this.tempMin.toString();
  }

  getTempMaxStr(): String {
    return this.tempMax.toString();
  }

  getVentRafaleStr(): String {
    return this.ventRafale.toString();
  }

  getVentVitesseStr(): String {
    return this.ventVitesse.toString();
  }

  getVentDirectionStr(): String {
    return this.ventDirection.toString();
  }

  getPressionStr(): String {
    return this.pression.toString();
  }

  getPressionTerreStr(): String {
    return this.pressionTerre.toString();
  }

  getPressionMerStr(): String {
    return this.pressionMer.toString();
  }

  getNuageStr(): String {
    return this.nuage.toString();
  }

}

export default Meteo;