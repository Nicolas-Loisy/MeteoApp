class ServiceMeteo extends aRestService {
    constructor(baseUrl: string) {
      super(baseUrl);
    }
  
    public async getMeteo(longitude: UniteCoordonnee, latitude: UniteCoordonnee): Promise<Response> {
      // Implemente la méthode a partir d'une API REST
      const urlMeteo: string = `/weather?q=${longitude.getValeur()},${latitude.getValeur()}`;
      const meteo: Response = await this.get(urlMeteo);
      return meteo;
    }
}