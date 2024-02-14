import EvenementEnum from "../../models/enum/EvenementEnum";
import ErreurAlerte from "../../models/enum/erreurs/ErreurAlerte";
import operateurComparaisonType from "../../models/types/operateurComparaisonType";
import Meteo from "../../models/valueObject/Meteo";
import aAlerte from "./aAlerte";

class AlertePrecipitation extends aAlerte {
  protected criteres: {
    pluie: {
      valeur: number,
      operateurComparaison: operateurComparaisonType
    },
    neige: {
      valeur: number,
      operateurComparaison: operateurComparaisonType
    },
  };

  public constructor() {
    super(EvenementEnum.PRECIPITATION);
    this.criteres = {
      pluie: {
        valeur: 10,
        operateurComparaison: '>'
      },
      neige: {
        valeur: 10,
        operateurComparaison: '>'
      }
    };
  }

  public checkEvenement(mesureMeteo: Meteo): boolean {
    if (!Object.keys(this.criteres).every(key => key in mesureMeteo)) {
      throw ErreurAlerte.ATTRIBUT_METEO_MANQUANT;
    }

    return (
      mesureMeteo.neige.getValeur() > this.criteres.neige.valeur || 
      mesureMeteo.pluie.getValeur() > this.criteres.pluie.valeur
    );
  }
}

export default AlertePrecipitation;
