import EvenementEnum from "../../enum/EvenementEnum";
import meteoType from "../meteoType";

type reglageAlertePersistence = {
  [evenement in EvenementEnum]?: {
    isActiver: boolean;
    criteres: Partial<meteoType>;
  };
};

export default reglageAlertePersistence;