import { langueDefaut, langues } from "../services/i18n/i18n";
import SystemeMesureEnum from "./enum/SystemeMesureEnum";
import reglageAppData from "./types/pertistence/reglageAppData";
class ReglageApp {
  private static instance: ReglageApp | null;

  private systemeMesure: SystemeMesureEnum;
  private langue: string;

  private constructor(reglageAppData: reglageAppData) {
    const systemeMesureDefaut: SystemeMesureEnum = process.env.REACT_APP_SYSTEME_MESURE_DEFAUT as SystemeMesureEnum ?? SystemeMesureEnum.METRIQUE;

    // Init système mesure
    const isSystemeMesureData = reglageAppData.systemeMesure in SystemeMesureEnum;
    this.systemeMesure = 
      isSystemeMesureData ? 
      reglageAppData.systemeMesure as SystemeMesureEnum : 
      systemeMesureDefaut;

    // Init langue
    const isLangueData = langues.includes(reglageAppData.langue);
    this.langue = isLangueData ? 
      reglageAppData.langue : 
      langueDefaut;
  }

  public static getInstance(reglageAppData: reglageAppData): ReglageApp {
    if (!ReglageApp.instance) {
      ReglageApp.instance = new ReglageApp(reglageAppData);
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