import reglageAlertePersistence from "./reglageAlertePersistence";

type lieuxFavorisPersistence = {
  [key: string]: {
    lat: number;
    lon: number;
    nom: string;
    pays: string;
    region: string;
    reglageAlerte: reglageAlertePersistence;
  };
};

export default lieuxFavorisPersistence;