import React, { useState } from 'react';
import { View } from "react-native";
import {Picker} from '@react-native-picker/picker';

type Props = {
  languesDispos: Record<string, string>,
  langueDefaut: string,
  onChange: (langue: string) => void;
};

const InputLangue : React.FC<Props> = ({ languesDispos, onChange, langueDefaut }) => {
  const [langue, setLangue] = useState<string>(langueDefaut);
  const regexLangue = /^(.*)-/ //Deux premières lettres
  const regexPays = /-(.+)/  //Deux dernières lettres
  const options: React.JSX.Element[] = Object.keys(languesDispos).map(langue => creerOption(langue));

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

  function creerOption(langueCode: string): React.JSX.Element {
    const flag = getFlagEmoji(langueCode.match(regexPays)?.[1] ?? null);
    const langue = langueCode.match(regexLangue)?.[1]?.toUpperCase() ?? null;

    if (!langue) throw new Error();

    return <Picker.Item label={flag + " " + langue} value={langueCode} key={langueCode} />;
  }

  return (
    <View>
      <Picker
        selectedValue={langue}
        onValueChange={(value) => handleLangueChange(value)}
      >
        {options}
      </Picker>
    </View>
  );
}

export default InputLangue;