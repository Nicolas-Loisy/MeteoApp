import UniteCoordonneeEnum from "../../enum/unite/UniteCoordonneeEnum";
import UniteDirectionEnum from "../../enum/unite/UniteDirectionEnum";
import UniteDistanceEnum from "../../enum/unite/UniteDistanceEnum";
import UnitePourcentageEnum from "../../enum/unite/UnitePourcentageEnum";
import UnitePressionEnum from "../../enum/unite/UnitePressionEnum";
import UniteTailleEnum from "../../enum/unite/UniteTailleEnum";
import UniteTempEnum from "../../enum/unite/UniteTempEnum";
import UniteVitesseEnum from "../../enum/unite/UniteVitesseEnum";

interface iUnite {
    unite: 
        UniteTempEnum | 
        UniteVitesseEnum | 
        UniteCoordonneeEnum | 
        UnitePourcentageEnum | 
        UniteTailleEnum | 
        UnitePressionEnum | 
        UniteDirectionEnum | 
        UniteDistanceEnum
    ;
    
    getValeur(): number;
    setValeur(valeur: number): void;
}

export default iUnite;