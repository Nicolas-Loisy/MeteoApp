import { ref, get, set } from 'firebase/database';
import FirebaseConfig from '../../config/FirebaseConfig';
import iServicePersistence from './iServicePersistence';
import ErreurBDD from '../../models/enum/erreurs/ErreurBDD';
import utilisateurDataType from '../../models/types/pertistence/utilisateurDataType';
import lieuxFavorisDataType from '../../models/types/pertistence/lieuxFavorisDataType';

class ServicePersistenceFirebase implements iServicePersistence {
  public async inscription(GUID: string, utilisateurData: utilisateurDataType): Promise<void> {
    try {
      const database = FirebaseConfig.getInstance().database;
      const userRef = ref(database, `utilisateurs/${GUID}`);
      await set(userRef, utilisateurData);
    } catch (err: any) {
      throw ErreurBDD.ERREUR_DATABASE
    }
  }

  public async getUtilisateurData(GUID: string): Promise<utilisateurDataType> {
    const database = FirebaseConfig.getInstance().database;
    
    try {
      // Récupérationd des données en base
      const utilisateurRef = ref(database, `utilisateurs/${GUID}`);
      const snapshot = await get(utilisateurRef);
  
      if (!snapshot.exists()) {
        throw ErreurBDD.ERREUR_DATABASE;
      }
  
      const data = snapshot.val() as utilisateurDataType;

      return data;
    } catch (error) {
      throw ErreurBDD.ERREUR_DATABASE;
    }
  }

  public async updateLieuxFavoris(lieuxData: lieuxFavorisDataType, GUID: string): Promise<void> {
    const database = FirebaseConfig.getInstance().database;
    try {
      const userRef = ref(database, `utilisateurs/${GUID}/lieuxFavoris/`);
      set(userRef, lieuxData); 
      
    } catch (error: any) {
      console.error("[ERREUR] Echec de l'ajout du lieu favori dans Firebase :", error);
      throw error;
    }
  }
}

export default ServicePersistenceFirebase;