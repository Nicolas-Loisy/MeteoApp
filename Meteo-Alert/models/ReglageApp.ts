import Langue from "./enum/Langue";
import SystemeMesure from "./enum/SystemeMesure";

class ReglageApp {
    private static instance: ReglageApp | null;
  
    private systemeMesure: SystemeMesure = SystemeMesure.METRIQUE;
    private langue: Langue = Langue.Francais;
  
    private constructor() {}
  
    public static getInstance(): ReglageApp {
      if (!ReglageApp.instance) {
        ReglageApp.instance = new ReglageApp();
      }
      return ReglageApp.instance;
    }
  
    public getSystemeMesure(): SystemeMesure {
      return this.systemeMesure;
    }
  
    public setSystemeMesure(systemeMesure: SystemeMesure): void {
      this.systemeMesure = systemeMesure;
    }
  
    public getLangue(): Langue {
      return this.langue;
    }
  
    public setLangue(langue: Langue): void {
      this.langue = langue;
    }
}

export default ReglageApp;