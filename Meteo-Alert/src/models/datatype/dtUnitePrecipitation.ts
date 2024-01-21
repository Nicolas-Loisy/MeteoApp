import SystemeMesureEnum from "../enum/SystemeMesureEnum";
import UniteTailleEnum from "../enum/UniteTailleEnum";
import aUnite from "../abstract/aUnite";

class dtUnitePrecipitation extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesureEnum) {
    super(valeur, "mm/h" as UniteTailleEnum);
    this.valeur = valeur;
  }
}

export default dtUnitePrecipitation;