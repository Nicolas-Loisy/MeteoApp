import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { useUtilisateur } from '../services/context/UtilisateurContext';
import { langues, langueDefaut } from "../services/i18n/i18n";

import Button from '../components/atoms/Button';
import MyStatusBar from '../components/atoms/MyStatusBar';
import EngrenageParametre from '../components/atoms/EngrenageParametre';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import VoletParametre from '../components/organisms/VoletParametre';
import LieuxSection from '../components/organisms/LieuxSection';

const Accueil = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { t } = useTranslation();
  const [isVoletOpen, setIsVoletOpen] = useState<boolean>(false);
  const { lieuxFavoris } = useUtilisateur();

  const handleVolet = () => {
    setIsVoletOpen(!isVoletOpen);
  }

  return (
    <>
      <MyStatusBar />
      <LayoutTemplate>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isVoletOpen}
          onRequestClose={handleVolet}
        >
          <VoletParametre isOpen={isVoletOpen} onClose={handleVolet} />
        </Modal>


        <View style={styles.containerHeader}>
          <EngrenageParametre onOpenVolet={handleVolet} />
        </View>

        <View style={styles.container}>
          <View style={styles.list}>
            {/* Liste scrollable avec des cartes contenants les lieux avec le nom et la temperature */}
            <LieuxSection lieux={lieuxFavoris} />
          </View>

          <Button
            onPress={() => navigation.navigate('RechercheLieu')}
            title={t('accueil.rechercheLieu')}
            styleBtn="whiteBg"
          />
        </View>
      </LayoutTemplate>
    </>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    alignSelf: "flex-end",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    paddingBottom: 30,
    marginTop: 5,
  },
  list: {
    height: '94%'
  }
});

export default Accueil;
