import { langueDefaut, langues } from "../services/i18n/i18n";
import SystemeMesureEnum from "./enum/SystemeMesureEnum";
import langueType from "./types/langueType";
import reglageAppData from "./types/pertistence/reglageAppData";
class ReglageApp {
  private static instance: ReglageApp | null;

  private systemeMesure: SystemeMesureEnum;
  private langue: langueType;

  private constructor(reglageAppData?: reglageAppData) {
    // Init système mesure
    const isSystemeMesureData = reglageAppData && reglageAppData.systemeMesure in SystemeMesureEnum;
    this.systemeMesure = 
      isSystemeMesureData ? 
      SystemeMesureEnum[reglageAppData.systemeMesure as keyof typeof SystemeMesureEnum] : 
      SystemeMesureEnum.METRIQUE

    // Init langue
    const isLangueData = reglageAppData && langues.includes(reglageAppData.langue);
    this.langue =  isLangueData ? 
      reglageAppData.langue : 
      langueDefaut;
  }

  public static getInstance(reglageAppData?: reglageAppData): ReglageApp {
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

  public setLangue(langue: langueType): void {
    this.langue = langue;
  }
}

export default ReglageApp;