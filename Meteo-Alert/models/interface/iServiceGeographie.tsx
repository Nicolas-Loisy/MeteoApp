import JSONObject from "./JSONObject";

interface iServiceGeographie {
    rechercheLieux(nomLieu: string): Promise<JSONObject>;
}

export default iServiceGeographie;