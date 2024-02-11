import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import Button from '../components/atoms/Button';
import EngrenageParametre from '../components/atoms/EngrenageParametre';
import VoletParametre from '../components/organisms/VoletParametre';
import MyStatusBar from '../components/atoms/MyStatusBar';
import { useTranslation } from 'react-i18next';
import LieuxSection from '../components/organisms/LieuxSection';
import { useUtilisateur } from '../services/context/UtilisateurContext';
import InputLangue from '../components/atoms/InputLangue';
import { langues, langueActuelle} from "../services/i18n/i18n";

const Accueil = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { t } = useTranslation();
  const [isVoletOpen, setIsVoletOpen] = useState<boolean>(false);
  const { lieuxFavoris, setLangue } = useUtilisateur();

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
            langueDefaut={langueActuelle} 
            onChange={(langue: string) => setLangue(langue)}
          />

          {/* Liste scrollable avec des cartes contenants les lieux avec le nom et la temperature */}
          <LieuxSection lieux={lieuxFavoris} />

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
  }
});

export default Accueil;
