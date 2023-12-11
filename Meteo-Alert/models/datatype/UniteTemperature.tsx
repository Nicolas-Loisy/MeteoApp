class UniteTemperature {
  private unite: UniteMesureTemp;
  private valeur: number;

  constructor(systemeMesure: SystemeMesure, valeur: number) {
    this.unite = UniteMesureTemp[systemeMesure];
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
}