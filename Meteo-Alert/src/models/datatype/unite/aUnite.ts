import { t } from "i18next";
import UniteCoordonneeEnum from "../../enum/unite/UniteCoordonneeEnum";
import UniteDirectionEnum from "../../enum/unite/UniteDirectionEnum";
import UniteDistanceEnum from "../../enum/unite/UniteDistanceEnum";
import UnitePourcentageEnum from "../../enum/unite/UnitePourcentageEnum";
import UnitePressionEnum from "../../enum/unite/UnitePressionEnum";
import UniteTailleEnum from "../../enum/unite/UniteTailleEnum";
import UniteTempEnum from "../../enum/unite/UniteTempEnum";
import UniteVitesseEnum from "../../enum/unite/UniteVitesseEnum";
import iUnite from "./iUnite";

abstract class aUnite implements iUnite {
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