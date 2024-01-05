import SystemeMesure from "../enum/SystemeMesure";
import UniteMesureCoordonnee from "../enum/UniteMesureCoordonnee";
import aUnite from "./aUnite";

class UniteCoordonnee extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesure) {
    super(valeur, "°" as UniteMesureCoordonnee);
    this.valeur = valeur;
  }
}

export default UniteCoordonnee;