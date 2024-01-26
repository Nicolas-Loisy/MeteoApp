import SystemeMesureEnum from "../../enum/SystemeMesureEnum";
import UniteTailleEnum from "../../enum/unite/UniteTailleEnum";
import aUnite from "./aUnite";

class dtUnitePrecipitation extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesureEnum) {
    super(valeur, UniteTailleEnum["mm/h"]);
    this.valeur = valeur;
  }
}

export default dtUnitePrecipitation;