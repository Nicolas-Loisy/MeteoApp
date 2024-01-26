import SystemeMesureEnum from "../../enum/SystemeMesureEnum";
import UnitePourcentageEnum from "../../enum/unite/UnitePourcentageEnum";
import aUnite from "./aUnite";

class dtUniteHumidite extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesureEnum) {
    super(valeur, UnitePourcentageEnum["%"]);
    this.valeur = valeur;
  }
}

export default dtUniteHumidite;