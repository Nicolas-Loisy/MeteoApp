import EvenementEnum from "../../models/enum/EvenementEnum";
import meteoType from "../../models/types/meteoType";
import Meteo from "../../models/valueObject/Meteo";

interface iAlerte {
  readonly typeEvenement: EvenementEnum;
  isActiver: boolean;

  checkEvenement(mesureMeteo: Meteo): boolean;
  getCritere(): Readonly<Partial<meteoType>>;
  setSeuilPersonnalise(attribute: keyof meteoType, value: number): void;
}

export default iAlerte;