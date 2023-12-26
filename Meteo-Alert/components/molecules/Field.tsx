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
}

const Field: React.FC<FieldProps> = ({
  iconSource,
  fieldName,
  onChangeText,
  value,
  isPassword,
  placeholder,
}) => {
  const [text, setText] = useState(value);

  const handleTextChange = (newText: string) => {
    setText(newText);
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '7%',
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