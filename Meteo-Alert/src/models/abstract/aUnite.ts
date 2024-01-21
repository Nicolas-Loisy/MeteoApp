import { t } from "i18next";
import UniteMesureCoordonnee from "../enum/UniteMesureCoordonnee";
import UniteMesureDirection from "../enum/UniteMesureDirection";
import UniteMesureDistance from "../enum/UniteMesureDistance";
import UniteMesurePourcentage from "../enum/UniteMesurePourcentage";
import UniteMesurePression from "../enum/UniteMesurePression";
import UniteMesureTaille from "../enum/UniteMesureTaille";
import UniteMesureTemp from "../enum/UniteMesureTemp";
import UniteMesureVitesse from "../enum/UniteMesureVitesse";
import iUnite from "../interface/iUnite";

abstract class aUnite implements iUnite{
    valeur: number;
    unite: 
        UniteMesureTemp | 
        UniteMesureVitesse | 
        UniteMesureCoordonnee | 
        UniteMesurePourcentage | 
        UniteMesureTaille | 
        UniteMesurePression | 
        UniteMesureDirection | 
        UniteMesureDistance
    ;
    constructor(
        valeur: number, 
        unite: 
            UniteMesureTemp | 
            UniteMesureVitesse | 
            UniteMesureCoordonnee | 
            UniteMesurePourcentage | 
            UniteMesureTaille | 
            UniteMesurePression | 
            UniteMesureDirection | 
            UniteMesureDistance
    ) {
        this.valeur = valeur;
        this.unite = unite;
    }

    getValeur(): number {
        return this.valeur;
    }

    setValeur(valeur: number): void {
        this.valeur = valeur;
    }
    
    public toString(): string {
        if (this.valeur != undefined) {
            return `${this.valeur} ${this.unite}`;
        } else {
            return t("aUnite.mesure-undefined");
        }
    }
}

export default aUnite;