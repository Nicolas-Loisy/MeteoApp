import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import { useTranslation } from 'react-i18next';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import Croix from '../assets/icons/svg/vector.svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Meteo from '../models/valueObject/Meteo';
import { useLieu } from '../services/context/LieuContext';

const DetailLieu = () => {
  const { t } = useTranslation();
  const label = t("detailLieu.label", { returnObjects: true }) as Record<string, string>;
  
  const croixPosition = Dimensions.get('window').width * 0.10;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { lieu } = useLieu();
  const [meteo, setMeteo] = useState<Meteo | null>();

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
      <Croix onPress={() => navigation.goBack()} style={[styles.croix, { left: croixPosition }]} />
      <View style={styles.container}>
        <Text>Nom du lieu: {lieu?.nom}</Text>
        <Text>Région: {lieu?.region}</Text>
        <Text>Pays: {lieu?.pays}</Text>

        {
          meteo &&
          (Object.keys(meteo) as Array<keyof Meteo>).map((key) => {
            if (meteo[key] && meteo[key] != undefined) {
              return <Text key={key}>{`${label[key]}${meteo[key]}`}</Text>;
            }
          })
        }

      </View>
    </LayoutTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
    width: "100%",
    paddingBottom: 40,
    marginTop: 35,
  },
  croix: {
    position: 'absolute',
    top: 30,
    zIndex: 1,
  },
});

export default DetailLieu;
