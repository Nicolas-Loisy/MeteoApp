import SystemeMesureEnum from "../enum/SystemeMesureEnum";
import UnitePressionEnum from "../enum/UnitePressionEnum";
import aUnite from "../abstract/aUnite";

class dtUnitePression extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesureEnum) {
    super(valeur, "hPa" as UnitePressionEnum);
    this.valeur = valeur;
  }
}

export default dtUnitePression;