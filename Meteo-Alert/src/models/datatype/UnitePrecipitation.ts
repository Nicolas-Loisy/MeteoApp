import SystemeMesure from "../enum/SystemeMesure";
import UniteMesureTaille from "../enum/UniteMesureTaille";
import aUnite from "./aUnite";

class UnitePrecipitation extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesure) {
    super(valeur, "mm/h" as UniteMesureTaille);
    this.valeur = valeur;
  }
}

export default UnitePrecipitation;