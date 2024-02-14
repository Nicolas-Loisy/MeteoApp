import EvenementEnum from "../../models/enum/EvenementEnum";
import ErreurAlerte from "../../models/enum/erreurs/ErreurAlerte";
import operateurComparaisonType from "../../models/types/operateurComparaisonType";
import Meteo from "../../models/valueObject/Meteo";
import aAlerte from "./aAlerte";

class AlerteVentViolent extends aAlerte {
  protected criteres: {
    ventRafale: {
      valeur: number,
      operateurComparaison: operateurComparaisonType
    },
    ventVitesse: {
      valeur: number,
      operateurComparaison: operateurComparaisonType
    },
  };

  public constructor() {
    super(EvenementEnum.VENT_VIOLENT);
    this.criteres = {
      ventRafale: {
        valeur: 100,
        operateurComparaison: '>'
      },
      ventVitesse: {
        valeur: 100,
        operateurComparaison: '>'
      },
    };
  }

  public checkEvenement(mesureMeteo: Meteo): boolean {
    if (!Object.keys(this.criteres).every(key => key in mesureMeteo)) {
      throw ErreurAlerte.ATTRIBUT_METEO_MANQUANT;
    }

    return (
      mesureMeteo.ventRafale.getValeur() > this.criteres.ventRafale.valeur || 
      mesureMeteo.ventVitesse.getValeur() > this.criteres.ventVitesse.valeur
    );
  }
}

export default AlerteVentViolent;
