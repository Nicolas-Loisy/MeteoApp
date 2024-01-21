import SystemeMesureEnum from "../enum/SystemeMesureEnum";
import UniteTempEnum from "../enum/UniteTempEnum";
import aUnite from "../abstract/aUnite";

class dtUniteTemperature extends aUnite {
  constructor(valeur: number, systemeMesure: SystemeMesureEnum) {
    super(valeur, UniteTempEnum[systemeMesure as keyof typeof UniteTempEnum]);
    this.valeur = valeur;
  }
}

export default dtUniteTemperature;