import React, { useEffect, useState } from 'react';
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
import i18n, { langues, langueActuelle} from "../services/i18n/i18n";

const Accueil = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { t } = useTranslation();
  const [isVoletOpen, setIsVoletOpen] = useState<boolean>(false);
  const { lieuxFavoris, deconnexion } = useUtilisateur(); 
 
  const handleDeconnexion = () => {
    deconnexion();
  };

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

          <LieuxSection lieux={lieuxFavoris} />
          {/* Liste scrollable avec des cartes contenants les lieux avec le nom et la temperature */}

          <Button
            onPress={() => navigation.navigate('RechercheLieu')}
            title={t('accueil.rechercheLieu')}
            styleBtn="whiteBg"
          />
          <Button
            onPress={() => handleDeconnexion()}
            title={"Deconnexion"}
            styleBtn="whiteBg"
          />
          <InputLangue 
            languesDispos={langues} 
            langueDefaut={langueActuelle} 
            onChange={(language: string) => {
              i18n.changeLanguage(language);
            }}
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
    // backgroundColor: 'blue',
    width: "100%",
    paddingBottom: 40,
    marginTop: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    marginBottom: 40,
    borderRadius: 5,
  },
});

export default Accueil;
