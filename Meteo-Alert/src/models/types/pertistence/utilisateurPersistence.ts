import utilisateurInfosType from "../utilisateurInfosType";
import lieuxFavorisPersistence from "./lieuxFavorisPersistence";
import reglagePersistence from "./reglageAppPersistence";

type UtilisateurPersistence = {
  readonly lieuxFavoris: lieuxFavorisPersistence;
  readonly reglageApp: reglagePersistence;
  readonly utilisateurInfos: utilisateurInfosType;
};

export default UtilisateurPersistence;