import EvenementEnum from "../../models/enum/EvenementEnum";
import ErreurAlerte from "../../models/enum/erreurs/ErreurAlerte";
import Meteo from "../../models/valueObject/Meteo";
import aAlerte from "./aAlerte";

class AlerteVentViolent extends aAlerte {
  protected criteres: {
    ventRafale: number,
    ventVitesse: number
  };

  public constructor() {
    super(EvenementEnum.VENT_VIOLENT);
    this.criteres = {
      ventRafale: 100,
      ventVitesse: 100
    };
  }

  public checkEvenement(mesureMeteo: Meteo): boolean {
    if (!Object.keys(this.criteres).every(key => key in mesureMeteo)) {
      throw ErreurAlerte.ATTRIBUT_METEO_MANQUANT;
    }

    return (
      mesureMeteo.ventRafale.getValeur() > this.criteres.ventRafale || 
      mesureMeteo.ventVitesse.getValeur() > this.criteres.ventVitesse
    );
  }
}

export default AlerteVentViolent;
