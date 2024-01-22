import LangueEnum from "./enum/LangueEnum";
import SystemeMesureEnum from "./enum/SystemeMesureEnum";

class ReglageApp {
    private static instance: ReglageApp | null;
  
    private systemeMesure: SystemeMesureEnum = SystemeMesureEnum.METRIQUE;
    private langue: LangueEnum = LangueEnum.Francais;
  
    private constructor() {}
  
    public static getInstance(): ReglageApp {
      if (!ReglageApp.instance) {
        ReglageApp.instance = new ReglageApp();
      }
      return ReglageApp.instance;
    }
  
    public getSystemeMesure(): SystemeMesureEnum {
      return this.systemeMesure;
    }
  
    public setSystemeMesure(systemeMesure: SystemeMesureEnum): void {
      this.systemeMesure = systemeMesure;
    }
  
    public getLangue(): LangueEnum {
      return this.langue;
    }
  
    public setLangue(langue: LangueEnum): void {
      this.langue = langue;
    }
}

export default ReglageApp;