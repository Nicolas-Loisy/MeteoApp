import SystemeMesureEnum from "../enum/SystemeMesureEnum";
import UnitePourcentageEnum from "../enum/UnitePourcentageEnum";
import aUnite from "../abstract/aUnite";

class dtUniteNuage extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesureEnum) {
    super(valeur, "%" as UnitePourcentageEnum);
    this.valeur = valeur;
  }
}

export default dtUniteNuage;