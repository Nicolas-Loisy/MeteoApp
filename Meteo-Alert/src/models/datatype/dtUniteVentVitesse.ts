import SystemeMesureEnum from "../enum/SystemeMesureEnum";
import UniteVitesseEnum from "../enum/UniteVitesseEnum";
import aUnite from "../abstract/aUnite";

class dtUniteVentVitesse extends aUnite {
  constructor(valeur: number, systemeMesure: SystemeMesureEnum) {
    super(valeur, UniteVitesseEnum[systemeMesure as keyof typeof UniteVitesseEnum]);
    this.valeur = valeur;
  }
}

export default dtUniteVentVitesse;