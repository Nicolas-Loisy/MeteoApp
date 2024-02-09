import utilisateurDataType from "../../models/types/utilisateurType";

export default interface iServiceCompte {
  inscription(email: string, motDePasse: string): Promise<string>;
  connexion(email: string, motDePasse: string): Promise<string>;
  deconnexion(): Promise<void>;
  fetchConnexion(): Promise<string | null>;

  reinitialiserMdp(email: string): Promise<void>;
  modifierMdp(ancienMotDePasse: string, motDePasse: string): Promise<void>;

  supprimerCompte(motDePasse: string): Promise<void>;
}