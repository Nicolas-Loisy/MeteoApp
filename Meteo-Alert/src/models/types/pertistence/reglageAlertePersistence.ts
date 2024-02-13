import EvenementEnum from "../../enum/EvenementEnum";
import meteoType from "../meteoType";

type reglageAlertePersistence = {
  [evenement in EvenementEnum]?: {
    readonly isActiver: boolean;
    readonly criteres: Partial<meteoType>;
  };
};

export default reglageAlertePersistence;