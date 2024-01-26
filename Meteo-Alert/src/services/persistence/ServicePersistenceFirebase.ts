import { ref, set, get } from 'firebase/database';
import FirebaseConfig from '../../config/FirebaseConfig';
import iServicePersistence from './iServicePersistence';
import lieuType from '../../models/types/lieuType';

class ServicePersistenceFirebase implements iServicePersistence{

  public async getLieuxFavoris(UIDutilisateur: string): Promise<lieuType[]> {
    const lieuxFavoris: lieuType[] = [];
    const database = FirebaseConfig.getInstance().database;
    const userRef = ref(database, `utilisateurs/${UIDutilisateur}/lieuxFavoris`);

    try {
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const lieu = childSnapshot.val() as lieuType;
          lieuxFavoris.push(lieu);
        });
      }

      return lieuxFavoris;
    } catch (error: any) {
      console.error('Erreur lors de la récupération des lieux favoris:', error);
      throw error;
    }
  }

  public async updateLieuxFavoris(lieuxFavoris: lieuType[], UIDutilisateur: string): Promise<void> {
    if (UIDutilisateur) {
      const database = FirebaseConfig.getInstance().database;
      const userRef = ref(database, `utilisateurs/${UIDutilisateur}`);

      try {
        // Obtenir l'objet utilisateur actuel
        const snapshot = await get(userRef);
        let userData = snapshot.exists() ? snapshot.val() : {};

        // Mettre à jour la propriété lieuxFavoris
        userData.lieuxFavoris = lieuxFavoris;

        // Mettre à jour l'objet utilisateur dans la base de données
        await set(userRef, userData);
      } catch (error: any) {
        console.error('Erreur lors de la mise à jour des lieux favoris:', error);
        throw error;
      }
    }
  }
}

export default ServicePersistenceFirebase;