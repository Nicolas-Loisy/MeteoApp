import EvenementEnum from "../../models/enum/EvenementEnum";
import ErreurAlerte from "../../models/enum/erreurs/ErreurAlerte";
import meteoType from "../../models/types/meteoType";
import Meteo from "../../models/valueObject/Meteo";
import iAlerte from "./iAlerte";

abstract class aAlerte implements iAlerte {
  public readonly typeEvenement: EvenementEnum;
  public isActiver: boolean;
  protected abstract criteres: Partial<meteoType>;

  public constructor(typeEvenement: EvenementEnum) {
    this.typeEvenement = typeEvenement;
    this.isActiver = true;
  }

  public getCritere(): Readonly<Partial<meteoType>> {
    return this.criteres;
  }

  public setSeuilPersonnalise(attribute: keyof meteoType, value: number): void  {
    if (!this.criteres[attribute]) throw ErreurAlerte.ATTRIBUT_INCORRECT;

    this.criteres[attribute] = value;
  }

  public abstract checkEvenement(meteo: Meteo): boolean;
}

export default aAlerte;