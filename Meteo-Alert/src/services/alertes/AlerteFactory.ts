import dtUnitePrecipitation from "../../models/datatype/unite/dtUnitePrecipitation";
import critereType from "../../models/types/critereType";
import AlertePrecipitation, { criterePrecipitationKeys } from "./AlertePrecipitation";
import iAlerte from "./iAlerte";

const DEFAULT_VALUE_PRECIPITATION: critereType<criterePrecipitationKeys> = {
  pluie: new dtUnitePrecipitation(10),
  neige: new dtUnitePrecipitation(10),
}

class AlerteFactory {
  private constructor() {}

  public static initAlertes(): iAlerte[] {
    const alertes: iAlerte[] = [];

    alertes.push(new AlertePrecipitation(DEFAULT_VALUE_PRECIPITATION));

    return alertes;
  }
}

export default AlerteFactory;