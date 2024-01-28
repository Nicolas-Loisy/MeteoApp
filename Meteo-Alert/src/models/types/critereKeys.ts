import iUnite from "../datatype/unite/iUnite";
import Meteo from "../valueObject/Meteo";

type critereKeys = {
  [K in keyof Meteo]: Meteo[K] extends iUnite ? K : never;
}[keyof Meteo];

export default critereKeys;