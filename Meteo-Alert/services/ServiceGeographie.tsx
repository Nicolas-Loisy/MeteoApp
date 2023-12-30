import aRestService from "../models/abstract/aRestService";
import JSONObject from "../models/interface/JSONObject";
import iServiceGeographie from "../models/interface/iServiceGeographie";

export default class ServiceGeographie extends aRestService implements iServiceGeographie {
    constructor(baseUrl: string) {
      super(baseUrl);
    }
  
    public async rechercheLieux(nomLieu: string): Promise<JSONObject> {
      // Implemente la méthode a partir d'une API REST
      const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY ?? "";
      const limitApiResult = process.env.LIMIT_API_RESULT ?? 5;
      
      const urlLieux: string = `direct?q=${nomLieu}&limit=${limitApiResult}&appid=${openWeatherApiKey}`;
      return await this.get(urlLieux);
    }
}