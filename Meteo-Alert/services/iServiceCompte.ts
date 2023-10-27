import Utilisateur from "../models/Utilisateur";

export default interface iServiceCompte {
  inscription(email: string, motDePasse: string, userData:Object): Promise<Utilisateur | null>;
  connexion(email: string, motDePasse: string): Promise<Utilisateur | null>;
  checkConnexion(): Promise<Boolean | null>;
  deconnexion(): any;
}