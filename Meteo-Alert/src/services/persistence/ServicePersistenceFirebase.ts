import { ref, get, push, child, remove, set } from 'firebase/database';
import FirebaseConfig from '../../config/FirebaseConfig';
import iServicePersistence from './iServicePersistence';
import lieuType from '../../models/types/lieuType';
import { alerteType } from '../../models/types/alerteType';

class ServicePersistenceFirebase implements iServicePersistence {

  public async getLieuxFavoris(UIDutilisateur: string): Promise<lieuType[]> {
    const lieuxFavoris: lieuType[] = [];
    const database = FirebaseConfig.getInstance().database;
    const userRef = ref(database, `utilisateurs/${UIDutilisateur}/lieuxFavoris`);

    try {
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const lieuID = childSnapshot.key;
          const lieuData = childSnapshot.val();

          const lieu: lieuType = {
            key: lieuID,
            nom: lieuData.nom,
            lat: lieuData.lat,
            lon: lieuData.lon,
            pays: lieuData.pays,
            region: lieuData.region
          };

          lieuxFavoris.push(lieu);
        });
      }

      return lieuxFavoris;
    } catch (error: any) {
      console.error('Erreur lors de la récupération des lieux favoris:', error);
      throw error;
    }
  }

  public async ajouterLieuFavori(nouveauLieu: lieuType, UIDutilisateur: string): Promise<void> {
    const database = FirebaseConfig.getInstance().database;
  
    try {
      const { key, ...lieuData } = nouveauLieu;
      const userRef = ref(database, `utilisateurs/${UIDutilisateur}/lieuxFavoris/${key}`);
      set(userRef, lieuData); 
      
    } catch (error: any) {
      console.error("[ERREUR] Echec de l'ajout du lieu favori dans Firebase :", error);
      throw error;
    }
  }

  public async supprimerLieuFavori(UIDlieu: string, UIDutilisateur: string): Promise<void> {
    const database = FirebaseConfig.getInstance().database;
    const userRef = ref(database, `utilisateurs/${UIDutilisateur}/lieuxFavoris`);

    try {
      // Référence au lieu spécifique à supprimer
      const lieuRef = child(userRef, UIDlieu);

      // Supprimer le lieu de la base de données
      await remove(lieuRef);
    } catch (error: any) {
      console.error('Erreur lors de la suppression du lieu favori:', error);
      throw error;
    }
  }

  public async ajouterReglageAlerte(alerte: alerteType, keyLieu: string, UIDutilisateur: string): Promise<void> {  
    const database = FirebaseConfig.getInstance().database;
    const {typeEvenement, ...reglageAlerte} = alerte;

    try {
      const userRef = ref(database, `utilisateurs/${UIDutilisateur}/lieuxFavoris/${keyLieu}/reglageAlerte/${typeEvenement}`);

      set(userRef, reglageAlerte);
    } catch (error: any) {
      console.error("[ERREUR] Echec de l'ajout du lieu favori dans Firebase :", error);
      throw error;
    }
  }
}

export default ServicePersistenceFirebase;