import SystemeMesure from "../enum/SystemeMesure";
import UniteMesurePression from "../enum/UniteMesurePression";
import aUnite from "./aUnite";

class UnitePression extends aUnite {
  constructor(valeur: number, systemeMesure?: SystemeMesure) {
    super(valeur, "hPa" as UniteMesurePression);
    this.valeur = valeur;
  }
}

export default UnitePression;