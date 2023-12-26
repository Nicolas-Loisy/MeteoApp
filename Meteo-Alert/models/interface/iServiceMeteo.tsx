interface iServiceMeteo {
    getMeteo(longitude: UniteCoordonnee, latitude: UniteCoordonnee, units: SystemeMesure): Promise<Response>;
}