import ServiceMeteo from "../../services/api/meteoAPI/ServiceMeteoOW";
import dtUniteCoordonnee from "../datatype/unite/dtUniteCoordonnee";
import SystemeMesureEnum from "../enum/SystemeMesureEnum";
import meteoType from "../types/meteoType";
import Meteo from "../valueObject/Meteo";  

class MeteoBuilder {

    private static instance: MeteoBuilder | null = null;
    private serviceMeteo: ServiceMeteo;

    private constructor(serviceMeteo: ServiceMeteo) {
        this.serviceMeteo = serviceMeteo;
    }

    public static getInstance(): MeteoBuilder {
        if (!MeteoBuilder.instance) {
            MeteoBuilder.instance = new MeteoBuilder(new ServiceMeteo(process.env.OPEN_WEATHER_API_URL ?? ""));
        }
        return MeteoBuilder.instance;
    }

    public async getMeteo(longitude: dtUniteCoordonnee, latitude: dtUniteCoordonnee, units: SystemeMesureEnum = SystemeMesureEnum.METRIQUE): Promise<Meteo> {
        const jsonMeteoData: meteoType = await this.serviceMeteo.getMeteo(longitude, latitude, units);

        const meteo: Meteo = new Meteo(
            units,
            jsonMeteoData
        );
        return meteo;
    }
}

export default MeteoBuilder;