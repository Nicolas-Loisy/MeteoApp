import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAccountContext } from '../services/compteUtilisateur/AccountContext';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import Button from '../components/atoms/Button';
import EngrenageParametre from '../components/atoms/EngrenageParametre';
import VoletParametre from '../components/organisms/VoletParametre';
import MyStatusBar from '../components/atoms/MyStatusBar';
import { useTranslation } from 'react-i18next';
import { useUser } from '../services/context/UserContext';
import LieuxSection from '../components/organisms/LieuxSection';
import Lieu from '../models/valueObject/Lieu';

const Accueil = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { t } = useTranslation();
  const { utilisateur } = useUser();
  const { statutConnecte, serviceCompte } = useAccountContext();
  const [isVoletOpen, setIsVoletOpen] = useState(false);
  const [lieuxFavoris, setLieuxFavoris] = useState<ReadonlyArray<Readonly<Lieu>> | []>([]);

  const handleDeconnexion = () => {
    serviceCompte.deconnexion();
  };

  const handleVolet = () => {
    setIsVoletOpen(!isVoletOpen);
  }

  useEffect(() => {
    if (!statutConnecte) {
      navigation.navigate('Connexion');
    }
  }, [statutConnecte]);

  useEffect(() => {
    setLieuxFavoris(utilisateur?.getLieuxFavoris() ?? []);
  }, [utilisateur]);

  return (
    <>
      <MyStatusBar />
      <LayoutTemplate>
        <View style={styles.containerHeader}>
          <VoletParametre isOpen={isVoletOpen} onClose={handleVolet} />
          <EngrenageParametre onOpenVolet={handleVolet} />
        </View>

        <View style={styles.container}>
          {/* <Text>{t('accueil.titre')}</Text> */}

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
