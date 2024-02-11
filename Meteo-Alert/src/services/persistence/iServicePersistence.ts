import lieuxFavorisDataType from "../../models/types/pertistence/lieuxFavorisDataType";
import reglageAppData from "../../models/types/pertistence/reglageAppData";
import utilisateurDataType from "../../models/types/pertistence/utilisateurDataType";

interface iServicePersistence {
  inscription(GUID: string, utilisateurData: utilisateurDataType): Promise<void>;
  getUtilisateurData(GUID: string): Promise<utilisateurDataType>;
  updateLieuxFavoris(lieuxData: lieuxFavorisDataType, GUID: string): Promise<void>;
  updateReglage(reglageApp: reglageAppData, GUID: string): Promise<void>;
}

export default iServicePersistence;