import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from 'react-native';

interface Props {
  readonly label: string,
  valeurDefaut: number,
  onChange: (valeur: number) => void,
}

const Critere: React.FC<Props> = ({ label, valeurDefaut, onChange }) => {
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
        {label} {/* < ou > */} {inputValeur} {/* unité */}
      </Text>

      <TextInput
        keyboardType='numeric'
        onChangeText={(nouvelleValeur: string) => setInputValeur(nouvelleValeur)}
        value={inputValeur}
        style={null}
        placeholder='Number'
        maxLength={6}
      />
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