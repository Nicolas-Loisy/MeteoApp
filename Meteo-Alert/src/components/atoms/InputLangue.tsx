import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

type Props = {
  languesDispos: string[],
  langueDefaut: string,
  onChange: (langue: string) => void;
};

type optionType = {
  label: string, 
  value: string
}

const InputLangue : React.FC<Props> = ({ languesDispos, onChange, langueDefaut }) => {
  const [langue, setLangue] = useState<string>(langueDefaut);
  const regexLangue = /^(.*)-/ //Deux premières lettres
  const regexPays = /-(.+)/  //Deux dernières lettres
  const options: optionType[] = languesDispos.map(langue => creerOption(langue));

  function handleLangueChange (langue: string): void  {
    const nouvelleLangue = langue;
    setLangue(langue);
    onChange(nouvelleLangue);
  };

  // Utilisez l'API Unicode pour obtenir les drapeaux
  function getFlagEmoji(countryCode: string | null): string | void {
    if (!countryCode) {
      return;
    }

    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));

    return String.fromCodePoint(...codePoints);
  }

  function creerOption(langueCode: string): optionType {
    const flag = getFlagEmoji(langueCode.match(regexPays)?.[1] ?? null);
    const langue = langueCode.match(regexLangue)?.[1]?.toUpperCase() ?? null;

    if (!langue) throw new Error();

    return { 
      label: flag + " " + langue, 
      value: langueCode 
    };
  }

  return (
    <View style={styles.lang}>
      <RNPickerSelect
        placeholder={{}}
        items={options}
        onValueChange={(value) => handleLangueChange(value)}
        value={langue}
        pickerProps={{ style: { width: 125, overflow: 'hidden' } }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lang: {
    width: 125,
  }
});

export default InputLangue;