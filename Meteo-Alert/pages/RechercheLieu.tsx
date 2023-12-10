import React from 'react';
import { View, StyleSheet } from 'react-native';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import { useTranslation } from 'react-i18next';
import Field from '../components/molecules/Field';
import { KeyboardAvoidingView, Platform } from 'react-native';
import MyStatusBar from '../components/atoms/MyStatusBar';


const RechercheLieu = () => {
  const { t } = useTranslation();

  return (
    <>
    <MyStatusBar/>
    <LayoutTemplate>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.traitBlanc} />
          <Field onChangeText={() => null} iconSource={require('../assets/icons/magnifying-glass-solid.png')} fieldName={t('rechercheLieu.recherche')}/>
        </View>
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
});

export default RechercheLieu;
