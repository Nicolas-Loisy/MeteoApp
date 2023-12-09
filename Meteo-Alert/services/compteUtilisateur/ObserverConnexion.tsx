import iObserverConnexion from "./IObserverConnexion";
import iServiceCompte from "./IServiceCompte";

export default class ObserverConnexion implements iObserverConnexion {
  private setStatutConnecte : Function;

  constructor(setStatutConnecte : Function) {
    this.setStatutConnecte = setStatutConnecte;
  }
  public update(statutConnecte: Boolean): void {
    this.setStatutConnecte(statutConnecte);
  }
}