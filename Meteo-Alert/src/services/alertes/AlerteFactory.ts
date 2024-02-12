import meteoType from "../../models/types/meteoType";
import reglageAlertePersistence from "../../models/types/pertistence/reglageAlertePersistence";
import AlertePrecipitation from "./AlertePrecipitation";
import iAlerte from "./iAlerte";

class AlerteFactory {
  private constructor() {}

  public static initAlertes(): iAlerte[] {
    const alertes: iAlerte[] = [];
    alertes.push(new AlertePrecipitation());

    return alertes;
  }

  public static initAlertesFromData(alertesData: reglageAlertePersistence): iAlerte[] {
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