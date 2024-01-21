import UniteCoordonneeEnum from "../enum/UniteCoordonneeEnum";
import UniteDirectionEnum from "../enum/UniteDirectionEnum";
import UniteDistanceEnum from "../enum/UniteDistanceEnum";
import UnitePourcentageEnum from "../enum/UnitePourcentageEnum";
import UnitePressionEnum from "../enum/UnitePressionEnum";
import UniteTailleEnum from "../enum/UniteTailleEnum";
import UniteTempEnum from "../enum/UniteTempEnum";
import UniteVitesseEnum from "../enum/UniteVitesseEnum";

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