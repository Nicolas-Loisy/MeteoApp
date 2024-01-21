import SystemeMesure from "../enum/SystemeMesure";
import UniteMesurePourcentage from "../enum/UniteMesurePourcentage";
import aUnite from "./aUnite";

class UniteHumidite extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesure) {
    super(valeur, "%" as UniteMesurePourcentage);
    this.valeur = valeur;
  }
}

export default UniteHumidite;