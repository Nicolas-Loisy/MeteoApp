class Lieu {
    // private alertes: List<ReglageAlerte> = [];
    private readonly nom: string;
    private readonly longitude: UniteCoordonnee;
    private readonly latitude: UniteCoordonnee;
    private meteo: Meteo | null;
  
    constructor(
        nom: string,
        longitude: UniteCoordonnee,
        latitude: UniteCoordonnee
    ) {
        this.nom = nom;
        this.longitude = longitude;
        this.latitude = latitude;
        this.meteo = null;
    }
      
    // getAlertes(): List<ReglageAlerte> {
    //   return this.alertes;
    // }
  
    getNom(): string {
      return this.nom;
    }
  
    getLongitude(): UniteCoordonnee {
      return this.longitude;
    }
  
    getLatitude(): UniteCoordonnee {
      return this.latitude;
    }

    updateMeteo() {
        const meteoBuilder = MeteoBuilder.getInstance();
        const meteoPromise = meteoBuilder.getMeteo(this.longitude, this.latitude);
    
        meteoPromise
            .then((meteo) => {
                this.meteo = meteo;
            })
            .catch(error => {
                console.error(error);
            })
        ;
    }

    getMeteo(): Meteo {
        this.updateMeteo();
        if (!this.meteo) {
          throw new Error("Meteo data is not available yet");
        }
        return this.meteo;
    }
}
  