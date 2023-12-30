import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
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

const Accueil = () => {
  const { t } = useTranslation();

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

  const { utilisateur } = useUser();
  
  // TESTS DU MODEL DEBUT
  // TESTS DU MODEL DEBUT
  // TESTS DU MODEL DEBUT
  let lieuxFavoris = utilisateur?.lieuxFavoris
  
  async function newLieu() {
    let resultLieux = await lieuxFavoris?.rechercheLieux('Murat');
    
    if(resultLieux) {
      lieuxFavoris?.ajouterLieu(resultLieux[0]);
    }
    
    let test = utilisateur?.lieuxFavoris.getLieux()[0].getMeteo();
    console.log("Temp : " + (await test)?.getTemperatureStr());
  }
  newLieu();
  // TESTS DU MODEL FIN
  // TESTS DU MODEL FIN
  // TESTS DU MODEL FIN
  

  return (
    <>
    <MyStatusBar/>
    <LayoutTemplate>
      <View style={styles.container}>
        <Text>{t('accueil.titre')}</Text>
        <Text>{utilisateur?.prenom}</Text>
        <Text>{utilisateur?.mail}</Text>
        
        <VoletParametre isOpen={isVoletOpen} onClose={handleCloseVolet} />
        <EngrenageParametre onOpenVolet={handleOpenVolet} />

        {/* Bouton de connexion */}
        <Button
          onPress={handleDeconnexion}
          title={t('accueil.deconnexion')}
          styleBtn="whiteBg"
        />
      </View>
    </LayoutTemplate>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue', 
  },
  button: {
    borderWidth: 1,
    borderColor:'blue',
    padding: 10,
    borderRadius: 5,
  },
});

export default Accueil;
