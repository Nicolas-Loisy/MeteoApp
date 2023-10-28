import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUserContext } from '../services/compteUtilisateur/UserContext';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import Button from '../components/atoms/Button';

const Accueil = () => {
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

  return (
    <LayoutTemplate>
      <View style={styles.container}>
        <Text>Accueil</Text>

        {/* Bouton de connexion */}
        <Button
          onPress={handleDeconnexion}
          title="Déconnexion"
          styleBtn="whiteBg"
        />

      </View>
    </LayoutTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor:'blue',
    padding: 10,
    borderRadius: 5,
  },
});

export default Accueil;
