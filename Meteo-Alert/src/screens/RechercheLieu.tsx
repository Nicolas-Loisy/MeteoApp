import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Dimensions, FlatList } from 'react-native';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import { useTranslation } from 'react-i18next';
import Field from '../components/molecules/Field';
import { KeyboardAvoidingView, Platform } from 'react-native';
import MyStatusBar from '../components/atoms/MyStatusBar';
import Croix from '../assets/icons/svg/vector.svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import Lieu from '../models/valueObject/Lieu';
import LieuSearchCard from '../components/molecules/LieuSearchCard';
import LieuxFavorisBuilder from '../models/builder/LieuxFavorisBuilder';

const RechercheLieu = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [ resultatsRecherche, setResultatsRecherche ] = useState<Readonly<Lieu>[]>([])

  async function handleRecherche(nomLieu: string) {
    if (nomLieu) {
      try {
        const resultats: Readonly<Lieu>[] = await LieuxFavorisBuilder.rechercheLieux(nomLieu);
        setResultatsRecherche(resultats);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <MyStatusBar />

      <LayoutTemplate>
        <Croix onPress={() => navigation.goBack()} style={[styles.croix]} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>

              <FlatList
                data={resultatsRecherche}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <LieuSearchCard lieu={item} />
                )}
              />
              
              <View style={styles.traitBlanc} />
              <Field onChangeText={(nomLieu) => handleRecherche(nomLieu)} iconSource={require('../assets/icons/magnifying-glass-solid.png')} fieldName={t('rechercheLieu.recherche')} />

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
    left: Dimensions.get('window').width * 0.10,
    position: 'absolute',
    top: 40,
    zIndex: 1,
  },
});

export default RechercheLieu;
