import EvenementEnum from "../../models/enum/EvenementEnum";
import critereType from "../../models/types/critereType";
import Meteo from "../../models/valueObject/Meteo";

interface iAlerte {
  readonly typeEvenement: EvenementEnum;
  isActiver: boolean;
  criteres: critereType;

  checkEvenement(mesureMeteo: Meteo): boolean;
  setSeuilPersonnalise(attribute: keyof Meteo, value: number): void;
}

export default iAlerte;