import SystemeMesure from "../enum/SystemeMesureEnum";
import UniteMesureTaille from "../enum/UniteTailleEnum";
import aUnite from "../abstract/aUnite";

class dtUnitePrecipitation extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesure) {
    super(valeur, "mm/h" as UniteMesureTaille);
    this.valeur = valeur;
  }
}

export default dtUnitePrecipitation;