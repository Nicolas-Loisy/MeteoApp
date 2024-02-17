import ServiceCompteFirebase from "./ServiceCompteFirebase";
import iServiceCompte from "./iServiceCompte";

export default class ServiceCompteFactory {
  private constructor() {}
  
  private static readonly instance = new ServiceCompteFirebase();
  
  static getServiceCompte(): iServiceCompte {
    return ServiceCompteFactory.instance;
  }
}
