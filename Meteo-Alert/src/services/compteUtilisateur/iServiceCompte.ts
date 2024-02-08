import Utilisateur from "../../models/entities/Utilisateur";
import iObserverConnexion from "./iObserverConnexion";

export default interface iServiceCompte {
  inscription(email: string, motDePasse: string, userData:Object): Promise<Utilisateur | null>;
  connexion(email: string, motDePasse: string): Promise<Utilisateur | null>;
  deconnexion(): Promise<void>;
  fetchConnexion(): Promise<Utilisateur | null>;

  reinitialiserMdp(email: string): Promise<void>;
  modifierMdp(ancienMotDePasse: string, motDePasse: string): Promise<void>;

  supprimerCompte(motDePasse: string): Promise<void>;
  
  // Observer
  addObserver(observer: iObserverConnexion): void;
  remObserver(observer: iObserverConnexion): void;
}