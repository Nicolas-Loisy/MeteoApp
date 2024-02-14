import { langueDefaut, langues } from "../services/i18n/i18n";
import SystemeMesureEnum from "./enum/SystemeMesureEnum";
import reglagePersistence from "./types/pertistence/reglageAppPersistence";

class ReglageApp {
  private static instance: ReglageApp | null;

  private systemeMesure: SystemeMesureEnum;
  private langue: string;

  private constructor(reglagePersistence: reglagePersistence) {
    const systemeMesureDefaut: SystemeMesureEnum = process.env.REACT_APP_SYSTEME_MESURE_DEFAUT as SystemeMesureEnum ?? SystemeMesureEnum.METRIQUE;

    // Init système mesure
    const isSystemeMesureData = reglagePersistence.systemeMesure in SystemeMesureEnum;
    this.systemeMesure = 
      isSystemeMesureData ? 
      reglagePersistence.systemeMesure as SystemeMesureEnum : 
      systemeMesureDefaut;

    // Init langue
    const isLangueData = langues.includes(reglagePersistence.langue);
    this.langue = isLangueData ? 
      reglagePersistence.langue : 
      langueDefaut;
  }

  public static getInstance(reglagePersistence: reglagePersistence): ReglageApp {
    if (!ReglageApp.instance) {
      ReglageApp.instance = new ReglageApp(reglagePersistence);
    }
    return ReglageApp.instance;
  }

  public getSystemeMesure(): SystemeMesureEnum {
    return this.systemeMesure;
  }

  public setSystemeMesure(systemeMesure: SystemeMesureEnum): void {
    this.systemeMesure = systemeMesure;
  }

  public getLangue(): string {
    return this.langue;
  }

  public setLangue(langue: string): void {
    this.langue = langue;
  }
}

export default ReglageApp;