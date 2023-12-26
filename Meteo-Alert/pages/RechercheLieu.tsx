import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import { useTranslation } from 'react-i18next';
import Field from '../components/molecules/Field';
import { KeyboardAvoidingView, Platform } from 'react-native';
import MyStatusBar from '../components/atoms/MyStatusBar';
import Croix from '../assets/icons/svg/vector.svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';

const RechercheLieu = () => {
  const { t } = useTranslation();

  const { width } = Dimensions.get('window');
  const croixPosition = width * 0.10;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <>
    <MyStatusBar/>
    
    <LayoutTemplate>
      <Croix onPress={() => navigation.goBack()} style={[styles.croix, { left: croixPosition }]} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View style={styles.traitBlanc} />
            <Field onChangeText={() => null} iconSource={require('../assets/icons/magnifying-glass-solid.png')} fieldName={t('rechercheLieu.recherche')}/>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LayoutTemplate>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
  traitBlanc: {
    height: 1,
    backgroundColor: 'white', // Couleur du trait blanc
    marginBottom: 25, // Marge inférieure pour séparer le trait du champ
    marginLeft: '2%',
    marginRight: '2%', 
  },
  croix: {
    position: 'absolute',
    top: 40, // Ajustez cette valeur selon votre préférence pour la position verticale
    zIndex: 1,
  },
});

export default RechercheLieu;
