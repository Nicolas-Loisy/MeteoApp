import lieuData from "../types/lieuData";

interface iServiceGeographie {
    rechercheLieux(nomLieu: string): Promise<lieuData[]>;
}

export default iServiceGeographie;