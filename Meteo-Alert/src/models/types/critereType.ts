import iUnite from "../datatype/unite/iUnite";
import Meteo from "../valueObject/Meteo";
import critereKeys from "./critereKeys";

type critereType<T extends critereKeys> = {
  [K in T]: Meteo[K] extends iUnite ? Meteo[K] : never;
};

type critereTemperatureKeys = Extract<critereKeys, "temperature" | "humidite">;


export default critereType;