import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Dimensions, TouchableOpacity } from 'react-native';

import { useTranslation } from 'react-i18next';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Field from '../components/molecules/Field';
import { useUtilisateur } from '../services/context/UtilisateurContext';

import Button from '../components/atoms/Button';
import LayoutTemplate from '../components/organisms/LayoutTemplate';

import LogoMeteo from '../assets/icons/svg/logo-meteo.svg';
import ArrowReturn from '../assets/icons/svg/arrow-left-short.svg';

const MdpOublie = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const { reinitialiserMotDePasse } = useUtilisateur();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleResetPassword = async () => {
    if (email) {
      try {
        await reinitialiserMotDePasse(email);
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: t("mdp_oublie.popup_confirmation.title"),
          textBody: t("mdp_oublie.popup_confirmation.textBody"),
          button: t("mdp_oublie.popup_confirmation.button"),
        });
      } catch (error: unknown) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: t("mdp_oublie.popup_erreur.title"),
          textBody: t(`erreur.auth.${error}`),
          button: t("mdp_oublie.popup_erreur.button"),
        });
      }
    }
  }

  return (
    <LayoutTemplate>
      <View style={styles.goBack}>     
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        >
          <ArrowReturn onPress={() => null} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.containerHeader}>
        <LogoMeteo {...styles.logoMeteo}/>
        <Text style={styles.textTitle}>{t('mdp_oublie.logo')}</Text>
      </View>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
            {/* Titre */}
            <Text style={styles.text}>{t("mdp_oublie.titre")}</Text>

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
  textTitle: {
    color: 'white',
    fontSize: 50,
    fontFamily: 'Jomhuria-Regular',
  },
  text: {
    color: '#1E375A',
    fontSize: 16,
    fontFamily: 'Karla-Medium',
  },
  logoMeteo: {
    width: 100,
    height: 100,
  },
  goBack: {
    left: Dimensions.get('window').width * 0.10,
    position: 'absolute',
    top: 30,
    zIndex: 1,
    width: 60,
    height: 60,
    marginLeft: -25
  }
});

export default MdpOublie;
