import EvenementEnum from "../../models/enum/EvenementEnum";
import ErreurAlerte from "../../models/enum/erreurs/ErreurAlerte";
import Meteo from "../../models/valueObject/Meteo";
import aAlerte from "./aAlerte";

class AlertePrecipitation extends aAlerte {
  protected criteres: {
    pluie: number,
    neige: number
  };

  public constructor() {
    super(EvenementEnum.PRECIPITATION);
    this.criteres = {
      pluie: 10,
      neige: 10
    };
  }

  public checkEvenement(mesureMeteo: Meteo): boolean {
    if (!Object.keys(this.criteres).every(key => key in mesureMeteo)) {
      throw ErreurAlerte.ATTRIBUT_METEO_MANQUANT;
    }

    return (
      mesureMeteo.neige.getValeur() > this.criteres.neige || 
      mesureMeteo.pluie.getValeur() > this.criteres.pluie
    );
  }
}

export default AlertePrecipitation;
