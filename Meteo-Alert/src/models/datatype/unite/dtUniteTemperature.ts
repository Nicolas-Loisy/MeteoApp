import SystemeMesureEnum from "../../enum/SystemeMesureEnum";
import UniteTempEnum from "../../enum/unite/UniteTempEnum";
import aUnite from "./aUnite";

class dtUniteTemperature extends aUnite {
  constructor(valeur: number, systemeMesure: SystemeMesureEnum) {
    super(valeur, UniteTempEnum[systemeMesure as keyof typeof UniteTempEnum]);
    this.valeur = valeur;
  }
}

export default dtUniteTemperature;