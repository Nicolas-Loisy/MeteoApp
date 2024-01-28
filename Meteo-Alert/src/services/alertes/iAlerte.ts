import EvenementEnum from "../../models/enum/EvenementEnum";
import critereKeys from "../../models/types/critereKeys";
import critereType from "../../models/types/critereType";
import Meteo from "../../models/valueObject/Meteo";

interface iAlerte {
  readonly typeEvenement: EvenementEnum;
  isActiver: boolean;
  criteres: Partial<critereType<critereKeys>>;

  checkEvenement(mesureMeteo: Meteo): boolean;
  setSeuilPersonnalise<T extends critereKeys>(attribute: T, value: number): void;
}

export default iAlerte;