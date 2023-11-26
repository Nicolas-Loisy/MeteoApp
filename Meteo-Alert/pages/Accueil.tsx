import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUserContext } from '../services/compteUtilisateur/UserContext';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import Button from '../components/atoms/Button';
import EngrenageParametre from '../components/atoms/EngrenageParametre';
import VoletParametre from '../components/organisms/VoletParametre';
import MyStatusBar from '../components/atoms/MyStatusBar';
import { useTranslation } from 'react-i18next';

const Accueil = () => {
  const { t } = useTranslation();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { statutConnecte, serviceCompte } = useUserContext();

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

  return (
    <>
    <MyStatusBar/>
    <LayoutTemplate>
      <View style={styles.container}>
        <Text>{t('accueil.titre')}</Text>
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
