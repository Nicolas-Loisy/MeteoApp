import { ref, get, push, child, remove, set } from 'firebase/database';
import FirebaseConfig from '../../config/FirebaseConfig';
import iServicePersistence from './iServicePersistence';
import lieuType from '../../models/types/lieuType';
import { alerteType } from '../../models/types/alerteType';
import utilisateurPersistenceType from '../../models/types/utilisateurPersistenceType';
import ErreurBDD from './ErreurBDD';

class ServicePersistenceFirebase implements iServicePersistence {

  public async inscription(GUID: string, utilisateurData: utilisateurPersistenceType): Promise<void> {
    try {
      const database = FirebaseConfig.getInstance().database;
      const userRef = ref(database, `utilisateurs/${GUID}`);
      await set(userRef, utilisateurData);
    } catch (err: any) {
      throw ErreurBDD.ERREUR_DATABASE
    }
  }

  public async getUtilisateurData(GUID: string): Promise<utilisateurPersistenceType> {
    const database = FirebaseConfig.getInstance().database;
    try {
      const utilisateurRef = ref(database, `utilisateurs/${GUID}`);
      const utilisateurData = await get(utilisateurRef);

      return utilisateurData as unknown as utilisateurPersistenceType;
    } catch (err: any) {
      throw ErreurBDD.ERREUR_DATABASE
    }
  }

  public async getLieuxFavoris(GUID: string): Promise<lieuType[]> {
    const database = FirebaseConfig.getInstance().database;
    const lieuxFavoris: lieuType[] = [];
    const userRef = ref(database, `utilisateurs/${GUID}/lieuxFavoris`);

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

  public async ajouterLieuFavori(nouveauLieu: lieuType, GUID: string): Promise<void> {
    const database = FirebaseConfig.getInstance().database;
  
    try {
      const { key, ...lieuData } = nouveauLieu;
      const userRef = ref(database, `utilisateurs/${GUID}/lieuxFavoris/${key}`);
      set(userRef, lieuData); 
      
    } catch (error: any) {
      console.error("[ERREUR] Echec de l'ajout du lieu favori dans Firebase :", error);
      throw error;
    }
  }

  public async supprimerLieuFavori(UIDlieu: string, GUID: string): Promise<void> {
    const database = FirebaseConfig.getInstance().database;
    const userRef = ref(database, `utilisateurs/${GUID}/lieuxFavoris`);

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