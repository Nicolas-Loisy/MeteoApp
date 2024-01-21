import SystemeMesureEnum from "../enum/SystemeMesureEnum";
import UniteDirectionEnum from "../enum/UniteDirectionEnum";
import aUnite from "../abstract/aUnite";

class dtUniteVentDirection extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesureEnum) {
    super(valeur, "°" as UniteDirectionEnum);
    this.valeur = valeur;
  }
}

export default dtUniteVentDirection;