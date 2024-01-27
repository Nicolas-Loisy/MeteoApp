import AlertePrecipitation from "./AlertePrecipitation";
import iAlerte from "./iAlerte";

class AlerteFactory {
  private constructor(){}
  
  static initAlertes(): iAlerte[] {
    const alertes: iAlerte[] = [];

    alertes.push(new AlertePrecipitation());
    return alertes;
  }
}

export default AlerteFactory;