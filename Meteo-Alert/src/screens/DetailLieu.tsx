import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import { useTranslation } from 'react-i18next';
import Meteo from '../models/valueObject/Meteo';
import { useLieu } from '../services/context/LieuContext';
import Title from '../components/atoms/Title';
import TimeAgoText from '../components/atoms/TimeAgoText';
import ListeInfoMeteo from '../components/molecules/ListInfoMeteo';
import GoBackButton from '../components/atoms/GoBackButton';

const DetailLieu = () => {
  const { t } = useTranslation();
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
      <GoBackButton iconType='arrowReturn'/>

      <View style={styles.container}>
        <Title text={lieu?.nom} fontSize={50} />
        <Title text={lieu?.region} fontSize={20} />
        <TimeAgoText lastUpdateDate={meteo?.heureActualisation} fontSize={15} />

        <View style={styles.details}>
          <Title text={t("detailLieu.releveDirect")} fontSize={22} />
          <ScrollView showsVerticalScrollIndicator={false}>
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
  details: {
    marginTop: 20,
    marginBottom: 120
  }
});

export default DetailLieu;
