import SystemeMesure from "../enum/SystemeMesure";
import UniteMesureDirection from "../enum/UniteMesureDirection";
import aUnite from "./aUnite";

class UniteVentDirection extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesure) {
    super(valeur, "°" as UniteMesureDirection);
    this.valeur = valeur;
  }
}

export default UniteVentDirection;