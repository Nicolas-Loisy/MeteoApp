import lieuType from "../../models/types/lieuType";
import { alerteType } from "../../models/types/alerteType";
import utilisateurPersistenceType from "../../models/types/utilisateurPersistenceType";

interface iServicePersistence {
  inscription(GUID: string, utilisateurData: utilisateurPersistenceType): Promise<void>;
  getUtilisateurData(GUID: string): Promise<utilisateurPersistenceType>;
  getLieuxFavoris(uidUtilisateur: string): Promise<lieuType[]> ;
  ajouterLieuFavori(lieu: lieuType, UIDutilisateur: string): Promise<void>;
  supprimerLieuFavori(UIDlieu: string, UIDutilisateur: string): Promise<void>;
  ajouterReglageAlerte(alerte: alerteType, keyLieu: string, UIDutilisateur: string): Promise<void>;
}

export default iServicePersistence;