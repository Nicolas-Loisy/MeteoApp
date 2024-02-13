import ServiceGeographieOW from "./ServiceGeographieOW";
import iServiceGeographie from "./iServiceGeographie";

export default class ServiceGeographieFactory {
  private constructor() {};

  private static instance = new ServiceGeographieOW(process.env.OPEN_GEO_API_URL!);
  
  static getServiceGeographie(): iServiceGeographie {
    return ServiceGeographieFactory.instance;
  }
}
