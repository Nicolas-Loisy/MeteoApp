import EvenementEnum from "../../models/enum/EvenementEnum";
import critereKeys from "../../models/types/critereKeys";
import critereType from "../../models/types/critereType";
import Meteo from "../../models/valueObject/Meteo";
import iAlerte from "./iAlerte";

abstract class aAlerte implements iAlerte {
  public readonly typeEvenement: EvenementEnum;
  public isActiver: boolean;
  abstract criteres: Partial<critereType<critereKeys>>;

  public constructor(typeEvenement: EvenementEnum) {
    this.typeEvenement = typeEvenement;
    this.isActiver = true;
  }

  public setSeuilPersonnalise<T extends critereKeys>(attribute: T, value: number): void  {
    if (!this.criteres[attribute]) throw new Error(`Attribute '${attribute}' does not exist in {${Object.keys(this.criteres).join(', ')}}`);

    this.criteres[attribute]?.setValeur(value);
  }

  public abstract checkEvenement(meteo: Meteo): boolean;
}

export default aAlerte;