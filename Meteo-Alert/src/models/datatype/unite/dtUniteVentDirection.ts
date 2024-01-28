import SystemeMesureEnum from "../../enum/SystemeMesureEnum";
import UniteDirectionEnum from "../../enum/unite/UniteDirectionEnum";
import aUnite from "./aUnite";

class dtUniteVentDirection extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesureEnum) {
    super(valeur, UniteDirectionEnum["°"]);
    this.valeur = valeur;
  }
}

export default dtUniteVentDirection;