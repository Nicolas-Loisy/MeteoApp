import SystemeMesure from "../enum/SystemeMesure";
import UniteMesureTemp from "../enum/UniteMesureTemp";

class UniteTemperature {
  private unite: UniteMesureTemp;
  private valeur: number;

  constructor(systemeMesure: SystemeMesure, valeur: number) {
    this.unite = UniteMesureTemp[systemeMesure as keyof typeof UniteMesureTemp];
    this.valeur = valeur;
  }

  public getUnite(): UniteMesureTemp {
    return this.unite;
  }

  public setUnite(unite: UniteMesureTemp): void {
    this.unite = unite;
  }

  public getValeur(): number {
    return this.valeur;
  }

  public setValeur(valeur: number): void {
    this.valeur = valeur;
  }

  public toString(): String {
    return `${this.valeur} ${this.unite}`;
  }
}

export default UniteTemperature;