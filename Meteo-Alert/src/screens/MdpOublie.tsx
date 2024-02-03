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


const Inscription = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  // États pour stocker les valeurs du formulaire
  const [email, setEmail] = useState('');

  const handleResetPwd = () => {
    if (email) {
    //     .then(() => {
    //       navigation.navigate('Accueil');
    //     })
    //     .catch((error) => {
    //       Dialog.show({
    //         type: ALERT_TYPE.DANGER,
    //         title: t("resetPwd.popup-err.title"),
    //         textBody: t("resetPwd.popup-err.body"),
    //         button: t("resetPwd.popup-err.btn"),
    //       });
    //     })
    //   ;
    }
  };

  return (
    <LayoutTemplate>
    <ArrowReturn onPress={() => navigation.goBack()} style={styles.arrowReturn} />
      <View style={styles.containerHeader}>
        <LogoMeteo {...styles.logoMeteo}/>
        <Text style={styles.text}>{t('resetPwd.titre')}</Text>
      </View>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
            {/* Formulaire d'adresse e-mail */}
            <Field onChangeText={setEmail} iconSource={require('../assets/icons/at-solid.png')} fieldName={t('resetPwd.email')}/>

            {/* Bouton de resetPwd */}
            <Button
                onPress={handleResetPwd}
                title={t('resetPwd.resetPwd')}
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
