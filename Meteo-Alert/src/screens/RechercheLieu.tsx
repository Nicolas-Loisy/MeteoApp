import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import { useTranslation } from 'react-i18next';
import Field from '../components/molecules/Field';
import { KeyboardAvoidingView, Platform } from 'react-native';
import MyStatusBar from '../components/atoms/MyStatusBar';
import Lieu from '../models/valueObject/Lieu';
import LieuSearchCard from '../components/molecules/LieuSearchCard';
import LieuxFavorisBuilder from '../models/builder/LieuxFavorisBuilder';
import GoBackButton from '../components/atoms/GoBackButton';

const RechercheLieu = () => {
  const { t } = useTranslation();
  const [resultatsRecherche, setResultatsRecherche] = useState<Readonly<Lieu>[]>([])

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
        <GoBackButton iconType="arrowReturn" />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <View style={styles.containerList}>

                <FlatList
                  data={resultatsRecherche}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <LieuSearchCard lieu={item} />
                  )}
                />

              </View>
              <View style={styles.containerSearch}>
                <Field onChangeText={(nomLieu) => handleRecherche(nomLieu)} iconSource={require('../assets/icons/magnifying-glass-solid.png')} fieldName={t('rechercheLieu.recherche')} />
              </View>

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
    marginTop: 60,
  },
  containerList: {
    borderTopColor: 'white',
    borderTopWidth: 1,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    height: '94%'
  },
  containerSearch: {
    alignItems: 'center',
  }
});

export default RechercheLieu;
