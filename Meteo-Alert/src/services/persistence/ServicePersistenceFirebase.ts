import { ref, set, get } from 'firebase/database';
import FirebaseConfig from '../FirebaseConfig';

class ServicePersistenceFirebase implements iServicePersistence{

  public async updateLieuxFavoris(lieuxFavoris: string, uidUtilisateur: string): Promise<void> {
    if (uidUtilisateur) {
      const database = FirebaseConfig.getInstance().database;
      const userRef = ref(database, `utilisateurs/${uidUtilisateur}`);
  
      // Obtenir l'objet utilisateur actuel
      const snapshot = await get(userRef);
      const userData = snapshot.val();
  
      // Mettre à jour la propriété lieuxFavoris
      userData.lieuxFavoris = lieuxFavoris;
      
      // Mettre à jour l'objet utilisateur dans la base de données
      await set(userRef, userData);
    }
  }
}

export default ServicePersistenceFirebase;