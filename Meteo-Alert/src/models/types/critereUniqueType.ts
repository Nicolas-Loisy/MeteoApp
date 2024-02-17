import UniteCoordonneeEnum from "../enum/unite/UniteCoordonneeEnum";
import UniteDirectionEnum from "../enum/unite/UniteDirectionEnum";
import UnitePourcentageEnum from "../enum/unite/UnitePourcentageEnum";
import UnitePressionEnum from "../enum/unite/UnitePressionEnum";
import UniteTailleEnum from "../enum/unite/UniteTailleEnum";
import UniteTempEnum from "../enum/unite/UniteTempEnum";
import UniteVitesseEnum from "../enum/unite/UniteVitesseEnum";
import operateurComparaisonType from "./operateurComparaisonType";

type critereUniqueType = {
  valeur: number;
  operateurComparaison: operateurComparaisonType;
  uniteMesure: UniteCoordonneeEnum |UniteDirectionEnum | UniteDirectionEnum | UnitePourcentageEnum | UnitePressionEnum | UniteTailleEnum | UniteTempEnum | UniteVitesseEnum,
}

export default critereUniqueType;