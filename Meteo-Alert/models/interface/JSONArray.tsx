import JSONObject from "./JSONObject";
import JSONSpecificNumberKey from "./JSONSpecificNumberKey";

export default interface JSONArray extends Array<string | number | boolean | null | JSONObject | JSONArray | JSONSpecificNumberKey> {}