import React, { useEffect, useState } from "react";
import { Text, StyleSheet, TextInput, View } from 'react-native';
import operateurComparaisonType from "../../models/types/operateurComparaisonType";
import { t } from "i18next";

interface Props {
  readonly label: string,
  valeurDefaut: number,
  operateurComparaison: operateurComparaisonType
  unite: string,
  onChange: (valeur: number) => void,
}

const Critere: React.FC<Props> = ({ label, valeurDefaut, operateurComparaison, unite, onChange }) => {
  const [inputValeur, setInputValeur] = useState<string>(`${valeurDefaut}`);
  
  const labelMeteo = t("reglageAlerte.label", { returnObjects: true }) as Record<string, string>;

  useEffect(() => {
    if (inputValeur) {
      const numValeur = parseFloat(inputValeur);
      if (!isNaN(numValeur)) {
        onChange(numValeur)
      }
    }
  }, [inputValeur]);

  return (
    <View style={styles.critere}>

      <Text style={styles.alertText}>
        {labelMeteo[label]}
      </Text>

      <View style={styles.config}>
        <Text style={styles.alertTextBold}>
          {operateurComparaison}
        </Text>

        <TextInput
          keyboardType='numeric'
          onChangeText={(nouvelleValeur: string) => setInputValeur(nouvelleValeur)}
          value={inputValeur}
          style={styles.alertInput}
          placeholder='Number'
          maxLength={6}
        />

        <Text style={styles.alertTextBold}>
          {`${unite}`}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  critere: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  config: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  alertText: {
    color: '#1E375A',
    fontSize: 16,
    fontFamily: 'Karla-Medium'
  },
  alertTextBold: {
    color: '#1E375A',
    fontSize: 16,
    fontFamily: 'Karla-Bold'
  },
  alertInput: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: '#1E375A',
    paddingHorizontal: 3,
    borderRadius: 8,
    marginHorizontal: 5
  }
});

export default Critere;