import lieuType from "../../models/types/lieuType";

interface iServicePersistence {
  getLieuxFavoris(uidUtilisateur: string): Promise<lieuType[]> ;
  ajouterLieuFavori(lieu: lieuType, UIDutilisateur: string): Promise<void>;
  supprimerLieuFavori(UIDlieu: string, UIDutilisateur: string): Promise<void>;
}

export default iServicePersistence;