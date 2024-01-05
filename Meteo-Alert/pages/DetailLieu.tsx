import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import { useTranslation } from 'react-i18next';
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Lieu from '../models/valueObject/Lieu';
import Croix from '../assets/icons/svg/vector.svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUser } from '../services/context/UserContext';
import { RootStackParamList } from '../components/molecules/LieuCard';
import Meteo from '../models/valueObject/Meteo';

type DetailLieuRouteProp = RouteProp<RootStackParamList, 'DetailLieu'>;
type lieuData = {
  nom: string;
  region: string;
  pays: string;
}

const DetailLieu = () => {
  const { t } = useTranslation();
  const label = t("detailLieu.label", { returnObjects: true }) as Record<string, string>;
  const { width } = Dimensions.get('window');
  const croixPosition = width * 0.10;
  const { utilisateur } = useUser();
  const route = useRoute<DetailLieuRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [lieuData, setLieuData] = useState<lieuData | null>(null);
  const [lieu, setLieu] = useState<Lieu | null>(null);
  const [meteo, setMeteo] = useState<Meteo | null>(null);

  useEffect(() => {
    if (route.params) setLieuData(route.params.lieuData);
  });

  useEffect(() => {
    if (utilisateur && lieuData) setLieu(utilisateur.lieuxFavoris.trouverLieu(lieuData.nom, lieuData.region, lieuData.pays)!);
  }, [utilisateur, lieuData]);

  useEffect(() => {
    const fetchMeteo = async () => {
      if (lieu) {
        try {
          const meteoData = await lieu.getMeteo(false);
          setMeteo(meteoData);
        } catch (error) {
          console.error("Error fetching meteo data:", error);
        }
      }
    };

    fetchMeteo();
  }, [lieu]);

  useEffect(() => {
    if (meteo)
      console.log("Debug : ", [meteo!.getTemperatureStr()]);
    else
      console.log("Debug : meteo n'est pas encore chargé");
  }, [meteo]);

  return (
    <LayoutTemplate>
      <Croix onPress={() => navigation.goBack()} style={[styles.croix, { left: croixPosition }]} />
      <View style={styles.container}>
        <Text>Nom du lieu: {lieu?.getNom()}</Text>
        <Text>Région: {lieu?.getRegion()}</Text>
        <Text>Pays: {lieu?.getPays()}</Text>

        {
          meteo &&
          (Object.keys(meteo) as Array<keyof Meteo>).map((key) => {
            if (meteo[key] && meteo[key] != undefined) {
              console.log("DEBUG :", meteo[key], );
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
