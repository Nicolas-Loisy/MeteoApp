class UniteNuage {
    private unite: string = "%";
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
    
    public toString(): String {
      return `${this.valeur} ${this.unite}`;
    }
}

export default UniteNuage;