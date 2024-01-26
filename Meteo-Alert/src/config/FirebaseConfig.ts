import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth, getReactNativePersistence, initializeAuth, setPersistence } from "firebase/auth";
import { Database, getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

class FirebaseConfig {
  private static instance: FirebaseConfig | null = null;

  public readonly app: FirebaseApp;
  public readonly auth: Auth;
  public readonly database: Database;

  private constructor() {
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
    this.auth = initializeAuth(this.app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    })
    
    this.database = getDatabase(this.app);
  }

  public static getInstance(): FirebaseConfig {
    if (!FirebaseConfig.instance) {
      FirebaseConfig.instance = new FirebaseConfig();
    }

    return FirebaseConfig.instance;
  }
}

export default FirebaseConfig;
