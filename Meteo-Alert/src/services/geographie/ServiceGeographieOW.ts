import lieuType from "../../models/types/lieuType";
import { creerKey } from "../../utils/LieuUtils";
import aRestService from "../aRestService";
import iServiceGeographie from "./iServiceGeographie";

type lieu_OW = {
  name: string;
  local_names?: {
    fr?: string;
    oc?: string;
  };
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export default class ServiceGeographieOW extends aRestService implements iServiceGeographie {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  public async rechercheLieux(nomLieu: string): Promise<lieuType[]> {
    // Implémente la méthode à partir d'une API REST
    const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;
    const limitApiResult = process.env.LIMIT_API_RESULT ?? 5;

    const urlLieux: string = `direct?q=${nomLieu}&limit=${limitApiResult}&appid=${openWeatherApiKey}`;
    const JSONdata: JSON = await this.get(urlLieux);
    const JSONlieux: lieu_OW[] = this.ajusterDonnees(JSONdata as any);

    const uniqueKeys = new Set<string>();
    const lieux: lieuType[] = [];

    JSONlieux.forEach(lieu => {
      const key = creerKey(lieu.name, lieu.state, lieu.country);

      if (!uniqueKeys.has(key)) {
        uniqueKeys.add(key);

        lieux.push({
          nom: lieu.name,
          lat: lieu.lat,
          lon: lieu.lon,
          region: lieu.state,
          pays: lieu.country,
          key: key,
          reglageAlerte: []
        });
      }
    });

    return lieux;
  }

  private ajusterDonnees(data: any): lieu_OW[] {
    const lieux: lieu_OW[] = [];
  
    // Supposant que data soit un tableau d'objets JSON
    if (Array.isArray(data)) {
      for (const lieuData of data) {
        lieux.push({
          name: lieuData.name || "",
          local_names: {
            fr: lieuData.local_names?.fr || "",
            oc: lieuData.local_names?.oc || ""
          },
          lat: lieuData.lat || 0,
          lon: lieuData.lon || 0,
          country: lieuData.country || "",
          state: lieuData.state || ""
        });
      }
    } else {
      lieux.push({
        name: data.name || "",
        local_names: {
          fr: data.local_names?.fr || "",
          oc: data.local_names?.oc || ""
        },
        lat: data.lat || 0,
        lon: data.lon || 0,
        country: data.country || "",
        state: data.state || ""
      });
    }
  
    return lieux;
  }
}