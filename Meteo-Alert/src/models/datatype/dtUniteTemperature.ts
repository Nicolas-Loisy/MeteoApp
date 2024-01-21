import SystemeMesure from "../enum/SystemeMesure";
import UniteMesureTemp from "../enum/UniteMesureTemp";
import aUnite from "../abstract/aUnite";

class dtUniteTemperature extends aUnite {
  constructor(valeur: number, systemeMesure: SystemeMesure) {
    super(valeur, UniteMesureTemp[systemeMesure as keyof typeof UniteMesureTemp]);
    this.valeur = valeur;
  }
}

export default dtUniteTemperature;