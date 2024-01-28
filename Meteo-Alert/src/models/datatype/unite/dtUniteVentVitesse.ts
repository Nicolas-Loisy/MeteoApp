import SystemeMesureEnum from "../../enum/SystemeMesureEnum";
import UniteVitesseEnum from "../../enum/unite/UniteVitesseEnum";
import aUnite from "./aUnite";

class dtUniteVentVitesse extends aUnite {
  constructor(valeur: number, systemeMesure: SystemeMesureEnum) {
    super(valeur, UniteVitesseEnum[systemeMesure as keyof typeof UniteVitesseEnum]);
    this.valeur = valeur;
  }
}

export default dtUniteVentVitesse;