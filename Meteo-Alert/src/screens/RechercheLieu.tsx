import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, FlatList, Text } from 'react-native';
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
import SadCloudLogo from '../assets/icons/svg/sad-cloud.svg';

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
        <GoBackButton onPress={navigation.goBack} iconType="arrowReturn" />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
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