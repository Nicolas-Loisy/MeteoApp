import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, Auth } from "firebase/auth";
import { ref, set, get, Database, getDatabase } from 'firebase/database';

import Utilisateur from "../models/Utilisateur";

export default class ServiceCompteFirebase {
  app: FirebaseApp;
  auth: Auth;
  database: Database;

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
  }

  async inscription(mail: string, password: string, userData: Object) : Promise<Utilisateur | null> {
    try {
      //Inscription
      const userCredential = await createUserWithEmailAndPassword(this.auth, mail, password);

      //Ajout des données de l'utilisateur
      const user = userCredential.user;
      const uid = user.uid;

      if (userData) {
        const userRef = ref(this.database, `utilisateurs/${uid}`);
        await set(userRef, userData);
      }

      console.log(userData);
      userData = {
        ...userData,
        "mail" : mail
      }

      let utilisateur = new Utilisateur(userData)

      return utilisateur;
    } catch (error: any) {
      const errorMessage = error.message;
      throw new Error(errorMessage);
    }
  }

  async connexion(mail: string, password: string) : Promise<Utilisateur | null> {
    try {
      //Connexion
      const userCredential = await signInWithEmailAndPassword(this.auth, mail, password);

      //Récupération des informations de compte
      const userRef = ref(this.database, `utilisateurs/${userCredential.user.uid}`);
      const userDataFB = await get(userRef);
      
      let userData = {
        ...userDataFB.val(),
        "mail" : userCredential.user.email
      }

      let utilisateur = new Utilisateur(userData)
      
      return utilisateur;
    } catch (error: any) {
      const errorMessage = error.message;
      throw new Error(errorMessage);
    }
  }
}