import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

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
  textContentType?: string; // Eviter le bug avec le gestionnaire de mot de passe ios
  keyboardType?: 'email-address' | 'default' ; // Définir le type de clavier selon le text input
  autoCorrect?: boolean; // Pour activer l'auto correction sur le clavier
  returnKeyType?: string; // Modifier le bouton submit du clavier
  onSubmitEditing?: () => void; // Valider la sélection en cliquant sur le bouton submit du clavier
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
  onSubmitEditing,
}) => {
  const [text, setText] = useState(value);
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

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

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Logo imageSource={iconSource} size={25} />
      <TextInput
        style={styles.input}
        placeholder={placeholder || fieldName} // Utiliser le placeholder spécifié ou le nom de champ par défaut
        onChangeText={handleTextChange} // Utiliser la fonction de gestion de changement de texte
        value={text}
        secureTextEntry={isPassword ? showPassword : false}
        textContentType='oneTimeCode' // Pour ne plus affiche le gestionnaire de mot de passe sur IOS
        keyboardType={keyboardType}
        autoCorrect={autoCorrect}
        returnKeyType='go'
        onSubmitEditing={onSubmitEditing}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
      />
      {isPassword && (
        <TouchableOpacity onPress={togglePassword}>
          {showPassword ? (
            <Image source={require('../../assets/icons/eye-closed.png')} style={{ width: 25, height: 25, tintColor: '#1E375A' }} />
          ) : (
            <Image source={require('../../assets/icons/eye-open.png')} style={{ width: 25, height: 25, tintColor: '#1E375A' }} />
          )}
        </TouchableOpacity>
      )}
      {displayValidation && (
        isValid ? (
          <Logo imageSource={require('../../assets/icons/check-solid.png')} size={25} color='#1E375A' />
        ) : (
          <Logo imageSource={require('../../assets/icons/icon-refus.png')} size={25} color='#C83434' />
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