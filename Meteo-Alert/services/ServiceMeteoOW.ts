import aRestService from "../models/abstract/aRestService";
import UniteCoordonnee from "../models/datatype/UniteCoordonnee";
import SystemeMesure from "../models/enum/SystemeMesure";
import iServiceMeteo from "../models/interface/iServiceMeteo";
import meteoData from "../models/types/meteoData";

type JSON_OW = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
  snow?: {
    "1h"?: number;
    "3h"?: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export default class ServiceMeteoOW extends aRestService implements iServiceMeteo {
    constructor(baseUrl: string) {
      super(baseUrl);
    }
  
    public async getMeteo(longitude: UniteCoordonnee, latitude: UniteCoordonnee, units: SystemeMesure): Promise<meteoData> {
      // Implemente la méthode a partir d'une API REST
      const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY ?? "";
      const urlMeteo: string = `/weather?lat=${latitude.getValeur()}&lon=${longitude.getValeur()}&appid=${openWeatherApiKey}&units=${units}`;
      const JSONdata = await this.get(urlMeteo) as unknown as JSON_OW;

      const meteo: meteoData = {
        neige: JSONdata.snow && JSONdata.snow["1h"] ? JSONdata.snow["1h"] : 0,
        pluie: JSONdata.rain && JSONdata.rain["1h"] ? JSONdata.rain["1h"] : 0,
        humidite: JSONdata.main.humidity,
        visibilite: JSONdata.visibility,
        ressenti: JSONdata.main.feels_like,
        temperature: JSONdata.main.temp,
        tempMin: JSONdata.main.temp_min,
        tempMax: JSONdata.main.temp_max,
        ventRafale: JSONdata.wind.gust,
        ventVitesse: JSONdata.wind.speed,
        ventDirection: JSONdata.wind.deg,
        pression: JSONdata.main.pressure,
        pressionTerre: JSONdata.main.grnd_level,
        pressionMer: JSONdata.main.sea_level,
        nuage: JSONdata.clouds.all
      }

      return meteo;
    }
}