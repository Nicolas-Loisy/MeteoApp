import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ServiceCompteFactory from '../services/compteUtilisateur/ServiceCompteFactory';
import Button from '../components/atoms/Button';
import ClickableText from '../components/atoms/ClickableText';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import { useTranslation } from 'react-i18next';
import LogoMeteo from '../assets/icons/svg/logo-meteo.svg';
import Field from '../components/molecules/Field';
import SummaryRules from '../components/atoms/SummaryRules';
import Password from '../models/datatype/dtPassword';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';


const Inscription = () => {
  const { t } = useTranslation();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const serviceCompte = ServiceCompteFactory.getServiceCompte();

  // États pour stocker les valeurs du formulaire
  const [email, setEmail] = useState('');
  const [prenom, setPrenom] = useState('');
  
  const [motDePasse, setMotDePasse] = useState<string>('');
  const [password, setPassword] = useState<Password | null>(null);
  const passwordRules = Password.checkRules(motDePasse);

  useEffect(() => {
    const rules = Password.checkRules(motDePasse);
    if (!Object.values(rules).includes(false)) {
      setPassword(new Password(motDePasse));
    }
  }, [motDePasse]);

  const handleInscription = () => {

    if (email && motDePasse && prenom) {
      serviceCompte.inscription(email, motDePasse, {"prenom": prenom, "lieuxFavoris": []})
        .then(() => {
          navigation.navigate('Accueil');
        })
        .catch((error) => {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: t("inscription.popup.title"),
            textBody: t("inscription.popup.body"),
            button: t("inscription.popup.btn"),
          });
          // console.error('Erreur de Inscription :', error);
        })
      ;
    }
  };

  return (
    <LayoutTemplate>
      <View style={styles.containerHeader}>
        <LogoMeteo {...styles.logoMeteo}/>
        <Text style={styles.text}>{t('inscription.titre')}</Text>
      </View>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>

          {/* Formulaire prénom */}
          <Field onChangeText={setPrenom} iconSource={require('../assets/icons/logo-utilisateur.png')} fieldName={t('inscription.prenom')} displayValidation/>
          
          {/* Formulaire adresse e-mail */}
          <Field onChangeText={setEmail} iconSource={require('../assets/icons/at-solid.png')} fieldName={t('inscription.email')} validationType='mail' displayValidation/>

          {/* Formulaire de mot de passe */}
          <Field onChangeText={setMotDePasse} iconSource={require('../assets/icons/key-solid.png')} fieldName={t('inscription.mdp')} isPassword/>
          <SummaryRules
            rules={passwordRules}
          />

          {/* Bouton Inscription */}
          <Button
            onPress={handleInscription}
            title={t('inscription.inscription')}
            styleBtn="whiteBg"
          />

          {/* Bouton pour aller à la page d'inscription */}
          <ClickableText
            text={t('inscription.deja_inscrit')}
            onPress={() => navigation.navigate('Connexion')}
          />
        </View>
      </TouchableWithoutFeedback>
    </LayoutTemplate>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  container: {
    verticalAlign: 'bottom',
    display: 'flex',
    height: 'auto',
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
  logoMeteo: {
    width: 100,
    height: 100,
  },
  text: {
    color: 'white',
    fontSize: 50,
    fontFamily: 'Jomhuria-Regular',
  },
});

export default Inscription;
