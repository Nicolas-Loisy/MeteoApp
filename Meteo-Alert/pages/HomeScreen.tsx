import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface HomeScreenProps {
  navigation: NavigationProp<any>; // Remplacez 'any' par le type de votre navigation si vous l'avez défini
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Page d'accueil</Text>
      <Text>Page d'accueil</Text>
      <Text>Page d'accueil</Text>
      <Text>Page d'accueil</Text>
      <Text>Page d'accueil</Text>
      <Button
        title="Aller au profil"
        onPress={() => navigation.navigate('Profile')}
        // onPress={() => navigation.replace('Profile')}
      />
    </View>
  );
};

export default HomeScreen;
