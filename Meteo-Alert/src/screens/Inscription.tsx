import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, Dimensions } from 'react-native';

import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { useTranslation } from 'react-i18next';

import { useUtilisateur } from '../services/context/UtilisateurContext';

import dtMotDePasse from '../models/datatype/dtMotDePasse';
import utilisateurType from '../models/types/utilisateurInfosType';

import Button from '../components/atoms/Button';
import ClickableText from '../components/atoms/ClickableText';
import ReglesMDP from '../components/atoms/ReglesMDP';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import Field from '../components/molecules/Field';

import LogoMeteo from '../assets/icons/svg/logo-meteo.svg';
import ArrowReturn from '../assets/icons/svg/arrow-left-short.svg';

const Inscription = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { inscription } = useUtilisateur();

  // style de la position du clavier remonté 
  const keyboardVerticalOffset = -173;

  // États pour stocker les valeurs du formulaire
  const [email, setEmail] = useState('');
  const [prenom, setPrenom] = useState('');
  
  const [motDePasseValue, setMotDePasseValue] = useState<string>('');
  const [motDePasse, setMotDePasse] = useState<dtMotDePasse | null>(null);
  const passwordRules = dtMotDePasse.checkRules(motDePasseValue);

  useEffect(() => {
    const rules = dtMotDePasse.checkRules(motDePasseValue);
    if (!Object.values(rules).includes(false)) {
      setMotDePasse(new dtMotDePasse(motDePasseValue));
    }
  }, [motDePasseValue]);

  const handleInscription = async () => {
    if (email && motDePasse && prenom) {
      try {
        const utilisateurData: utilisateurType = {
          prenom: prenom,
          email: email
        }
        await inscription(motDePasse.value, utilisateurData);
      } catch (error: unknown) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: t("inscription.popup.title"),
          textBody: t(`erreur.auth.${error}`),
          button: t("inscription.popup.btn"),
        });
      }
    }
  };

  return (
    <LayoutTemplate>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={keyboardVerticalOffset}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[styles.inner, Platform.select({ android: styles.innerAndroid })]}>

              <View style={styles.goBack}>     
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                >
                  <ArrowReturn onPress={() => navigation.goBack()} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.containerHeader}>
                <LogoMeteo {...styles.logoMeteo}/>
                <Text style={styles.text}>{t('inscription.titre')}</Text>
              </View>
              
              {/* Formulaire prénom */}
              <Field onChangeText={setPrenom} iconSource={require('../assets/icons/logo-utilisateur.png')} fieldName={t('inscription.prenom')} onSubmitEditing={handleInscription} autoCorrect={false} displayValidation/>
              
              {/* Formulaire adresse e-mail */}
              <Field onChangeText={setEmail} iconSource={require('../assets/icons/at-solid.png')} fieldName={t('inscription.email')} validationType='mail' keyboardType='email-address' autoCorrect={false} onSubmitEditing={handleInscription} displayValidation/>

              {/* Formulaire de mot de passe */}
              <Field onChangeText={setMotDePasseValue} iconSource={require('../assets/icons/key-solid.png')} fieldName={t('inscription.mdp')} isPassword onSubmitEditing={handleInscription}/>
              <ReglesMDP
                rules={passwordRules}
              />

              {/* Bouton Inscription */}
              <Button
                onPress={handleInscription}
                title={t('inscription.inscription')}
                styleBtn="whiteBg"
              />

              <View style={styles.textDejaInscrit} >
                {/* Bouton pour aller à la page d'inscription */}
                <ClickableText
                  text={t('inscription.deja_inscrit')}
                  onPress={() => navigation.navigate('Connexion')}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </LayoutTemplate>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  containerHeader: {
    marginTop: 26,
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1
  },
  inner: {
    verticalAlign: 'bottom',
    display: 'flex',
    height: 'auto',
    alignItems: 'center',
    flex: 1,
    marginBottom: 100,
  },
  innerAndroid: {
    marginBottom: 40,
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
  textDejaInscrit: {
    marginTop: 15
  },
  goBack: {
    position: 'absolute',
    zIndex: 1,
    left: Dimensions.get('window').width * 0.10,
    top: 10,
    marginLeft: -35
  }
});

export default Inscription;
