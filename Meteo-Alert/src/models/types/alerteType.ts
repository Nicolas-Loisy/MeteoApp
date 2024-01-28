import EvenementEnum from "../enum/EvenementEnum";
import critereKeys from "./critereKeys";
import critereType from "./critereType";

export type alerteType = {
  typeEvenement: EvenementEnum;
  isActiver: boolean;
  criteres: Partial<{
    [K in keyof critereType<critereKeys>]: number;
  }>;
}
