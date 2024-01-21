import { t } from "i18next";
import UniteMesureCoordonnee from "../enum/UniteCoordonneeEnum";
import UniteMesureDirection from "../enum/UniteDirectionEnum";
import UniteMesureDistance from "../enum/UniteDistanceEnum";
import UniteMesurePourcentage from "../enum/UnitePourcentageEnum";
import UniteMesurePression from "../enum/UnitePressionEnum";
import UniteMesureTaille from "../enum/UniteTailleEnum";
import UniteMesureTemp from "../enum/UniteTempEnum";
import UniteMesureVitesse from "../enum/UniteVitesseEnum";
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