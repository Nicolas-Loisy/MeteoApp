import SystemeMesure from "../enum/SystemeMesure";
import UniteMesureCoordonnee from "../enum/UniteMesureCoordonnee";
import aUnite from "../abstract/aUnite";

class dtUniteCoordonnee extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesure) {
    super(valeur, "°" as UniteMesureCoordonnee);
    this.valeur = valeur;
  }
}

export default dtUniteCoordonnee;