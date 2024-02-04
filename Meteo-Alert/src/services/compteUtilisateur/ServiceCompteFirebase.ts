import { signInWithEmailAndPassword, createUserWithEmailAndPassword, Auth, setPersistence, getReactNativePersistence, sendPasswordResetEmail, updatePassword, EmailAuthProvider, reauthenticateWithCredential, deleteUser } from "firebase/auth";

import { ref, set, get } from 'firebase/database';

import Utilisateur from "../../models/entities/Utilisateur";
import iObserverConnexion from "./iObserverConnexion";
import iServiceCompte from "./iServiceCompte";
import FirebaseConfig from "../../config/FirebaseConfig";
import utilisateurType from "../../models/types/utilisateurType";

export default class ServiceCompteFirebase implements iServiceCompte {
  private observers: iObserverConnexion[];
  private token: string | null;

  constructor() {
    this.observers = [];
    this.token = null;
  }

  /*----------------------- OBSERVER --------------------*/
  public addObserver(observer: iObserverConnexion): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log('Subject: Observer has been attached already.');
    }

    this.observers.push(observer);
    console.log('Subject: Attached an observer.');
  }

  public remObserver(observer: iObserverConnexion): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.');
    }

    this.observers.splice(observerIndex, 1);
    console.log('Subject: Detached an observer.');
  }

  private notify(): void {
    console.log('Subject: Notifying observers...');
    for (const observer of this.observers) {
      observer.update(this.token !== null);
    }
  }

  /*------------ FONCTION DE COMPTE FIREBASE ------------*/
  public async inscription(mail: string, password: string, userData: utilisateurType): Promise<Utilisateur | any> {
    try {
      //Inscription
      const auth = FirebaseConfig.getInstance().auth;
      const userCredential = await createUserWithEmailAndPassword(auth, mail, password);

      //Ajout des données de l'utilisateur
      const user = userCredential.user;
      const database = FirebaseConfig.getInstance().database;

      this.token = await user.getIdToken();

      if (userData) {
        const userRef = ref(database, `utilisateurs/${user.uid}`);
        await set(userRef, userData);
      }

      userData = {
        ...userData,
        "mail": mail,
        "uid": user.uid
      }

      let utilisateur = new Utilisateur(userData)

      this.notify();
      return utilisateur;
    } catch (error: any) {
      const errorMessage = error.message;
      throw new Error(errorMessage);
    }
  }

  public async connexion(mail: string, password: string): Promise<Utilisateur | any> {
    try {
      //Connexion
      const auth = FirebaseConfig.getInstance().auth;
      const database = FirebaseConfig.getInstance().database;

      const userCredential = await signInWithEmailAndPassword(auth, mail, password);
      this.token = await userCredential.user.getIdToken();

      //Récupération des informations de compte
      const userRef = ref(database, `utilisateurs/${userCredential.user.uid}`);
      const userDataFB = await get(userRef);

      let userData: utilisateurType = {
        ...userDataFB.val(), // prenom et lieuxFavoris
        "mail": userCredential.user.email,
        "uid": userCredential.user.uid,
      }

      let utilisateur = new Utilisateur(userData)

      this.notify();
      return utilisateur;
    } catch (error: any) {
      const errorMessage = error.message;
      throw new Error(errorMessage);
    }
  }

  public async deconnexion(): Promise<any> {
    const auth = FirebaseConfig.getInstance().auth;

    await auth.signOut();
    this.token = null;

    this.notify();
  }

  public async reinitialiserMdp(email: string): Promise<void> {
    const auth = FirebaseConfig.getInstance().auth;
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.log(error);
      throw (error);
    }
  }

  public async modifierMdp(ancienMotDePasse: string, motDePasse: string): Promise<void> {
    const auth = FirebaseConfig.getInstance().auth;
    try {
      const isConnexionVerifiee = await this.verifierConnexion(motDePasse);
      if (isConnexionVerifiee) throw new Error("FirebaseError: reauthentication failed");

      /* Mise à jour du mot de passe */
      await updatePassword(auth.currentUser!, motDePasse);
      
    } catch (error: any) {
      console.log(error);
      throw (error);
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
      console.log(error);
      throw (error);
    }
  }

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
}
