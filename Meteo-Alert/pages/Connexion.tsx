import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ServiceCompteFactory from '../services/ServiceCompteFactory';

const Connexion = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const serviceCompte = ServiceCompteFactory.getServiceCompte();

  // États pour stocker les valeurs du formulaire
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleConnexion = () => {

    // Exemple fictif de connexion
    if (email && motDePasse) {
      // Connectez-vous avec serviceCompte
      serviceCompte.connexion(email, motDePasse)
        .then((utilisateur) => {
          console.log(utilisateur);
          navigation.navigate('Accueil');
        })
        .catch((error) => {
          // Gérez les erreurs de connexion ici
          console.error('Erreur de connexion :', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Connexion</Text>

      {/* Formulaire d'adresse e-mail */}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />

      {/* Formulaire de mot de passe */}
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry={true} // Masque le mot de passe
        value={motDePasse}
        onChangeText={setMotDePasse}
      />

      {/* Bouton de connexion */}
      <Pressable style={styles.button} onPress={handleConnexion}>
        <Text>Connexion</Text>
      </Pressable>

      {/* Bouton pour aller à la page d'inscription */}
      <Pressable onPress={() => navigation.navigate('Inscription')}>
        <Text>Aller à l'Inscription</Text>
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
  input: {
    width: '20%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    borderWidth: 1,
    borderColor:'blue',
    padding: 10,
    borderRadius: 5,
  },
});

export default Connexion;
