import SystemeMesureEnum from "../../enum/SystemeMesureEnum";
import UniteCoordonneeEnum from "../../enum/unite/UniteCoordonneeEnum";
import aUnite from "./aUnite";

class dtUniteCoordonnee extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesureEnum) {
    super(valeur, UniteCoordonneeEnum["°"]);
    this.valeur = valeur;
  }
}

export default dtUniteCoordonnee;