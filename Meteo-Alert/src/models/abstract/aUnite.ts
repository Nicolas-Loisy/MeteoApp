import { t } from "i18next";
import UniteCoordonneeEnum from "../enum/UniteCoordonneeEnum";
import UniteDirectionEnum from "../enum/UniteDirectionEnum";
import UniteDistanceEnum from "../enum/UniteDistanceEnum";
import UnitePourcentageEnum from "../enum/UnitePourcentageEnum";
import UnitePressionEnum from "../enum/UnitePressionEnum";
import UniteTailleEnum from "../enum/UniteTailleEnum";
import UniteTempEnum from "../enum/UniteTempEnum";
import UniteVitesseEnum from "../enum/UniteVitesseEnum";
import iUnite from "../interface/iUnite";

abstract class aUnite implements iUnite{
    valeur: number;
    unite: 
        UniteCoordonneeEnum | 
        UniteDirectionEnum | 
        UniteDistanceEnum | 
        UnitePourcentageEnum | 
        UnitePressionEnum | 
        UniteTailleEnum | 
        UniteTempEnum | 
        UniteVitesseEnum
    ;
    constructor(
        valeur: number, 
        unite: 
            UniteCoordonneeEnum | 
            UniteDirectionEnum | 
            UniteDistanceEnum | 
            UnitePourcentageEnum | 
            UnitePressionEnum | 
            UniteTailleEnum | 
            UniteTempEnum | 
            UniteVitesseEnum
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