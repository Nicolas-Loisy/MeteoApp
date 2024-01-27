import EvenementEnum from "../../models/enum/EvenementEnum";
import critereType from "../../models/types/critereType";
import Meteo from "../../models/valueObject/Meteo";
import iAlerte from "./iAlerte";

abstract class aAlerte implements iAlerte {
  public readonly typeEvenement: EvenementEnum;
  public isActiver: boolean;
  public criteres: critereType;

  public constructor(typeEvenement: EvenementEnum, criteres: critereType) {
    this.typeEvenement = typeEvenement;
    this.criteres = criteres;
    this.isActiver = true;
  }

  public setSeuilPersonnalise(attribute: keyof Meteo, value: number) {
    if (!this.criteres[attribute]) throw new Error(`Attribute '${attribute}' does not exist in {${Object.keys(this.criteres).join(', ')}}`);

    this.criteres[attribute]?.setValeur(value);
  }

  public abstract checkEvenement(meteo: Meteo): boolean;
}

export default aAlerte;