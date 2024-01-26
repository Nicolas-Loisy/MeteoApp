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
import Lieu from '../models/valueObject/Lieu';
import LieuxSection from '../components/organisms/LieuxSection';
import LieuxFavorisBuilder from '../models/builder/LieuxFavorisBuilder';

const Accueil = () => {
  const { t } = useTranslation();
  const { utilisateur } = useUser();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { statutConnecte, serviceCompte } = useAccountContext();

  useEffect(() => {
    if(!statutConnecte) {
      navigation.navigate('Connexion');
    }
  }, [statutConnecte]);

  const handleDeconnexion = () => {
    serviceCompte.deconnexion();
  };

  const [isVoletOpen, setIsVoletOpen] = useState(false);

  const handleOpenVolet = () => {
    setIsVoletOpen(true);
  };

  const handleCloseVolet = () => {
    setIsVoletOpen(false);
  };

  
  // TESTS DU MODEL DEBUT  
  async function newLieu(lieu: string) {
    let resultLieux = await LieuxFavorisBuilder.rechercheLieux(lieu);
    
    if (resultLieux && resultLieux.length > 0) {
        utilisateur?.ajouterLieuFavori(resultLieux[0]);

        let premierLieu = utilisateur?.getLieuxFavoris()[0];

        if (premierLieu && premierLieu.getMeteo) {
            let test = await premierLieu.getMeteo();
            console.log("Temp : " + test.temperature.toString());
        }
    }
  }

  async function affMeteo() {
    let premierLieu = utilisateur?.getLieuxFavoris()[0];
    if (premierLieu) {
        let test = await (premierLieu as Lieu).getMeteo();
        console.log("METEO Temp : " + test.temperature.toString());
    }
  }

  newLieu('Loches');
  newLieu('Murat');
  newLieu('Paris');
  newLieu('Reignac');
  newLieu('Ezanville');
  newLieu('Lyon');
  newLieu('Tour');
  newLieu('Coltine');
  newLieu('Montreal');
  newLieu('Ax-les-Thermes');
  newLieu('Albiez Montrond');
  
  affMeteo();
  // TESTS DU MODEL FIN  

  return (
    <>
    <MyStatusBar/>
    <LayoutTemplate>
      <View style={styles.containerHeader}>
        <VoletParametre isOpen={isVoletOpen} onClose={handleCloseVolet} />
        <EngrenageParametre onOpenVolet={handleOpenVolet} />
      </View>

      <View style={styles.container}>
        {/* <Text>{t('accueil.titre')}</Text> */}

        <LieuxSection lieux={utilisateur?.getLieuxFavoris() || []} />
        {/* Liste scrollable avec des cartes contenants les lieux avec le nom et la temperature */}

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
    // backgroundColor: 'blue',
    width: "100%", 
    paddingBottom: 40,
    marginTop: 20,
  },
  button: {
    borderWidth: 1,
    borderColor:'blue',
    padding: 10,
    marginBottom: 40,
    borderRadius: 5,
  },
});

export default Accueil;
