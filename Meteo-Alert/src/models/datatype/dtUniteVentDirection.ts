import SystemeMesure from "../enum/SystemeMesureEnum";
import UniteMesureDirection from "../enum/UniteDirectionEnum";
import aUnite from "../abstract/aUnite";

class dtUniteVentDirection extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesure) {
    super(valeur, "°" as UniteMesureDirection);
    this.valeur = valeur;
  }
}

export default dtUniteVentDirection;