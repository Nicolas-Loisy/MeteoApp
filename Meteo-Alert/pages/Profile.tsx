import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface ProfileProps {
  navigation: NavigationProp<any>;
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Page profile</Text>
      <Text>Page d'accueil</Text>
      <Text>Page d'accueil</Text>
      <Text>Page d'accueil</Text>
      <Text>Page d'accueil</Text>

      <Button
        title="Aller a la Home Page"
        onPress={() => navigation.navigate('HomeScreen')}
      />
    </View>
  );
};

export default Profile;
