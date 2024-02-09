import EvenementEnum from "../../enum/EvenementEnum";
import meteoType from "../meteoType";

type reglageAlerteDataType = {
  [evenement in EvenementEnum]?: {
    isActiver: boolean;
    criteres: Partial<meteoType>;
  };
};

export default reglageAlerteDataType;