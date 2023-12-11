class UniteVentVitesse {
  private unite: UniteMesureVitesse;
  private valeur: number;

  constructor(systemeMesure: SystemeMesure, valeur: number) {
    this.unite = UniteMesureVitesse[systemeMesure];
    this.valeur = valeur;
  }

  public getUnite(): UniteMesureVitesse {
    return this.unite;
  }

  public setUnite(unite: UniteMesureVitesse): void {
    this.unite = unite;
  }

  public getValeur(): number {
    return this.valeur;
  }

  public setValeur(valeur: number): void {
    this.valeur = valeur;
  }
}