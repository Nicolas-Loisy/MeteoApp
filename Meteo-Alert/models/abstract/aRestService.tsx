class aRestService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async get(url: string): Promise<JSON> {
    const response = await fetch(`${this.baseUrl}/${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseJson = await response.json();
    return responseJson;
  }
}

export default aRestService;