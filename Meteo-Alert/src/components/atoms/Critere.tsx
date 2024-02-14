import React, { useEffect, useState } from "react";
import { Text, StyleSheet, TextInput } from 'react-native';
import operateurComparaisonType from "../../models/types/operateurComparaisonType";

interface Props {
  readonly label: string,
  valeurDefaut: number,
  operateurComparaison: operateurComparaisonType
  unite: string,
  onChange: (valeur: number) => void,
}

const Critere: React.FC<Props> = ({ label, valeurDefaut, operateurComparaison, unite,onChange }) => {
  const [inputValeur, setInputValeur] = useState<string>(`${valeurDefaut}`);

  useEffect(() => {
    if (inputValeur) {
      const numValeur = parseFloat(inputValeur);
      if (!isNaN(numValeur)) {
        onChange(numValeur)
      }
    }
  }, [inputValeur]);

  return (
    <>
      <Text style={styles.alertText}>
        {`${label} ${operateurComparaison}`}
      </Text>

      <TextInput
        keyboardType='numeric'
        onChangeText={(nouvelleValeur: string) => setInputValeur(nouvelleValeur)}
        value={inputValeur}
        style={null}
        placeholder='Number'
        maxLength={6}
      />

      <Text>
        {`${unite}`}
      </Text>
    </>
  )
}

const styles = StyleSheet.create({
  alertText: {
    color: '#1E375A',
    fontSize: 16,
    fontFamily: 'Karla-Medium'
  }
});

export default Critere;