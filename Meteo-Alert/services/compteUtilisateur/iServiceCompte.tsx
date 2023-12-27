import Utilisateur from "../../models/Utilisateur";
import iObserverConnexion from "./iObserverConnexion";

export default interface IServiceCompte {
  inscription(email: string, motDePasse: string, userData:Object): Promise<Utilisateur | null>;
  connexion(email: string, motDePasse: string): Promise<Utilisateur | null>;
  deconnexion(): Promise<void>;
  addObserver(observer: iObserverConnexion): void;
  remObserver(observer: iObserverConnexion): void;
}