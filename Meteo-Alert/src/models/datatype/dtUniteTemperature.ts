import SystemeMesure from "../enum/SystemeMesureEnum";
import UniteMesureTemp from "../enum/UniteTempEnum";
import aUnite from "../abstract/aUnite";

class dtUniteTemperature extends aUnite {
  constructor(valeur: number, systemeMesure: SystemeMesure) {
    super(valeur, UniteMesureTemp[systemeMesure as keyof typeof UniteMesureTemp]);
    this.valeur = valeur;
  }
}

export default dtUniteTemperature;