import SystemeMesure from "../enum/SystemeMesureEnum";
import UniteMesureDistance from "../enum/UniteDistanceEnum";
import aUnite from "../abstract/aUnite";

class dtUniteVisibilite extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesure) {
    super(valeur, "m" as UniteMesureDistance);
    this.valeur = valeur;
  }
}

export default dtUniteVisibilite;