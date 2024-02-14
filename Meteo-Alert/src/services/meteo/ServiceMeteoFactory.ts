import ServiceMeteoOW from "./ServiceMeteoOW";
import iServiceMeteo from "./iServiceMeteo";

class ServiceMeteoFactory {
  private constructor() {};

  private static readonly instance: iServiceMeteo = new ServiceMeteoOW(process.env.OPEN_WEATHER_API_URL!);

  static getServiceMeteo(): iServiceMeteo {
    return ServiceMeteoFactory.instance;
  }
}

export default ServiceMeteoFactory;