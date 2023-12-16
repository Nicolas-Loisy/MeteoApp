class ServiceGeographie extends aRestService implements iServiceGeographie {
    constructor(baseUrl: string) {
      super(baseUrl);
    }
  
    public async rechercheLieux(nomLieu: string): Promise<Response> {
      // Implemente la méthode a partir d'une API REST
      const urlLieux: string = `/search?q=${nomLieu}`;
      const lieux: Response = await this.get(urlLieux);
      return lieux;
    }
}