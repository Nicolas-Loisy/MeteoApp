import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, Auth } from "firebase/auth";
import { ref, set, get, Database, getDatabase } from 'firebase/database';

import Utilisateur from "../models/Utilisateur";

export default class ServiceCompteFirebase {
  private app: FirebaseApp;
  private auth: Auth;
  private database: Database;
  private token: string | any;

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
  }

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

      return utilisateur;
    } catch (error: any) {
      const errorMessage = error.message;
      throw new Error(errorMessage);
    }
  }

  public async connexion(mail: string, password: string): Promise<Utilisateur | any> {
    try {
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

      let utilisateur = new Utilisateur(userData)

      return utilisateur;
    } catch (error: any) {
      const errorMessage = error.message;
      throw new Error(errorMessage);
    }
  }

  public async checkConnexion(): Promise<boolean> {
    try {
      let user = this.auth.currentUser;
      return user ? true : false;
    } catch (error : any) {
      const errorMessage = error.message;
      throw new Error(errorMessage);
    }
  }  

  public async deconnexion() {
    await this.auth.signOut();
    this.token = null;
  }
}