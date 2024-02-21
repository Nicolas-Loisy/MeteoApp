import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, Platform } from 'react-native';

import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

import { useUtilisateur } from '../../services/context/UtilisateurContext';
import { langues, langueDefaut } from "../../services/i18n/i18n";
import { useTranslation } from 'react-i18next';

import dtMotDePasse from '../../models/datatype/dtMotDePasse';

import Button from '../atoms/Button';
import Field from '../molecules/Field';
import ReglesMDP from '../atoms/ReglesMDP';
import InputLangue from '../atoms/InputLangue';
import ClickableText from '../atoms/ClickableText';

import Croix from '../../assets/icons/svg/icon-refus.svg';

interface VoletParametreProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoletParametre: React.FC<VoletParametreProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  
  const { utilisateur, modifierMotDePasse, deconnexion, setLangue } = useUtilisateur();

  const [ancienMotDePasseValue, setAncienMotDePasseValue] = useState<string>("");
  const [motDePasseValue, setMotDePasseValue] = useState<string>("");
  const [motDePasse, setMotDePasse] = useState<dtMotDePasse | null>(null);

  const motDePasseRegles = dtMotDePasse.checkRules(motDePasseValue);

  useEffect(() => {
    const rules = dtMotDePasse.checkRules(motDePasseValue);
    if (!Object.values(rules).includes(false)) {
      setMotDePasse(new dtMotDePasse(motDePasseValue));
    }
  }, [motDePasseValue]);

  const handleModifierMotDePasse = async () => {
    if (!motDePasse) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: t("voletParametre.popup_erreur.title"),
        textBody: t(`voletParametre.popup_erreur.mdp_incorrect`),
        button: t("voletParametre.popup_erreur.button"),
      });
      return;
    }

    try {
      await modifierMotDePasse(ancienMotDePasseValue, motDePasse.value)
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: t("voletParametre.popup_confirmation.title"),
        textBody: t("voletParametre.popup_confirmation.textBody"),
        button: t("voletParametre.popup_confirmation.button"),
      });
    } catch (error: unknown) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: t("voletParametre.popup_erreur.title"),
        textBody: t(`erreur.auth.${error}`),
        button: t("voletParametre.popup_erreur.button"),
      });
    }
  }

  const handleDeconnexion = async () => {
    await deconnexion();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={[styles.volet, Platform.select({ android: styles.voletAndroid })]}>
        <TouchableOpacity onPress={onClose}>
          <Croix style={styles.closeButtonLogo}/>
        </TouchableOpacity>

        {/* Contenu du volet */}
        <View style={styles.voletContent} >
          <Text style={styles.text}>{utilisateur?.prenom}</Text>
          <Text style={styles.text}>{utilisateur?.mail}</Text>

          {/* Formulaire de modification de mot de passe */}
          <Field onChangeText={setAncienMotDePasseValue} iconSource={require('../../assets/icons/key-solid.png')} fieldName={t('voletParametre.ancienPwd')} onSubmitEditing={handleModifierMotDePasse} isPassword/>
          <Field onChangeText={setMotDePasseValue} iconSource={require('../../assets/icons/key-solid.png')} fieldName={t('voletParametre.nouveauPwd')}  isPassword/>

          <View style={styles.reglesMDPContainer}>
            <ReglesMDP
              rules={motDePasseRegles}
              whiteMode
            />
          </View>

          <View>
            <Button
              onPress={handleModifierMotDePasse}
              title={t('voletParametre.changePwd')}
              styleBtn="noBg"
              tinyBtn
            />
          </View>

          <View style={styles.footerVolet} >
            <View style={styles.button} >
              <InputLangue
                languesDispos={langues}
                langueDefaut={utilisateur?.reglageApp.langue ?? langueDefaut}
                onChange={(langue: string) => setLangue(langue)}
              />
            </View>

            <View style={styles.button} >
              {/* Bouton de connexion */}
              <ClickableText
                onPress={handleDeconnexion}
                text={t('voletParametre.deconnexion')}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  volet: {
    width: '80%',
    height: '100%',
    paddingTop: 80,
    paddingLeft: 5,
    paddingRight: 3,
    backgroundColor: '#1E375A',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  voletAndroid:{
    paddingTop: 50,
  },
  voletContent: {
    alignItems: 'center',
    marginTop: 10,
    height: "93%",
  },
  closeButtonLogo: {
    marginLeft: 260,
    marginTop: -20,
    width: 100,
    padding: 15  
  },
  text: {
    color: "white",
    marginBottom: 5,
    fontSize: 15,
    fontFamily: "Karla-Medium"
  },
  button: {
    marginBottom: 15
  },
  reglesMDPContainer: {
    marginLeft: 38
  },
  footerVolet: {
    marginTop: 200,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

export default VoletParametre;
