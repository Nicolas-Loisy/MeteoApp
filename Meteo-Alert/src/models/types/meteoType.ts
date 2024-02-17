type meteoType = {
    readonly neige: number;
    readonly pluie: number;
    readonly humidite: number;
    readonly visibilite: number;
    readonly ressenti: number;
    readonly temperature: number;
    readonly tempMin: number;
    readonly tempMax: number;
    readonly ventRafale: number;
    readonly ventVitesse: number;
    readonly ventDirection: number;
    readonly pression: number;
    readonly pressionTerre: number;
    readonly pressionMer: number;
    readonly nuage: number
}

export default meteoType;