import EvenementEnum from "../../models/enum/EvenementEnum";
import ErreurAlerte from "../../models/enum/erreurs/ErreurAlerte";
import Meteo from "../../models/valueObject/Meteo";
import aAlerte from "./aAlerte";

class AlerteTemperatureExtremeHaute extends aAlerte {
  protected criteres: {
    tempMax: number,
    tempMin: number
    temperature: number,
    ressenti: number
  };

  public constructor() {
    super(EvenementEnum.TEMPERATURE_EXTREME_HAUTE);
    this.criteres = {
      tempMax: 30,
      tempMin: 30,
      temperature: 30,
      ressenti: 30
    };
  }

  public checkEvenement(mesureMeteo: Meteo): boolean {
    if (!Object.keys(this.criteres).every(key => key in mesureMeteo)) {
      throw ErreurAlerte.ATTRIBUT_METEO_MANQUANT;
    }

    return (
      mesureMeteo.tempMax.getValeur() > this.criteres.tempMax || 
      mesureMeteo.tempMin.getValeur() > this.criteres.tempMin || 
      mesureMeteo.temperature.getValeur() > this.criteres.temperature ||
      mesureMeteo.ressenti.getValeur() > this.criteres.ressenti
    );
  }
}

export default AlerteTemperatureExtremeHaute;
