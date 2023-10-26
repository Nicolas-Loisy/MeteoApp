import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
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
