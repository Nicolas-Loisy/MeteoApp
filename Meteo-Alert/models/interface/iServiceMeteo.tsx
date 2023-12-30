import UniteCoordonnee from "../datatype/UniteCoordonnee";
import SystemeMesure from "../enum/SystemeMesure";
import JSONObject from "./JSONObject";

interface iServiceMeteo {
    getMeteo(longitude: UniteCoordonnee, latitude: UniteCoordonnee, units: SystemeMesure): Promise<JSONObject>;
}

export default iServiceMeteo;