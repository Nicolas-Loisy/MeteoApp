import SystemeMesureEnum from "../../enum/SystemeMesureEnum";
import UnitePressionEnum from "../../enum/unite/UnitePressionEnum";
import aUnite from "./aUnite";

class dtUnitePression extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesureEnum) {
    super(valeur, UnitePressionEnum["hPa"]);
    this.valeur = valeur;
  }
}

export default dtUnitePression;