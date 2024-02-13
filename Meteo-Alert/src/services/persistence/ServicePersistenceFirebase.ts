import { ref, get, set } from 'firebase/database';

import FirebaseConfig from '../../config/FirebaseConfig';
import iServicePersistence from './iServicePersistence';

import ErreurBDD from '../../models/enum/erreurs/ErreurBDD';
import utilisateurPersistence from '../../models/types/pertistence/utilisateurPersistence';
import lieuxFavorisPersistence from '../../models/types/pertistence/lieuxFavorisPersistence';
import reglageAppData from '../../models/types/pertistence/reglageAppPersistence';

class ServicePersistenceFirebase implements iServicePersistence {
  public async inscription(GUID: string, utilisateurData: utilisateurPersistence): Promise<void> {
    try {
      const database = FirebaseConfig.getInstance().database;
      const userRef = ref(database, `utilisateurs/${GUID}`);
      await set(userRef, utilisateurData);
    } catch (err: any) {
      throw ErreurBDD.ERREUR_DATABASE
    }
  }

  public async getUtilisateurData(GUID: string): Promise<utilisateurPersistence> {
    const database = FirebaseConfig.getInstance().database;
    
    try {
      // Récupération des données en base
      const utilisateurRef = ref(database, `utilisateurs/${GUID}`);
      const snapshot = await get(utilisateurRef);
  
      if (!snapshot.exists()) {
        throw ErreurBDD.ERREUR_DATABASE;
      }
  
      const data: utilisateurPersistence = {
        lieuxFavoris: snapshot.val().lieuxFavoris ?? {},
        reglageApp: snapshot.val().reglageApp ?? {},
        utilisateurInfos: snapshot.val().utilisateurInfos ?? {},
      };

      return data;
    } catch (error) {
      throw ErreurBDD.ERREUR_DATABASE;
    }
  }

  public async updateLieuxFavoris(lieuxData: lieuxFavorisPersistence, GUID: string): Promise<void> {
    const database = FirebaseConfig.getInstance().database;
    try {
      const userRef = ref(database, `utilisateurs/${GUID}/lieuxFavoris/`);
      set(userRef, lieuxData); 
      
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  public async updateReglage(reglageApp: reglageAppData, GUID: string): Promise<void> {
    const database = FirebaseConfig.getInstance().database;
    try {
      const userRef = ref(database, `utilisateurs/${GUID}/reglageApp/`);
      set(userRef, reglageApp); 
      
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
}

export default ServicePersistenceFirebase;