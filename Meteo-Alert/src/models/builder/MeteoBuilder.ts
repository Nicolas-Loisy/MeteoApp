import ServiceMeteo from "../../services/api/meteoAPI/ServiceMeteoOW";
import dtUniteCoordonnee from "../datatype/unite/dtUniteCoordonnee";
import SystemeMesureEnum from "../enum/SystemeMesureEnum";
import meteoType from "../types/meteoType";
import Meteo from "../valueObject/Meteo";  

class MeteoBuilder {
    private constructor() {}

    private static serviceMeteo: ServiceMeteo = new ServiceMeteo(process.env.OPEN_WEATHER_API_URL!);

    public static async getMeteo(longitude: dtUniteCoordonnee, latitude: dtUniteCoordonnee, units: SystemeMesureEnum): Promise<Meteo> {
        const jsonMeteoData: meteoType = await MeteoBuilder.serviceMeteo.getMeteo(longitude, latitude, units);

        const meteo: Meteo = new Meteo(
            units,
            jsonMeteoData
        );
        return meteo;
    }
}

export default MeteoBuilder;