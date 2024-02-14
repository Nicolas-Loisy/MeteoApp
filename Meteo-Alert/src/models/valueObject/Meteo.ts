import dtUniteHumidite from "../datatype/unite/dtUniteHumidite";
import dtUniteNuage from "../datatype/unite/dtUniteNuage";
import dtUnitePrecipitation from "../datatype/unite/dtUnitePrecipitation";
import dtUnitePression from "../datatype/unite/dtUnitePression";
import dtUniteTemperature from "../datatype/unite/dtUniteTemperature";
import dtUniteVentDirection from "../datatype/unite/dtUniteVentDirection";
import dtUniteVentVitesse from "../datatype/unite/dtUniteVentVitesse";
import dtUniteVisibilite from "../datatype/unite/dtUniteVisibilite";
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
    systemeMesure: SystemeMesureEnum,
    data: meteoType
  ) {
    this.heureActualisation = new Date();
    this.neige = new dtUnitePrecipitation(data.neige);
    this.pluie = new dtUnitePrecipitation(data.pluie);
    this.humidite = new dtUniteHumidite(data.humidite);
    this.visibilite = new dtUniteVisibilite(data.visibilite);
    this.ressenti = new dtUniteTemperature(data.ressenti, systemeMesure);
    this.temperature = new dtUniteTemperature(data.temperature, systemeMesure);
    this.tempMin = new dtUniteTemperature(data.tempMin, systemeMesure);
    this.tempMax = new dtUniteTemperature(data.tempMax, systemeMesure);
    this.ventRafale = new dtUniteVentVitesse(data.ventRafale, systemeMesure);
    this.ventVitesse = new dtUniteVentVitesse(data.ventVitesse, systemeMesure);
    this.ventDirection = new dtUniteVentDirection(data.ventDirection);
    this.pression = new dtUnitePression(data.pression);
    this.pressionTerre = new dtUnitePression(data.pressionTerre);
    this.pressionMer = new dtUnitePression(data.pressionMer);
    this.nuage = new dtUniteNuage(data.nuage);
  }

  public getHeureActualisation(): Date {
    return this.heureActualisation;
  }

  public isDaytime(): boolean {
    const hours = this.heureActualisation.getHours();
    return hours >= 6 && hours < 18;
  }
}

export default Meteo;