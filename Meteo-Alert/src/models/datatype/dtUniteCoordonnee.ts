import SystemeMesureEnum from "../enum/SystemeMesureEnum";
import UniteCoordonneeEnum from "../enum/UniteCoordonneeEnum";
import aUnite from "../abstract/aUnite";

class dtUniteCoordonnee extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesureEnum) {
    super(valeur, "°" as UniteCoordonneeEnum);
    this.valeur = valeur;
  }
}

export default dtUniteCoordonnee;