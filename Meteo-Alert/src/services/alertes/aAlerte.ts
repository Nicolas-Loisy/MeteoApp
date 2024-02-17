import EvenementEnum from "../../models/enum/EvenementEnum";
import ErreurAlerte from "../../models/enum/erreurs/ErreurAlerte";
import criteresType from "../../models/types/criteresType";
import meteoType from "../../models/types/meteoType";
import Meteo from "../../models/valueObject/Meteo";
import iAlerte from "./iAlerte";

abstract class aAlerte implements iAlerte {
  public readonly typeEvenement: EvenementEnum;
  protected isActiver: boolean;
  protected abstract criteres: criteresType

  public constructor(typeEvenement: EvenementEnum) {
    this.typeEvenement = typeEvenement;
    this.isActiver = true;
  }

  public getCritere(): Readonly<criteresType> {
    return this.criteres;
  }

  public getActiver(): boolean {
    return this.isActiver;
  }

  public setActiver(bool: boolean): void {
    this.isActiver = bool
  }

  public setSeuilPersonnalise(attribute: keyof meteoType, value: number): void  {
    if (this.criteres[attribute] === undefined || this.criteres[attribute] === null) throw ErreurAlerte.ATTRIBUT_INCORRECT;

    this.criteres[attribute]!.valeur = value;
  }

  public abstract checkEvenement(meteo: Meteo): boolean;
}

export default aAlerte;