import SystemeMesureEnum from "../enum/SystemeMesureEnum";
import UniteDistanceEnum from "../enum/UniteDistanceEnum";
import aUnite from "../abstract/aUnite";

class dtUniteVisibilite extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesureEnum) {
    super(valeur, "m" as UniteDistanceEnum);
    this.valeur = valeur;
  }
}

export default dtUniteVisibilite;