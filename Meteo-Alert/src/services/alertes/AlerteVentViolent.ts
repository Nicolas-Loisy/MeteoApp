import EvenementEnum from "../../models/enum/EvenementEnum";
import SystemeMesureEnum from "../../models/enum/SystemeMesureEnum";
import ErreurAlerte from "../../models/enum/erreurs/ErreurAlerte";
import UniteVitesseEnum from "../../models/enum/unite/UniteVitesseEnum";
import critereUniqueType from "../../models/types/critereUniqueType";
import operateurComparaisonType from "../../models/types/operateurComparaisonType";
import Meteo from "../../models/valueObject/Meteo";
import aAlerte from "./aAlerte";

class AlerteVentViolent extends aAlerte {
  protected criteres: {
    ventRafale: critereUniqueType,
    ventVitesse: critereUniqueType,
  };

  public constructor(systemeMesure: SystemeMesureEnum) {
    super(EvenementEnum.VENT_VIOLENT);
    this.criteres = {
      ventRafale: {
        valeur: 100,
        operateurComparaison: '>',
        uniteMesure: UniteVitesseEnum[systemeMesure],
      },
      ventVitesse: {
        valeur: 100,
        operateurComparaison: '>',
        uniteMesure: UniteVitesseEnum[systemeMesure],
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
