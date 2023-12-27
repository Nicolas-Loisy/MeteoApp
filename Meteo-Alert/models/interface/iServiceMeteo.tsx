import UniteCoordonnee from "../datatype/UniteCoordonnee";
import SystemeMesure from "../enum/SystemeMesure";

interface iServiceMeteo {
    getMeteo(longitude: UniteCoordonnee, latitude: UniteCoordonnee, units: SystemeMesure): Promise<Response>;
}

export default iServiceMeteo;