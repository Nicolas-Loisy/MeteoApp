import lieuxFavorisDataType from "./lieuxFavorisDataType";
import reglageAppData from "./reglageAppData";

type UtilisateurData = {
  lieuxFavoris: lieuxFavorisDataType;
  reglageApp: reglageAppData;
  prenom: string;
  email: string;
};

export default UtilisateurData;