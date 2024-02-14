import EvenementEnum from "../../models/enum/EvenementEnum";
import ErreurAlerte from "../../models/enum/erreurs/ErreurAlerte";
import UniteTailleEnum from "../../models/enum/unite/UniteTailleEnum";
import critereUniqueType from "../../models/types/critereUniqueType";
import operateurComparaisonType from "../../models/types/operateurComparaisonType";
import Meteo from "../../models/valueObject/Meteo";
import aAlerte from "./aAlerte";

class AlertePrecipitation extends aAlerte {
  protected criteres: {
    pluie: critereUniqueType
    neige: critereUniqueType
  };

  public constructor() {
    super(EvenementEnum.PRECIPITATION);
    this.criteres = {
      pluie: {
        valeur: 10,
        operateurComparaison: '>',
        uniteMesure: UniteTailleEnum["mm/h"],
      },
      neige: {
        valeur: 10,
        operateurComparaison: '>',
        uniteMesure: UniteTailleEnum["mm/h"],
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
