import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updatePassword, EmailAuthProvider, reauthenticateWithCredential, deleteUser, onAuthStateChanged, User } from "firebase/auth";

import iServiceCompte from "./iServiceCompte";
import FirebaseConfig from "../../config/FirebaseConfig";
import ErreurAuth from "./ErreurAuth";
import { FirebaseError } from "firebase/app";

export default class ServiceCompteFirebase implements iServiceCompte {

  /*------------ FONCTION DE COMPTE FIREBASE ------------*/
  public async inscription(mail: string, password: string): Promise<string> {
    try {
      // Inscription
      const auth = FirebaseConfig.getInstance().auth;
      const userCredential = await createUserWithEmailAndPassword(auth, mail, password);

      // Ajout des données de l'utilisateur
      const user = userCredential.user;

      return user.uid;
    } catch (error: unknown) {
      throw this.mapErrorToErreurAuth(error);
    }
  }


  public async connexion(mail: string, password: string): Promise<string | any> {
    try {
      //Connexion
      const auth = FirebaseConfig.getInstance().auth;
      const userCredential = await signInWithEmailAndPassword(auth, mail, password);

      return userCredential.user.uid;
    } catch (error: any) {
      console.log(error);
      throw this.mapErrorToErreurAuth(error);
    }
  }

  public async fetchConnexion(): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
      const auth = FirebaseConfig.getInstance().auth;

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve(null);
        }
      }, reject);
    });
  }

  public async deconnexion(): Promise<any> {
    const auth = FirebaseConfig.getInstance().auth;
    await auth.signOut();
  }

  public async reinitialiserMdp(email: string): Promise<void> {
    const auth = FirebaseConfig.getInstance().auth;
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw this.mapErrorToErreurAuth(error);
    }
  }

  public async modifierMdp(ancienMotDePasse: string, motDePasse: string): Promise<void> {
    const auth = FirebaseConfig.getInstance().auth;
    try {
      const isConnexionVerifiee = await this.verifierConnexion(ancienMotDePasse);
      if (isConnexionVerifiee) throw new Error("FirebaseError: reauthentication failed");

      /* Mise à jour du mot de passe */
      await updatePassword(auth.currentUser!, motDePasse);

    } catch (error: any) {
      throw this.mapErrorToErreurAuth(error);
    }
  }

  public async supprimerCompte(motDePasse: string): Promise<void> {
    const auth = FirebaseConfig.getInstance().auth;
    try {
      const isConnexionVerifiee = await this.verifierConnexion(motDePasse);
      if (isConnexionVerifiee) throw new Error("FirebaseError: reauthentication failed");

      /* Mise à jour du mot de passe */
      await deleteUser(auth.currentUser!);
    } catch (error: any) {
      throw this.mapErrorToErreurAuth(error);
    }
  }

  /* ------------------- Private ------------------- */
  private async verifierConnexion(motDePasse: string): Promise<boolean> {
    const auth = FirebaseConfig.getInstance().auth;

    try {
      /* Vérification du statut de l'utilisateur */
      const user = auth.currentUser;
      if (!user) throw new Error("FirebaseError: user is null");
      if (!user.email) throw new Error("FirebaseError: user email is null")

      /* Vérification de l'ancien mot de passe */
      var credential = EmailAuthProvider.credential(
        user.email!,
        motDePasse
      );

      const userCredential = await reauthenticateWithCredential(user, credential);

      return !!userCredential;
    } catch (error: any) {
      console.log(error);
      throw (error);
    }
  }

  private mapErrorToErreurAuth(error: unknown): ErreurAuth | null {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/invalid-credential":
          return ErreurAuth.ERREUR_IDENTIFIANTS_INVALIDES;
        case "auth/email-already-in-use":
          return ErreurAuth.ERREUR_EMAIL_UTILISE;
        case "auth/invalid-email":
          return ErreurAuth.ERREUR_EMAIL_INVALIDE;
        case "auth/weak-password":
          return ErreurAuth.ERREUR_MDP_FAIBLE;
        case "auth/requires-recent-login":
          return ErreurAuth.ERREUR_RECONNEXION_NECESSAIRE;
        case "auth/user-disabled":
          return ErreurAuth.ERREUR_COMPTE_DESACTIVE;
      }
    }
    console.error(error);
    return null;
  }
}
