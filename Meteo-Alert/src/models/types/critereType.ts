import iUnite from "../datatype/unite/iUnite";
import Meteo from "../valueObject/Meteo";

type critereType = Partial<{
  [K in keyof Meteo]: Meteo[K] extends iUnite ? Meteo[K] : never;
}>;

export default critereType;