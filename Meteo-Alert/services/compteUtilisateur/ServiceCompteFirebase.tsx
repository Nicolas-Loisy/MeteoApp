import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, Auth } from "firebase/auth";
import { ref, set, get, Database, getDatabase } from 'firebase/database';

import Utilisateur from "../../models/Utilisateur";
import iObserverConnexion from "./iObserverConnexion";

export default class ServiceCompteFirebase {
  private app: FirebaseApp;
  private auth: Auth;
  private database: Database;
  private token: string | any;
  private observers: iObserverConnexion[];

  constructor() {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_REALTIME_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID
    };

    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.database = getDatabase(this.app);
    this.token = null;
    this.observers = [];
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
  public async inscription(mail: string, password: string, userData: Object): Promise<Utilisateur | any> {
    try {
      //Inscription
      const userCredential = await createUserWithEmailAndPassword(this.auth, mail, password);

      //Ajout des données de l'utilisateur
      const user = userCredential.user;
      this.token = user.getIdToken();

      if (userData) {
        const userRef = ref(this.database, `utilisateurs/${user.uid}`);
        await set(userRef, userData);
      }

      userData = {
        ...userData,
        "mail": mail
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
      console.log("utilisateur");
      console.log(mail);
      console.log(password);

      //Connexion
      const userCredential = await signInWithEmailAndPassword(this.auth, mail, password);
      this.token = userCredential.user.getIdToken()
      //Récupération des informations de compte
      const userRef = ref(this.database, `utilisateurs/${userCredential.user.uid}`);
      const userDataFB = await get(userRef);

      let userData = {
        ...userDataFB.val(),
        "mail": userCredential.user.email
      }
      console.log(userData);

      let utilisateur = new Utilisateur(userData)
      

      this.notify();
      return utilisateur;
    } catch (error: any) {
      const errorMessage = error.message;
      throw new Error(errorMessage);
    }
  }

  public async deconnexion() : Promise<any> {
    await this.auth.signOut();
    this.token = null;
    this.notify();
  }
}