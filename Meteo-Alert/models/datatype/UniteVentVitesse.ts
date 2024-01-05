import SystemeMesure from "../enum/SystemeMesure";
import UniteMesureVitesse from "../enum/UniteMesureVitesse";
import aUnite from "./aUnite";

class UniteVentVitesse extends aUnite {
  constructor(valeur: number, systemeMesure: SystemeMesure) {
    super(valeur, UniteMesureVitesse[systemeMesure as keyof typeof UniteMesureVitesse]);
    this.valeur = valeur;
  }
}

export default UniteVentVitesse;