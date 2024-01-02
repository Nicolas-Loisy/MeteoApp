import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ServiceCompteFactory from '../services/compteUtilisateur/ServiceCompteFactory';
import Button from '../components/atoms/Button';
import ClickableText from '../components/atoms/ClickableText';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import { useTranslation } from 'react-i18next';

const Inscription = () => {
  const { t } = useTranslation();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const serviceCompte = ServiceCompteFactory.getServiceCompte();

  // États pour stocker les valeurs du formulaire
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [prenom, setPrenom] = useState('');

  const handleInscription = () => {

    if (email && motDePasse && prenom) {
      serviceCompte.inscription(email, motDePasse, {"prenom": prenom, "lieuxFavoris": []})
        .then(() => {
          navigation.navigate('Accueil');
        })
        .catch((error) => {
          console.error('Erreur de Inscription :', error);
        })
      ;
    }
  };

  return (
    <LayoutTemplate>
      <View style={styles.container}>
        <Text>Inscription</Text>

        {/* Formulaire de prénom */}
        <TextInput
          style={styles.input}
          placeholder= {t('inscription.prenom')}
          value={prenom}
          onChangeText={setPrenom}
        />
        
        {/* Formulaire d'adresse e-mail */}
        <TextInput
          style={styles.input}
          placeholder= {t('inscription.email')}
          value={email}
          onChangeText={setEmail}
        />

        {/* Formulaire de mot de passe */}
        <TextInput
          style={styles.input}
          placeholder={t('inscription.mdp')}
          secureTextEntry={true} // Masque le mot de passe
          value={motDePasse}
          onChangeText={setMotDePasse}
        />

        {/* Bouton de Inscription */}
        <Button
            onPress={handleInscription}
            title={t('inscription.inscription')}
            styleBtn="whiteBg"
        />

        {/* Bouton pour aller à la page d'inscription */}
        <ClickableText
          text={t('inscription.deja_inscrit')}
          onPress={() => navigation.navigate('Connexion')}
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

export default Inscription;
