import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ServiceCompteFactory from '../services/compteUtilisateur/ServiceCompteFactory';
import Button from '../components/atoms/Button';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import ClickableText from '../components/atoms/ClickableText';
import Field from '../components/molecules/Field';
import { useTranslation } from 'react-i18next';

const Connexion = () => {
  const { t } = useTranslation();

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
        <Text>{t('connexion.titre')}</Text>

        {/* Formulaire d'adresse e-mail */}
        {/* <Field onChangeText={setEmail} iconSource={require('../assets/icons/at-solid.png')} defaultValue={email} fieldName={t('connexion.email')}/> */}
        <Field onChangeText={setEmail} iconSource={require('../assets/icons/at-solid.png')} fieldName={t('connexion.email')}/>
        {/* Formulaire de mot de passe */}
        {/* <Field onChangeText={setMotDePasse} iconSource={require('../assets/icons/key-solid.png')} defaultValue={motDePasse} fieldName={t('connexion.mdp')} isPassword/> */}
        <Field onChangeText={setMotDePasse} iconSource={require('../assets/icons/key-solid.png')} fieldName={t('connexion.mdp')} isPassword/>


        <ClickableText
            text={t('connexion.forget_mdp')}
            onPress={() => null}
        />

        {/* Bouton de connexion */}
        <Button
            onPress={handleConnexion}
            title={t('connexion.connexion')}
            styleBtn="whiteBg"
        />

        {/* Bouton pour aller à la page d'inscription */}
        <Button
            onPress={() => navigation.navigate('Inscription')}
            title={t('connexion.redirect_inscription')}
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
