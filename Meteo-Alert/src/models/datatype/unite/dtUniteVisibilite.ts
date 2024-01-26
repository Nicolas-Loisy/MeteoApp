import SystemeMesureEnum from "../../enum/SystemeMesureEnum";
import UniteDistanceEnum from "../../enum/unite/UniteDistanceEnum";
import aUnite from "./aUnite";

class dtUniteVisibilite extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesureEnum) {
    super(valeur, UniteDistanceEnum["m"]);
    this.valeur = valeur;
  }
}

export default dtUniteVisibilite;