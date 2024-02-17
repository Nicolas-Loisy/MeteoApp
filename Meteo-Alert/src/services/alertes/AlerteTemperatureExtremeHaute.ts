import EvenementEnum from "../../models/enum/EvenementEnum";
import SystemeMesureEnum from "../../models/enum/SystemeMesureEnum";
import ErreurAlerte from "../../models/enum/erreurs/ErreurAlerte";
import UniteTempEnum from "../../models/enum/unite/UniteTempEnum";
import critereUniqueType from "../../models/types/critereUniqueType";
import operateurComparaisonType from "../../models/types/operateurComparaisonType";
import Meteo from "../../models/valueObject/Meteo";
import aAlerte from "./aAlerte";

class AlerteTemperatureExtremeHaute extends aAlerte {
  protected criteres: {
    tempMax: critereUniqueType,
    tempMin: critereUniqueType,
    temperature: critereUniqueType,
    ressenti: critereUniqueType,
  };

  public constructor(systemeMesure: SystemeMesureEnum) {
    super(EvenementEnum.TEMPERATURE_EXTREME_HAUTE);
    this.criteres = {
      tempMax: {
        valeur: 30,
        operateurComparaison: '>',
        uniteMesure: UniteTempEnum[systemeMesure],
      },
      tempMin: {
        valeur: 30,
        operateurComparaison: '>',
        uniteMesure: UniteTempEnum[systemeMesure],
      },
      temperature: {
        valeur: 30,
        operateurComparaison: '>',
        uniteMesure: UniteTempEnum[systemeMesure],
      },
      ressenti: {
        valeur: 30,
        operateurComparaison: '>',
        uniteMesure: UniteTempEnum[systemeMesure],
      },
    };
  }

  public checkEvenement(mesureMeteo: Meteo): boolean {
    if (!Object.keys(this.criteres).every(key => key in mesureMeteo)) {
      throw ErreurAlerte.ATTRIBUT_METEO_MANQUANT;
    }

    return (
      mesureMeteo.tempMax.getValeur() > this.criteres.tempMax.valeur || 
      mesureMeteo.tempMin.getValeur() > this.criteres.tempMin.valeur || 
      mesureMeteo.temperature.getValeur() > this.criteres.temperature.valeur ||
      mesureMeteo.ressenti.getValeur() > this.criteres.ressenti.valeur
    );
  }
}

export default AlerteTemperatureExtremeHaute;
