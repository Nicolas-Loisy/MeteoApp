import lieuxFavorisPersistence from "../../models/types/pertistence/lieuxFavorisPersistence";
import reglagePersistence from "../../models/types/pertistence/reglageAppPersistence";
import utilisateurPersistence from "../../models/types/pertistence/utilisateurPersistence";

interface iServicePersistence {
  inscription(GUID: string, utilisateurData: utilisateurPersistence): Promise<void>;
  getUtilisateurData(GUID: string): Promise<utilisateurPersistence>;
  updateLieuxFavoris(lieuxData: lieuxFavorisPersistence, GUID: string): Promise<void>;
  updateReglage(reglageApp: reglagePersistence, GUID: string): Promise<void>;
}

export default iServicePersistence;