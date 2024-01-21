import SystemeMesure from "../enum/SystemeMesureEnum";
import UniteMesurePourcentage from "../enum/UnitePourcentageEnum";
import aUnite from "../abstract/aUnite";

class dtUniteNuage extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesure) {
    super(valeur, "%" as UniteMesurePourcentage);
    this.valeur = valeur;
  }
}

export default dtUniteNuage;