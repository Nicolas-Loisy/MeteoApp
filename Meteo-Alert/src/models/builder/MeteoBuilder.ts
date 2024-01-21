import ServiceMeteo from "../../services/ServiceMeteoOW";
import UniteCoordonnee from "../datatype/dtUniteCoordonnee";
import SystemeMesureEnum from "../enum/SystemeMesureEnum";
import meteoData from "../types/meteoData";
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

    public async getMeteo(longitude: UniteCoordonnee, latitude: UniteCoordonnee, units: SystemeMesureEnum = SystemeMesureEnum.METRIQUE): Promise<Meteo> {
        const jsonMeteoData: meteoData = await this.serviceMeteo.getMeteo(longitude, latitude, units);

        const meteo: Meteo = new Meteo(
            units,
            jsonMeteoData
        );
        return meteo;
    }
}

export default MeteoBuilder;