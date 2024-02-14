import ReglageApp from "../../ReglageApp";
import SystemeMesureEnum from "../../enum/SystemeMesureEnum";

type utilisateurFront = {
  readonly GUID: string;
  readonly prenom: string;
  readonly mail: string;
  readonly reglageApp: {
    readonly langue: string,
    readonly systemeMesure: SystemeMesureEnum,
  }
}

export default utilisateurFront;