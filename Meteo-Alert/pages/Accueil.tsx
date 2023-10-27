import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import ServiceCompteFactory from '../services/ServiceCompteFactory';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Accueil = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const serviceCompte = ServiceCompteFactory.getServiceCompte();

  serviceCompte.checkConnexion()
  .then((statut) => {
    if (!statut) {
      navigation.navigate('Connexion')
    }
  })

  const handleDeconnexion = () => {
    serviceCompte.deconnexion()
    .then(() => {
      serviceCompte.checkConnexion()
      .then((statut) => {
        if (!statut) {
          navigation.navigate('Connexion')
        }
      })
    })
  };

  return (
    <View style={styles.container}>
      <Text>Accueil</Text>

      {/* Bouton de connexion */}
      <Pressable style={styles.button} onPress={handleDeconnexion}>
        <Text>Deconnexion</Text>
      </Pressable>
    </View>
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
