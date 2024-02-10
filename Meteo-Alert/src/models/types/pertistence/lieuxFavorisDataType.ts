import reglageAlerteDataType from "./reglageAlerteData";

type lieuxFavorisDataType = {
  [key: string]: {
    lat: number;
    lon: number;
    nom: string;
    pays: string;
    region: string;
    reglageAlerte: reglageAlerteDataType;
  };
};

export default lieuxFavorisDataType;