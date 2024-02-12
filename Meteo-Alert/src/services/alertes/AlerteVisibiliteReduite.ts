import EvenementEnum from "../../models/enum/EvenementEnum";
import ErreurAlerte from "../../models/enum/erreurs/ErreurAlerte";
import Meteo from "../../models/valueObject/Meteo";
import aAlerte from "./aAlerte";

class AlerteVisibiliteReduite extends aAlerte {
  protected criteres: {
    visibilite: number
  };

  public constructor() {
    super(EvenementEnum.VISIBILITE_REDUITE);
    this.criteres = {
      visibilite: 10
    };
  }

  public checkEvenement(mesureMeteo: Meteo): boolean {
    if (!Object.keys(this.criteres).every(key => key in mesureMeteo)) {
      throw ErreurAlerte.ATTRIBUT_METEO_MANQUANT;
    }

    return (
      mesureMeteo.visibilite.getValeur() > this.criteres.visibilite
    );
  }
}

export default AlerteVisibiliteReduite;
