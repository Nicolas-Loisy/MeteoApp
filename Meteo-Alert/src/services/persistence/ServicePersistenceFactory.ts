import ServicePersistenceFirebase from "./ServicePersistenceFirebase";
import iServicePersistence from "./iServicePersistence";

class ServicePersistenceFactory {
  private constructor() {}
  private static readonly instance = new ServicePersistenceFirebase();
  
  static getServicePersistence(): iServicePersistence {
    return ServicePersistenceFactory.instance;
  }
}

export default ServicePersistenceFactory;