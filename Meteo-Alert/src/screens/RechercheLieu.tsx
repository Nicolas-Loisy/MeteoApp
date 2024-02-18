import React from 'react';
import { KeyboardAvoidingView, Platform, View, StyleSheet, TouchableWithoutFeedback, Keyboard, FlatList, Text } from 'react-native';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useGeographie } from '../services/context/GeographieContext';

import GoBackButton from '../components/atoms/GoBackButton';
import MyStatusBar from '../components/atoms/MyStatusBar';
import Field from '../components/molecules/Field';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import LieuSearchCard from '../components/molecules/LieuSearchCard';

import SadCloudLogo from '../assets/icons/svg/sad-cloud.svg';

const RechercheLieu = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { rechercheLieux, resultatsRecherche } = useGeographie();

  // style de la position du clavier remonté 
  const keyboardVerticalOffsetIOS = 37;
  const keyboardVerticalOffsetAndroid = 20;

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
        <GoBackButton onPress={navigation.goBack} iconType="arrowReturn" />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inner}
          keyboardVerticalOffset={Platform.OS === 'ios' ? keyboardVerticalOffsetIOS : keyboardVerticalOffsetAndroid}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <View style={styles.containerList}>
                {resultatsRecherche && resultatsRecherche.length > 0 ? (
                    <FlatList
                      data={resultatsRecherche}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <LieuSearchCard lieu={item} />
                      )}
                    />
                ) : (
                  <>
                    <View style={styles.logo}>
                      <SadCloudLogo />
                    </View>
                    <Text style={styles.noResultsText}>
                      {t('rechercheLieu.aucunResultat')}
                    </Text>
                  </>
                )}
                

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
  inner: {
    flex: 1
  },
  containerSearch: {
    alignItems: 'center',
  },
  noResultsText: {
    margin: 30,
    alignSelf: 'center',
    color: '#1E375A',
    fontSize: 30,
    fontFamily: 'Karla-Medium',
  },
  logo: {
    marginTop: 50,
    alignSelf: 'center',
  }
});

export default RechercheLieu;