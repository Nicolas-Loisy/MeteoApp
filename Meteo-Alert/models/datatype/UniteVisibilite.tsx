class UniteVisibilite {
    private unite: string = "m";
    private valeur: number;
  
    constructor(valeur: number) {
      this.valeur = valeur;
    }
  
    public getUnite(): string {
      return this.unite;
    }
  
    public setUnite(unite: string): void {
      this.unite = unite;
    }
  
    public getValeur(): number {
      return this.valeur;
    }
  
    public setValeur(valeur: number): void {
      this.valeur = valeur;
    }
}

export default UniteVisibilite;