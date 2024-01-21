import SystemeMesure from "../enum/SystemeMesureEnum";
import UniteMesureVitesse from "../enum/UniteVitesseEnum";
import aUnite from "../abstract/aUnite";

class dtUniteVentVitesse extends aUnite {
  constructor(valeur: number, systemeMesure: SystemeMesure) {
    super(valeur, UniteMesureVitesse[systemeMesure as keyof typeof UniteMesureVitesse]);
    this.valeur = valeur;
  }
}

export default dtUniteVentVitesse;