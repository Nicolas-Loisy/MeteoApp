import lieuType from "../../models/types/lieuType";

interface iServicePersistence {
  getLieuxFavoris(uidUtilisateur: string): Promise<lieuType[]> ;
  updateLieuxFavoris(lieuxFavoris: lieuType[], uidUtilisateur: string): Promise<void>;
}

export default iServicePersistence;