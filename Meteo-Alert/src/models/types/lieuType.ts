import iAlerte from "../../services/alertes/iAlerte";

type lieuType = {
    readonly key: string,
    readonly nom: string,
    readonly lat: number,
    readonly lon: number,
    readonly pays: string,
    readonly region: string,
    readonly reglageAlerte: Readonly<iAlerte[]>;
}

export default lieuType;