import dtUniteCoordonnee from "../../../models/datatype/unite/dtUniteCoordonnee";
import SystemeMesureEnum from "../../../models/enum/SystemeMesureEnum";
import meteoType from "../../../models/types/meteoType";

interface iServiceMeteo {
    getMeteo(longitude: dtUniteCoordonnee, latitude: dtUniteCoordonnee, units: SystemeMesureEnum): Promise<meteoType>;
}

export default iServiceMeteo;