import ServiceCompteFirebase from "./ServiceCompteFirebase";
import iServiceCompte from "./IServiceCompte";

export default class ServiceCompteFactory {
  private static instance = new ServiceCompteFirebase();
  
  static getServiceCompte(): iServiceCompte {
    return ServiceCompteFactory.instance;
  }
}
