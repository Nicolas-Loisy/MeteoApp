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

    public async getMeteo(longitude: UniteCoordonnee, latitude: UniteCoordonnee, units: SystemeMesure): Promise<Meteo> {
        const meteoData = await this.serviceMeteo.getMeteo(longitude, latitude, units);
        const jsonMeteoData = await meteoData.json();

        const meteo: Meteo = new Meteo(
            units,
            jsonMeteoData.snow['1h'] ?? 0, // neige si 0 null
            jsonMeteoData.rain['1h'] ?? 0, // quantité de pluie tombée au cours des 1 dernières heures si 0 null
            jsonMeteoData.main.humidity, // humidité
            jsonMeteoData.visibility, // visibilité
            jsonMeteoData.main.feels_like, // ressenti
            jsonMeteoData.main.temp, // température
            jsonMeteoData.main.temp_min, // température minimale
            jsonMeteoData.main.temp_max, // température maximale
            jsonMeteoData.wind.gust ?? 0, // rafale du vent si 0 null
            jsonMeteoData.wind.speed, // vitesse du vent
            jsonMeteoData.wind.deg, // direction du vent
            jsonMeteoData.main.pressure, // pression
            jsonMeteoData.main.sea_level ?? 0, // pression Terre si 0 null
            jsonMeteoData.main.grnd_level ?? 0, // pression Mer si 0 null
            jsonMeteoData.clouds.all, // nuage
        );
        return meteo;
    }
}