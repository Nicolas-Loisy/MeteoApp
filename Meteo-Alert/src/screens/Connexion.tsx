import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Animated, Dimensions } from 'react-native';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { useTranslation } from 'react-i18next';

import { useUtilisateur } from '../services/context/UtilisateurContext';
import i18n, { langues } from '../services/i18n/i18n';

import Field from '../components/molecules/Field';
import Button from '../components/atoms/Button';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import ClickableText from '../components/atoms/ClickableText';
import MyStatusBar from '../components/atoms/MyStatusBar';
import InputLangue from '../components/atoms/InputLangue';

import LogoMeteo from '../assets/icons/svg/logo-meteo.svg';


// Paramètrer la taille du logo météo pour son animation selon l'écran du téléphone
const window = Dimensions.get('window');
const IMAGE_HEIGHT = window.width / 2;
const IMAGE_HEIGHT_SMALL = window.width / 4;

// style de la position du clavier remonté 
const keyboardVerticalOffsetIOS = -130;
const keyboardVerticalOffsetAndroid = -140;

const Connexion = () => {
  const { t } = useTranslation();

  // hook useUser pour accéder au contexte d'utilisateur
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { connexion } = useUtilisateur();

  // paramètre pour définir l'état de l'animation
  const [textTranslateY] = useState(new Animated.Value(0));
  const [imageHeight] = useState(new Animated.Value(IMAGE_HEIGHT));

  // États pour stocker les valeurs du formulaire
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleConnexion = async () => {
    if (email && motDePasse) {
      try {
        await connexion(email, motDePasse);
      } catch (error: unknown) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: t("connexion.popup.title"),
          textBody: t(`erreur.auth.${error}`),
          button: t("connexion.popup.btn"),
        });
      }
    }
  };

  // On met des listeners pour savoir si l'action d'afficher/désactiver le clavier est enclenché
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      keyboardWillShow
    );
    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      keyboardWillHide
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const keyboardWillShow = () => {
    Animated.parallel([
      Animated.timing(imageHeight, {
        duration: 400,
        toValue: IMAGE_HEIGHT_SMALL,
        useNativeDriver: false,
      }),
      Animated.timing(textTranslateY, {
        duration: 400,
        toValue: Platform.OS === 'ios' ? 20 : 35,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const keyboardWillHide = () => {
    Animated.parallel([
      Animated.timing(imageHeight, {
        duration: 800,
        toValue: IMAGE_HEIGHT,
        useNativeDriver: false,
      }),
      Animated.timing(textTranslateY, {
        duration: 800,
        toValue: 0,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <>
      <MyStatusBar />
      <LayoutTemplate>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === 'ios' ? keyboardVerticalOffsetIOS : keyboardVerticalOffsetAndroid}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.inner}>
              <KeyboardAvoidingView>
                <Animated.View style={[[styles.logoMeteo, Platform.select({ android: styles.logoMeteoAndroid })], { height: imageHeight }]}>
                  <LogoMeteo />
                </Animated.View>
                <Animated.Text style={[styles.text, { transform: [{ translateY: textTranslateY }] }]}>
                  {t('connexion.titre')}
                </Animated.Text>
              </KeyboardAvoidingView>

              {/* Formulaire d'adresse e-mail */}
              <Field onChangeText={setEmail} iconSource={require('../assets/icons/at-solid.png')} fieldName={t('connexion.email')} keyboardType='email-address' autoCorrect={false} onSubmitEditing={handleConnexion} />
              {/* Formulaire de mot de passe */}
              <Field onChangeText={setMotDePasse} iconSource={require('../assets/icons/key-solid.png')} fieldName={t('connexion.mdp')} onSubmitEditing={handleConnexion} isPassword />

              <View style={styles.viewForgetMdp}>
                <ClickableText
                  text={t('connexion.forget_mdp')}
                  onPress={() => navigation.navigate('MdpOublie')}
                />
              </View>

              <View style={styles.button}>
                {/* Bouton de connexion */}
                <Button
                  onPress={handleConnexion}
                  title={t('connexion.connexion')}
                  styleBtn="whiteBg"
                />
              </View>

              <View style={styles.button}>
                {/* Bouton pour aller à la page d'inscription */}
                <Button
                  onPress={() => navigation.navigate('Inscription')}
                  title={t('connexion.redirect_inscription')}
                  styleBtn="noBg"
                />
              </View>

              <InputLangue
                languesDispos={ langues }
                langueDefaut={ i18n.language }
                onChange={(langue: string) => i18n.changeLanguage(langue)}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </LayoutTemplate>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 80,
    fontFamily: 'Jomhuria-Regular',
  },
  logoMeteo: {
    height: IMAGE_HEIGHT,
    width: 200,
    marginLeft: 45,
  },
  logoMeteoAndroid: {
    marginBottom: -40,
  },
  viewForgetMdp: {
    width: '85%',
    alignItems: "flex-end",
    marginBottom: 30
  }
});

export default Connexion;