import SystemeMesure from "../enum/SystemeMesure";
import UniteMesureDistance from "../enum/UniteMesureDistance";
import aUnite from "../abstract/aUnite";

class dtUniteVisibilite extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesure) {
    super(valeur, "m" as UniteMesureDistance);
    this.valeur = valeur;
  }
}

export default dtUniteVisibilite;