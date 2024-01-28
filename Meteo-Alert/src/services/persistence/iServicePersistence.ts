import lieuType from "../../models/types/lieuType";
import { alerteType } from "../../models/types/alerteType";

interface iServicePersistence {
  getLieuxFavoris(uidUtilisateur: string): Promise<lieuType[]> ;
  ajouterLieuFavori(lieu: lieuType, UIDutilisateur: string): Promise<void>;
  supprimerLieuFavori(UIDlieu: string, UIDutilisateur: string): Promise<void>;
  ajouterReglageAlerte(alerte: alerteType, keyLieu: string, UIDutilisateur: string): Promise<void>;
}

export default iServicePersistence;