import critereType from "./critereUniqueType";
import meteoType from "./meteoType";

type criteresType = {
  [key in keyof meteoType]?: 
    critereType 
}

export default criteresType;