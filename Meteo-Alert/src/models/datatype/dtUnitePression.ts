import SystemeMesure from "../enum/SystemeMesureEnum";
import UniteMesurePression from "../enum/UnitePressionEnum";
import aUnite from "../abstract/aUnite";

class dtUnitePression extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesure) {
    super(valeur, "hPa" as UniteMesurePression);
    this.valeur = valeur;
  }
}

export default dtUnitePression;