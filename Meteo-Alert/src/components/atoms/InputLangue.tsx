import React, { useState } from 'react';
import { Platform, StyleSheet, View } from "react-native";
import { Color } from 'react-native-alert-notification/lib/typescript/service';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';

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
  const regexLangue = /^(.*)_/ //Deux premières lettres
  const regexPays = /_(.+)/  //Deux dernières lettres
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
    <View style={pickerSelectStyles.buttonContainer}>
      <RNPickerSelect
        placeholder={{}}
        items={options}
        onValueChange={(value) => handleLangueChange(value)}
        value={langue}
        style={pickerSelectStyles}
        Icon={() => {
          return (
            <Icon size={15} name="caret-down-outline" style={pickerSelectStyles.arrowIconIOS}/>
          );
        }}
        useNativeAndroidPickerStyle={false} 
      />
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 250,
    borderWidth: 1,
    borderColor: '#1E375A',
    height: 40,
    width: 80,
    fontSize: 14,
  },
  //text
  inputIOS: {
    top: 12,
    paddingLeft: 10,
  },
  //text
  inputAndroid: {
    top: 6,
    left: 12,
    color: 'black',
  },
  arrowIconIOS:{
    position: "absolute",
    bottom: -28,
    right: 6,
  }
});

export default InputLangue;