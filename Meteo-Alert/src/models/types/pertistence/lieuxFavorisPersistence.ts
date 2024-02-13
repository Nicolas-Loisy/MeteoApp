import reglageAlertePersistence from "./reglageAlertePersistence";

type lieuxFavorisPersistence = {
  [key: string]: {
    readonly lat: number;
    readonly lon: number;
    readonly nom: string;
    readonly pays: string;
    readonly region: string;
    readonly reglageAlerte: reglageAlertePersistence;
  };
};

export default lieuxFavorisPersistence;