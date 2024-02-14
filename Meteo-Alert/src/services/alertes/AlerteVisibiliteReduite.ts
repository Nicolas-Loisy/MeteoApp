import EvenementEnum from "../../models/enum/EvenementEnum";
import ErreurAlerte from "../../models/enum/erreurs/ErreurAlerte";
import operateurComparaisonType from "../../models/types/operateurComparaisonType";
import Meteo from "../../models/valueObject/Meteo";
import aAlerte from "./aAlerte";

class AlerteVisibiliteReduite extends aAlerte {
  protected criteres: {
    visibilite: {
      valeur: number,
      operateurComparaison: operateurComparaisonType
    },
  };

  public constructor() {
    super(EvenementEnum.VISIBILITE_REDUITE);
    this.criteres = {
      visibilite: {
        valeur: 10,
        operateurComparaison: '>'
      },
    };
  }

  public checkEvenement(mesureMeteo: Meteo): boolean {
    if (!Object.keys(this.criteres).every(key => key in mesureMeteo)) {
      throw ErreurAlerte.ATTRIBUT_METEO_MANQUANT;
    }

    return (
      mesureMeteo.visibilite.getValeur() > this.criteres.visibilite.valeur
    );
  }
}

export default AlerteVisibiliteReduite;
