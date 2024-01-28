import dtUnitePrecipitation from "../../models/datatype/unite/dtUnitePrecipitation";
import EvenementEnum from "../../models/enum/EvenementEnum";
import critereKeys from "../../models/types/critereKeys";
import critereType from "../../models/types/critereType";
import Meteo from "../../models/valueObject/Meteo";
import aAlerte from "./aAlerte";

export type criterePrecipitationKeys = Extract<critereKeys, "neige" | "pluie">;

class AlertePrecipitation extends aAlerte {
  criteres: critereType<criterePrecipitationKeys>;

  public constructor(precipitationCritere: critereType<criterePrecipitationKeys>) {
    super(EvenementEnum.PRECIPITATION);
    this.criteres = precipitationCritere;
  }

  public checkEvenement(mesureMeteo: Meteo): boolean {
    if (!Object.keys(this.criteres).every(key => key in mesureMeteo)) {
      throw new Error("Attributs manquants");
    }

    return (
      mesureMeteo.neige.getValeur() > this.criteres.neige!.getValeur() || 
      mesureMeteo.pluie.getValeur() > this.criteres.pluie!.getValeur()
    );
  }
}

export default AlertePrecipitation;
