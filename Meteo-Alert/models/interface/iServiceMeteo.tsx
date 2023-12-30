import UniteCoordonnee from "../datatype/UniteCoordonnee";
import SystemeMesure from "../enum/SystemeMesure";
import meteoData from "../types/meteoData";

interface iServiceMeteo {
    getMeteo(longitude: UniteCoordonnee, latitude: UniteCoordonnee, units: SystemeMesure): Promise<meteoData>;
}

export default iServiceMeteo;