import ServicePersistenceFirebase from "./ServicePersistenceFirebase";
import iServicePersistence from "./iServicePersistence";

class ServicePersistenceFactory {
  private static instance = new ServicePersistenceFirebase();
  
  static getServicePersistence(): iServicePersistence {
    return ServicePersistenceFactory.instance;
  }
}

export default ServicePersistenceFactory;