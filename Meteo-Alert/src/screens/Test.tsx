import React, { useEffect, useState } from "react";
import LayoutTemplate from "../components/organisms/LayoutTemplate";
import { Text } from 'react-native';
import Button from "../components/atoms/Button";


class UtilisateurTest {
  private name: string;
  private numberList: number[];

  constructor(name: string) {
    this.name = name;
    this.numberList = [];
  }

  public getName(): string {
    return this.name;
  }

  public getNumberList(): ReadonlyArray<number> {
    return this.numberList;
  }

  public addToNumberList(value: number): void {
    this.numberList = [...this.numberList, value];
  }
}

const Test = () => {
  const [utilisateur, setUtilisateur] = useState<UtilisateurTest>(new UtilisateurTest("UtilisateurTest"));
  const [numberList, setNumberList] = useState(utilisateur.getNumberList());

  useEffect(() => {
    console.log("Chargement de la page de test\n");
  }, []);

  useEffect(() => {
    console.log(numberList);
  }, [numberList]);  

  const addToNumberList = () => {
    utilisateur.addToNumberList(1);
    setNumberList(utilisateur.getNumberList()); // Mettre à jour la liste de nombres actuelle
  };

  return (
    <LayoutTemplate>
      <Text>Page de tests</Text>

      <Button
        onPress={addToNumberList}
        title={"UtilisateurArray +1"}
      />
      <Button
        onPress={() => console.log(numberList)}
        title={"Voir UtilisateurArray"}
      />
    </LayoutTemplate>
  );
};

export default Test;
