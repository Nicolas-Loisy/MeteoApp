import dtUniteCoordonnee from "../datatype/dtUniteCoordonnee";
import SystemeMesureEnum from "../enum/SystemeMesureEnum";
import meteoType from "../types/meteoType";

interface iServiceMeteo {
    getMeteo(longitude: dtUniteCoordonnee, latitude: dtUniteCoordonnee, units: SystemeMesureEnum): Promise<meteoType>;
}

export default iServiceMeteo;