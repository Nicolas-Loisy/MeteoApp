import EvenementEnum from "../../models/enum/EvenementEnum";
import criteresType from "../../models/types/criteresType";
import meteoType from "../../models/types/meteoType";
import Meteo from "../../models/valueObject/Meteo";

interface iAlerte {
  readonly typeEvenement: EvenementEnum;

  checkEvenement(mesureMeteo: Meteo): boolean;
  getActiver(): boolean;
  setActiver(bool: boolean): void;
  getCritere(): Readonly<criteresType>;
  setSeuilPersonnalise(attribute: keyof meteoType, value: number): void;
}

export default iAlerte;