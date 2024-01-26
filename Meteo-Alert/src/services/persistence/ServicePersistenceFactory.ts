import ServicePersistenceFirebase from "./ServicePersistenceFirebase";

class ServicePersistenceFactory {
  private static instance = new ServicePersistenceFirebase();
  
  static getServicePersistence(): iServicePersistence {
    return ServicePersistenceFactory.instance;
  }
}

export default ServicePersistenceFactory;