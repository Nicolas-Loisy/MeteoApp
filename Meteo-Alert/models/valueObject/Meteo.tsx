import UniteHumidite from "../datatype/UniteHumidite";
import UniteNuage from "../datatype/UniteNuage";
import UnitePrecipitation from "../datatype/UnitePrecipitation";
import UnitePression from "../datatype/UnitePression";
import UniteTemperature from "../datatype/UniteTemperature";
import UniteVentDirection from "../datatype/UniteVentDirection";
import UniteVentVitesse from "../datatype/UniteVentVitesse";
import UniteVisibilite from "../datatype/UniteVisibilite";
import SystemeMesure from "../enum/SystemeMesure";

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
      neige: number,
      pluie: number,
      humidite: number,
      visibilite: number,
      ressenti: number,
      temperature: number,
      tempMin: number,
      tempMax: number,
      ventRafale: number,
      ventVitesse: number,
      ventDirection: number,
      pression: number,
      pressionTerre: number,
      pressionMer: number,
      nuage: number
    ) {
      this.heureActualisation = new Date();
      this.neige = new UnitePrecipitation(neige);
      this.pluie = new UnitePrecipitation(pluie);
      this.humidite = new UniteHumidite(humidite);
      this.visibilite = new UniteVisibilite(visibilite);
      this.ressenti = new UniteTemperature(units, ressenti);
      this.temperature = new UniteTemperature(units, temperature);
      this.tempMin = new UniteTemperature(units, tempMin);
      this.tempMax = new UniteTemperature(units, tempMax);
      this.ventRafale = new UniteVentVitesse(units, ventRafale);
      this.ventVitesse = new UniteVentVitesse(units, ventVitesse);
      this.ventDirection = new UniteVentDirection(ventDirection);
      this.pression = new UnitePression(pression);
      this.pressionTerre = new UnitePression(pressionTerre);
      this.pressionMer = new UnitePression(pressionMer);
      this.nuage = new UniteNuage(nuage);
    }
    
    getHeureActualisation(): Date {
      return this.heureActualisation;
    }
    
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
}

export default Meteo;