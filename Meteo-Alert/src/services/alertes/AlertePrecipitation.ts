import dtUnitePrecipitation from "../../models/datatype/unite/dtUnitePrecipitation";
import EvenementEnum from "../../models/enum/EvenementEnum";
import critereType from "../../models/types/critereType";
import Meteo from "../../models/valueObject/Meteo";
import aAlerte from "./aAlerte";

const precipitationCritere: critereType  = {
  neige: new dtUnitePrecipitation(10),
  pluie: new dtUnitePrecipitation(10)
};

class AlertePrecipitation extends aAlerte {
  public constructor() {
    super(EvenementEnum.PRECIPITATION, precipitationCritere);
  }

  public checkEvenement(mesureMeteo: Meteo): boolean {
    if (!Object.keys(precipitationCritere).every(key => key in mesureMeteo)) {
      throw new Error("Attributs manquants");
    }

    return (
      mesureMeteo.neige.getValeur() > this.criteres.neige!.getValeur() || 
      mesureMeteo.pluie.getValeur() > this.criteres.pluie!.getValeur()
    );
  }
}

export default AlertePrecipitation;
