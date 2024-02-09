import iAlerte from "../../services/alertes/iAlerte";

type lieuType = {
    key: string,
    nom: string,
    lat: number,
    lon: number,
    pays: string,
    region: string,
    reglageAlerte: Readonly<iAlerte[]>;
}

export default lieuType;