import SystemeMesureEnum from "../../enum/SystemeMesureEnum";
import UnitePourcentageEnum from "../../enum/unite/UnitePourcentageEnum";
import aUnite from "./aUnite";

class dtUniteNuage extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesureEnum) {
    super(valeur, UnitePourcentageEnum["%"]);
    this.valeur = valeur;
  }
}

export default dtUniteNuage;