import UniteMesureCoordonnee from "../enum/UniteMesureCoordonnee";
import UniteMesureDirection from "../enum/UniteMesureDirection";
import UniteMesureDistance from "../enum/UniteMesureDistance";
import UniteMesurePourcentage from "../enum/UniteMesurePourcentage";
import UniteMesurePression from "../enum/UniteMesurePression";
import UniteMesureTaille from "../enum/UniteMesureTaille";
import UniteMesureTemp from "../enum/UniteMesureTemp";
import UniteMesureVitesse from "../enum/UniteMesureVitesse";

interface iUnite {
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
    
    getValeur(): number;
    setValeur(valeur: number): void;
}

export default iUnite;