import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Logo from '../atoms/Logo';

interface FieldProps {
  iconSource: any; // Source de l'image
  fieldName: string; // Nom du champ
  onChangeText: (text: string) => void; // Fonction de rappel pour gérer le texte saisi
  value?: string; // Valeur du champ de saisie
  isPassword?: boolean; // Champ de mot de passe (par défaut, c'est un champ de texte normal)
  placeholder?: string; // Placeholder du champ de saisie
  validationType?: 'mail' | 'mdp' | 'default';
  displayValidation?: boolean;
  textContentType?: string;
  keyboardType?: 'email-address' | 'visible-password' | 'default' ;
  autoCorrect?: boolean;
  returnKeyType?: string;
  onSubmitEditing?: () => void;
}

const Field: React.FC<FieldProps> = ({
  iconSource,
  fieldName,
  onChangeText,
  value,
  isPassword,
  placeholder,
  validationType = 'default', // defaut, mail, mdp
  displayValidation,
  keyboardType,
  autoCorrect,
  onSubmitEditing
}) => {
  const [text, setText] = useState(value);
  const [isValid, setIsValid] = useState(false);

  const handleTextChange = (newText: string) => {
    setText(newText);

    // Vérifier le texte en fonction du type de validation
    if (validationType === 'mail') {
      // Validation de l'adresse e-mail (exemple simple)
      const isValidMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newText);
      setIsValid(isValidMail);
    } else if (validationType === 'mdp') {

    } else {
      // Validation par défaut : le champ n'est pas vide
      const isValidDefault = newText.trim() !== '';
      setIsValid(isValidDefault);
    }

    onChangeText(newText); // Appeler la fonction de rappel avec le nouveau texte
  };

  return (
    <View style={styles.container}>
      <Logo imageSource={iconSource} size={25} />
      <TextInput
        style={styles.input}
        placeholder={placeholder || fieldName} // Utiliser le placeholder spécifié ou le nom de champ par défaut
        onChangeText={handleTextChange} // Utiliser la fonction de gestion de changement de texte
        value={text}
        secureTextEntry={isPassword}
        textContentType='oneTimeCode'
        keyboardType={keyboardType}
        autoCorrect={autoCorrect}
        returnKeyType='go'
        onSubmitEditing={onSubmitEditing}
      />
      {displayValidation && (
        isValid ? (
          <Logo imageSource={require('../../assets/icons/check-solid.png')} size={25} color='#1E375A'/>
        ) : (
          <Logo imageSource={require('../../assets/icons/icon-refus.png')} size={25} color='#C83434'/>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: '7%',
    width: '87%',
    height: 53,
    flexShrink: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#C7E9FF',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    color: '#2D3E44',
    fontSize: 14,
    marginLeft: 10,
  },
});

export default Field;