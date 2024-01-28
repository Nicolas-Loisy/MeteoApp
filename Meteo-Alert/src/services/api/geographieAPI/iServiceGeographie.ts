import lieuType from "../../../models/types/lieuType";

interface iServiceGeographie {
    rechercheLieux(nomLieu: string): Promise<lieuType[]>;
}

export default iServiceGeographie;