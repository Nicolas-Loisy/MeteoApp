import ServiceMeteo from "../../services/ServiceMeteo";
import UniteCoordonnee from "../datatype/UniteCoordonnee";
import SystemeMesure from "../enum/SystemeMesure";
import JSONObject from "../interface/JSONObject";
import JSONSpecificNumberKey from "../interface/JSONSpecificNumberKey";
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

    public async getMeteo(longitude: UniteCoordonnee, latitude: UniteCoordonnee, units: SystemeMesure = SystemeMesure.Metrique): Promise<Meteo> {
        const jsonMeteoData: JSONObject = await this.serviceMeteo.getMeteo(longitude, latitude, units);

        const formatJson: {
            snow: JSONSpecificNumberKey | null;
            rain: JSONSpecificNumberKey | null;
            main: JSONObject | null;
            visibility: JSONObject | null;
            wind: JSONObject | null;
            clouds: JSONObject | null;
        } = {
            snow: jsonMeteoData.snow ? jsonMeteoData.snow as JSONSpecificNumberKey : null,
            rain: jsonMeteoData.rain ? jsonMeteoData.rain as JSONSpecificNumberKey : null,
            main: jsonMeteoData.main ? jsonMeteoData.main as JSONObject : null,
            visibility: jsonMeteoData.visibility ? jsonMeteoData.visibility as JSONObject : null,
            wind: jsonMeteoData.wind ? jsonMeteoData.wind as JSONObject : null,
            clouds: jsonMeteoData.clouds ? jsonMeteoData.clouds as JSONObject : null,
        };

        const meteo: Meteo = new Meteo(
            units,
            formatJson.snow ? Number(formatJson.snow['1h']) : 0, // Neige si 0, sinon la valeur de '1h' ou 0
            formatJson.rain ? Number(formatJson.rain['1h']) : 0, // Quantité de pluie tombée au cours des 1 dernières heures si 0, sinon la valeur de '1h' ou 0
            formatJson.main ? Number(formatJson.main['humidity']) : 0, // Humidité ou 0
            formatJson.visibility ? Number(formatJson.visibility) : 0, // Visibilité ou 0
            formatJson.main ? Number(formatJson.main['feels_like']) : 0, // Ressenti ou 0
            formatJson.main ? Number(formatJson.main['temp']) : 0, // Température ou 0
            formatJson.main ? Number(formatJson.main['temp_min']) : 0, // Température minimale ou 0
            formatJson.main ? Number(formatJson.main['temp_max']) : 0, // Température maximale ou 0
            formatJson.wind ? Number(formatJson.wind['gust']) : 0, // Rafale du vent si 0, sinon la valeur de 'gust' ou 0
            formatJson.wind ? Number(formatJson.wind['speed']) : 0, // Vitesse du vent ou 0
            formatJson.wind ? Number(formatJson.wind['deg']) : 0, // Direction du vent ou 0
            formatJson.main ? Number(formatJson.main['pressure']) : 0, // Pression ou 0
            formatJson.main ? Number(formatJson.main['sea_level']) : 0, // Pression Terre si 0, sinon la valeur de 'sea_level' ou 0
            formatJson.main ? Number(formatJson.main['grnd_level']) : 0, // Pression Mer si 0, sinon la valeur de 'grnd_level' ou 0
            formatJson.clouds ? Number(formatJson.clouds['all']) : 0, // Nuage ou 0
        );
        return meteo;
    }
}

export default MeteoBuilder;