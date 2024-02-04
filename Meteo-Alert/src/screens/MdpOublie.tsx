import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import { useTranslation } from 'react-i18next';
import LogoMeteo from '../assets/icons/svg/logo-meteo.svg';
import ArrowReturn from '../assets/icons/svg/arrow-left-short.svg';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Field from '../components/molecules/Field';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import Button from '../components/atoms/Button';
import ServiceCompteFactory from '../services/compteUtilisateur/ServiceCompteFactory';


const Inscription = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const serviceCompte = ServiceCompteFactory.getServiceCompte();


  const handleResetPassword = () => {
    if (email) {
      serviceCompte.reinitialiserMdp(email)
      .then(() => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: t("mdp_oublie.popup_confirmation.title"),
          textBody: t("mdp_oublie.popup_confirmation.textBody"),
          button: t("mdp_oublie.popup_confirmation.button"),
        });
      })
      .catch((error: Error) => {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: t("mdp_oublie.popup_erreur.title"),
          textBody: error.message,
          button: t("mdp_oublie.popup_erreur.button"),
        });
      });
    } else {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: t("mdp_oublie.popup_erreur.title"),
        textBody: t("mdp_oublie.popup_erreur.mail_manquant"),
        button: t("mdp_oublie.popup_erreur.button"),
      });
    }
  }

  return (
    <LayoutTemplate>
      <ArrowReturn onPress={() => navigation.goBack()} style={styles.arrowReturn} />

      <View style={styles.containerHeader}>
        <LogoMeteo {...styles.logoMeteo}/>
        <Text style={styles.text}>{t('mdp_oublie.logo')}</Text>
      </View>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
            {/* Titre */}
            <Text>{t("mdp_oublie.titre")}</Text>

            {/* Formulaire d'adresse e-mail */}
            <Field onChangeText={setEmail} iconSource={require('../assets/icons/at-solid.png')} fieldName={t('mdp_oublie.email')}/>

            {/* Bouton de resetPwd */}
            <Button
                onPress={handleResetPassword}
                title={t('mdp_oublie.button')}
                styleBtn="whiteBg"
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
    marginBottom: 30,
    marginTop: 50
  },
  container: {
    verticalAlign: 'bottom',
    display: 'flex',
    height: 'auto',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 50,
    fontFamily: 'Jomhuria-Regular',
  },
  logoMeteo: {
    width: 100,
    height: 100,
  },
  arrowReturn: {
    left: Dimensions.get('window').width * 0.10,
    position: 'absolute',
    top: 30,
    zIndex: 1,
    width: 60,
    height: 60,
    marginLeft: -25,
  },
});

export default Inscription;
