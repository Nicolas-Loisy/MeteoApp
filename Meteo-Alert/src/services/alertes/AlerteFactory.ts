import meteoType from "../../models/types/meteoType";
import reglageAlerteDataType from "../../models/types/pertistence/reglageAlerteData";
import AlertePrecipitation from "./AlertePrecipitation";
import AlerteTemperatureExtremeBasse from "./AlerteTemperatureExtremeBasse";
import AlerteTemperatureExtremeHaute from "./AlerteTemperatureExtremeHaute";
import AlerteVentViolent from "./AlerteVentViolent";
import AlerteVisibiliteReduite from "./AlerteVisibiliteReduite";
import iAlerte from "./iAlerte";

class AlerteFactory {
  private constructor() {}

  public static initAlertes(): iAlerte[] {
    const alertes: iAlerte[] = [];
    alertes.push(new AlertePrecipitation());
    alertes.push(new AlerteTemperatureExtremeBasse());
    alertes.push(new AlerteTemperatureExtremeHaute());
    alertes.push(new AlerteVentViolent());
    alertes.push(new AlerteVisibiliteReduite());

    return alertes;
  }

  public static initAlertesFromData(alertesData: reglageAlerteDataType): iAlerte[] {
    // Création des alertes
    const alertes: iAlerte[] = this.initAlertes();

    // Modification des valeurs de critères selon les données de la BDD
    alertes.forEach((alerte: iAlerte) => {
      const alerteData = alertesData[alerte.typeEvenement];

      if (alerteData) {
        alerte.isActiver = alerteData.isActiver;
        const criteres = alerte.getCritere();

        Object.keys(criteres).forEach((key) => {
          const keyTyped = key as keyof meteoType;
          const critereData = alerteData.criteres[keyTyped];

          if(critereData) {
            alerte.setSeuilPersonnalise(keyTyped, critereData);
          }
        })
      }
      
    });
  
    return alertes;
  }  
}

export default AlerteFactory;