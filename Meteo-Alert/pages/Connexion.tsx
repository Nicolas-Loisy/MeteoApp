import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ServiceCompteFactory from '../services/compteUtilisateur/ServiceCompteFactory';
import Button from '../components/atoms/Button';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import ClickableText from '../components/atoms/ClickableText';
import Field from '../components/molecules/Field';

const Connexion = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const serviceCompte = ServiceCompteFactory.getServiceCompte();

  // États pour stocker les valeurs du formulaire
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleConnexion = () => {
    if (email && motDePasse) {
      serviceCompte.connexion(email, motDePasse)
        .then((utilisateur) => {
          console.log(utilisateur);
          navigation.navigate('Accueil');
        })
        .catch((error) => {
          console.error('Erreur de connexion :', error);
        });
    }
  };

  return (
    <LayoutTemplate>
      <View style={styles.container}>
        <Text>Connexion</Text>

        {/* Formulaire d'adresse e-mail */}
        <Field onChangeText={setEmail} iconSource={require('../assets/icons/at-solid.png')} defaultValue={email} fieldName="E-mail" />
        {/* Formulaire de mot de passe */}
        <Field onChangeText={setMotDePasse} iconSource={require('../assets/icons/key-solid.png')} defaultValue={motDePasse} fieldName="Mot de passe" isPassword/>


        <ClickableText
            text="Mot de passe oublié ?"
            onPress={() => null}
        />

        {/* Bouton de connexion */}
        <Button
            onPress={handleConnexion}
            title="Connexion"
            styleBtn="whiteBg"
        />

        {/* Bouton pour aller à la page d'inscription */}
        <Button
            onPress={() => navigation.navigate('Inscription')}
            title="Pas encore de compte ?"
            styleBtn="noBg"
        />
      </View>
    </LayoutTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '20%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    borderWidth: 1,
    borderColor:'blue',
    padding: 10,
    borderRadius: 5,
  },
});

export default Connexion;
