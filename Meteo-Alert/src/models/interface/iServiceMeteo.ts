import UniteCoordonnee from "../datatype/dtUniteCoordonnee";
import SystemeMesureEnum from "../enum/SystemeMesureEnum";
import meteoData from "../types/meteoData";

interface iServiceMeteo {
    getMeteo(longitude: UniteCoordonnee, latitude: UniteCoordonnee, units: SystemeMesureEnum): Promise<meteoData>;
}

export default iServiceMeteo;