import SystemeMesure from "../enum/SystemeMesureEnum";
import UniteMesureCoordonnee from "../enum/UniteCoordonneeEnum";
import aUnite from "../abstract/aUnite";

class dtUniteCoordonnee extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesure) {
    super(valeur, "°" as UniteMesureCoordonnee);
    this.valeur = valeur;
  }
}

export default dtUniteCoordonnee;