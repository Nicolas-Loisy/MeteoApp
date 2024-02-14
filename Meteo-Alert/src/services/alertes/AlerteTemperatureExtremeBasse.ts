import EvenementEnum from "../../models/enum/EvenementEnum";
import ErreurAlerte from "../../models/enum/erreurs/ErreurAlerte";
import operateurComparaisonType from "../../models/types/operateurComparaisonType";
import Meteo from "../../models/valueObject/Meteo";
import aAlerte from "./aAlerte";

class AlerteTemperatureExtremeBasse extends aAlerte {
  protected criteres: {
    tempMax: {
      valeur: number,
      operateurComparaison: operateurComparaisonType
    },
    tempMin: {
      valeur: number,
      operateurComparaison: operateurComparaisonType
    },
    temperature: {
      valeur: number,
      operateurComparaison: operateurComparaisonType
    },
    ressenti: {
      valeur: number,
      operateurComparaison: operateurComparaisonType
    },
  };

  public constructor() {
    super(EvenementEnum.TEMPERATURE_EXTREME_BASSE);
    this.criteres = {
      tempMax: {
        valeur: 0,
        operateurComparaison: '<'
      },
      tempMin: {
        valeur: 0,
        operateurComparaison: '<'
      },
      temperature: {
        valeur: 0,
        operateurComparaison: '<'
      },
      ressenti: {
        valeur: 0,
        operateurComparaison: '<'
      },
    };
  }

  public checkEvenement(mesureMeteo: Meteo): boolean {
    if (!Object.keys(this.criteres).every(key => key in mesureMeteo)) {
      throw ErreurAlerte.ATTRIBUT_METEO_MANQUANT;
    }

    return (
      mesureMeteo.tempMax.getValeur() < this.criteres.tempMax.valeur || 
      mesureMeteo.tempMin.getValeur() < this.criteres.tempMin.valeur || 
      mesureMeteo.temperature.getValeur() < this.criteres.temperature.valeur ||
      mesureMeteo.ressenti.getValeur() < this.criteres.ressenti.valeur
    );
  }
}

export default AlerteTemperatureExtremeBasse;
