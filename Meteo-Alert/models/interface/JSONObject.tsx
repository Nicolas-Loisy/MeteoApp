import JSONArray from "./JSONArray";
import JSONSpecificNumberKey from "./JSONSpecificNumberKey";

export default interface JSONObject {
    [key: string]: string | number | boolean | null | JSONObject | JSONArray | JSONSpecificNumberKey;
}