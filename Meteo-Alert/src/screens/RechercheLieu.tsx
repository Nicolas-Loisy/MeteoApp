import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import { useTranslation } from 'react-i18next';
import Field from '../components/molecules/Field';
import { KeyboardAvoidingView, Platform } from 'react-native';
import MyStatusBar from '../components/atoms/MyStatusBar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import LieuSearchCard from '../components/molecules/LieuSearchCard';
import { useGeographie } from '../services/context/GeographieContext';
import GoBackButton from '../components/atoms/GoBackButton';

const RechercheLieu = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { rechercheLieux, resultatsRecherche } = useGeographie();

  async function handleRecherche(nomLieu: string) {
    if (nomLieu) {
      try {
        rechercheLieux(nomLieu);
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
