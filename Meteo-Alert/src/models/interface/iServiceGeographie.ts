import lieuType from "../types/lieuType";

interface iServiceGeographie {
    rechercheLieux(nomLieu: string): Promise<lieuType[]>;
}

export default iServiceGeographie;