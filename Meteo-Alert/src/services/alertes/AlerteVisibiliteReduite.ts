import EvenementEnum from "../../models/enum/EvenementEnum";
import SystemeMesureEnum from "../../models/enum/SystemeMesureEnum";
import ErreurAlerte from "../../models/enum/erreurs/ErreurAlerte";
import UniteVitesseEnum from "../../models/enum/unite/UniteVitesseEnum";
import critereUniqueType from "../../models/types/critereUniqueType";
import Meteo from "../../models/valueObject/Meteo";
import aAlerte from "./aAlerte";

class AlerteVisibiliteReduite extends aAlerte {
  protected criteres: {
    visibilite: critereUniqueType
  };

  public constructor(systemMesure: SystemeMesureEnum) {
    super(EvenementEnum.VISIBILITE_REDUITE);
    this.criteres = {
      visibilite: {
        valeur: 10,
        operateurComparaison: '>',
        uniteMesure: UniteVitesseEnum[systemMesure],
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
