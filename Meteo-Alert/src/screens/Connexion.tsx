import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Animated, Dimensions } from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ServiceCompteFactory from '../services/compteUtilisateur/ServiceCompteFactory';
import Button from '../components/atoms/Button';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import ClickableText from '../components/atoms/ClickableText';
import Field from '../components/molecules/Field';
import { useTranslation } from 'react-i18next';
import { useUser } from '../services/context/UserContext';
import LogoMeteo from '../assets/icons/svg/logo-meteo.svg';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import MyStatusBar from '../components/atoms/MyStatusBar';

// Paramètrer la taille du logo météo pour son animation
const window = Dimensions.get('window');
const IMAGE_HEIGHT = window.width / 2;
const IMAGE_HEIGHT_SMALL = window.width /5;
  
const Connexion = () => {
  const { t } = useTranslation();

  // hook useUser pour accéder au contexte d'utilisateur
  const { setUtilisateur, utilisateur } = useUser();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const serviceCompte = ServiceCompteFactory.getServiceCompte();

  const [textTranslateY] = useState(new Animated.Value(0));
  const [imageHeight] = useState(new Animated.Value(IMAGE_HEIGHT));

  // États pour stocker les valeurs du formulaire
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleConnexion = () => {
    if (email && motDePasse) {
      serviceCompte.connexion(email, motDePasse)
        .then((utilisateurConn) => {
          setUtilisateur(utilisateurConn); // fonction du contexte pour mettre à jour l'utilisateur

          navigation.navigate('Accueil');
        })
        .catch((error) => {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: t("connexion.popup.title"),
            textBody: t("connexion.popup.body"),
            button: t("connexion.popup.btn"),
          });
        })
      ;
    }
  };

  // on met des listeners pour savoir si l'action d'afficher/désactiver le clavier est enclenché
  useEffect(() => {
    let keyboardWillShowListener: any;
    let keyboardWillHideListener: any;

    keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', keyboardWillHide);

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
        toValue: 20,
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
      <MyStatusBar/>
        <LayoutTemplate>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -70 : 0}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={styles.inner}>
                <KeyboardAvoidingView>
                  <Animated.View style={[styles.logoMeteo, { height: imageHeight }]}>
                    <LogoMeteo />
                  </Animated.View>
                  <Animated.Text style={[styles.text, { transform: [{ translateY: textTranslateY }] }]}>
                    {t('connexion.titre')}
                  </Animated.Text>
                </KeyboardAvoidingView>
                
                {/* Formulaire d'adresse e-mail */}
                <Field onChangeText={setEmail} iconSource={require('../assets/icons/at-solid.png')} fieldName={t('connexion.email')} keyboardType='email-address' autoCorrect={false} onSubmitEditing={handleConnexion}/>
                {/* Formulaire de mot de passe */}
                <Field onChangeText={setMotDePasse} iconSource={require('../assets/icons/key-solid.png')} fieldName={t('connexion.mdp')} keyboardType='visible-password' onSubmitEditing={handleConnexion} isPassword/>
                
                <View style={styles.viewForgetMdp}>
                  <ClickableText
                    text={t('connexion.forget_mdp')}
                    onPress={() => null}
                  />
                </View>

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
  inner:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
  text: {
    color: 'white',
    fontSize: 80,
    fontFamily: 'Jomhuria-Regular',
  },
  logoMeteo: {
    height: IMAGE_HEIGHT,
    width: 200,
    marginLeft: 45
  },
  viewForgetMdp: {
    width: '85%', 
    alignItems:"flex-end", 
    marginBottom: 30
  }
});

export default Connexion;
