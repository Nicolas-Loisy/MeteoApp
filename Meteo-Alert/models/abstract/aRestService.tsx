class aRestService {
    private baseUrl: string;
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    public get(url: string): Promise<Response> {
      return new Promise((resolve) => {
        fetch(`${this.baseUrl}${url}`)
          .then((response) => response.json())
          .then((json) => resolve(json));
      });
    }
}