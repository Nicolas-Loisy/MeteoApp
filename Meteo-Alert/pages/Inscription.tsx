import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Inscription = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleInscription = () => {
    navigation.navigate('Connexion');
  };

  return (
    <View style={styles.container}>
      <Text>Inscription</Text>
      <Button
        title="Aller à l'Inscription"
        onPress={handleInscription}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Inscription;
