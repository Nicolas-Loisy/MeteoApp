import lieuxFavorisPersistence from "./lieuxFavorisPersistence";
import reglagePersistence from "./reglageAppPersistence";

type UtilisateurPersistence = {
  lieuxFavoris: lieuxFavorisPersistence;
  reglageApp: reglagePersistence;
  prenom: string;
  email: string;
};

export default UtilisateurPersistence;