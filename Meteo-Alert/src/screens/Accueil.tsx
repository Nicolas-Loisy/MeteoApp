import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { useUtilisateur } from '../services/context/UtilisateurContext';
import { langues, langueDefaut} from "../services/i18n/i18n";

import LayoutTemplate from '../components/organisms/LayoutTemplate';
import Button from '../components/atoms/Button';
import EngrenageParametre from '../components/atoms/EngrenageParametre';
import VoletParametre from '../components/organisms/VoletParametre';
import MyStatusBar from '../components/atoms/MyStatusBar';
import LieuxSection from '../components/organisms/LieuxSection';
import InputLangue from '../components/atoms/InputLangue';

const Accueil = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { t } = useTranslation();
  const [isVoletOpen, setIsVoletOpen] = useState<boolean>(false);
  const { utilisateur, lieuxFavoris, setLangue } = useUtilisateur();

  const handleVolet = () => {
    setIsVoletOpen(!isVoletOpen);
  }

  return (
    <>
      <MyStatusBar />
      <LayoutTemplate>
        <View style={styles.containerHeader}>
          <VoletParametre isOpen={isVoletOpen} onClose={handleVolet} />
          <EngrenageParametre onOpenVolet={handleVolet} />
        </View>

        <View style={styles.container}>
          <InputLangue 
            languesDispos={langues} 
            langueDefaut={utilisateur?.getReglageApp().getLangue() ?? langueDefaut} 
            onChange={(langue: string) => setLangue(langue)}
          />

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
    marginTop: 20,
  },
  list: {
    height: '94%'
  }
});

export default Accueil;
