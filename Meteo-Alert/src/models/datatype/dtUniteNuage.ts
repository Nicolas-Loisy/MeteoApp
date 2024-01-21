import SystemeMesure from "../enum/SystemeMesure";
import UniteMesurePourcentage from "../enum/UniteMesurePourcentage";
import aUnite from "../abstract/aUnite";

class dtUniteNuage extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesure) {
    super(valeur, "%" as UniteMesurePourcentage);
    this.valeur = valeur;
  }
}

export default dtUniteNuage;