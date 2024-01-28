import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, ScrollView } from 'react-native';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import { useTranslation } from 'react-i18next';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import ArrowReturn from '../assets/icons/svg/arrow-left-short.svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Meteo from '../models/valueObject/Meteo';
import { useLieu } from '../services/context/LieuContext';
import Title from '../components/atoms/Title';
import TimeAgoText from '../components/atoms/TimeAgoText';
import ListeInfoMeteo from '../components/molecules/ListInfoMeteo';

const DetailLieu = () => {
  const { t } = useTranslation();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { lieu } = useLieu();
  const [meteo, setMeteo] = useState<Meteo | undefined>();

  useEffect(() => {
    const fetchMeteo = async () => {
      if (lieu) {
        const meteoData = await lieu.getMeteo();
        setMeteo(meteoData);
      }
    };

    fetchMeteo();
  }, [lieu]);

  return (
    <LayoutTemplate>
      <ArrowReturn onPress={() => navigation.goBack()} style={styles.arrowReturn} />

      <View style={styles.container}>
        <Title text={lieu?.nom} fontSize={50} />
        <Title text={lieu?.region} fontSize={20} />
        <TimeAgoText lastUpdateDate={meteo?.heureActualisation} fontSize={15} />

        <View style={styles.details}>
          <Title text={t("detailLieu.releveDirect")} fontSize={22} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <ListeInfoMeteo meteo={meteo} blacklist={['heureActualisation']} />
            <ListeInfoMeteo meteo={meteo} blacklist={['heureActualisation']} />
          </ScrollView>
        </View>

      </View>
    </LayoutTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 40,
    marginTop: 35,
  },
  arrowReturn: {
    left: Dimensions.get('window').width * 0.10,
    position: 'absolute',
    top: 30,
    zIndex: 1,
    width: 60,
    height: 60,
    marginLeft: -25,
  },
  details: {
    marginTop: 20,
    marginBottom: 120
  }
});

export default DetailLieu;
