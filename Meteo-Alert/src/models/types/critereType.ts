import meteoType from "./meteoType";
import operateurComparaisonType from "./operateurComparaisonType";

type critereType = {
  [key in keyof meteoType]?: {
    valeur: number;
    operateurComparaison: operateurComparaisonType;
  };
}

export default critereType;