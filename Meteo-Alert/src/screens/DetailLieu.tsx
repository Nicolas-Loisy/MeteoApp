import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';

import Lieu from '../models/valueObject/Lieu';
import Meteo from '../models/valueObject/Meteo';
import meteoType from '../models/types/meteoType';

import { useUtilisateur } from '../services/context/UtilisateurContext';

import Title from '../components/atoms/Title';
import TimeAgoText from '../components/atoms/TimeAgoText';
import GoBackButton from '../components/atoms/GoBackButton';
import Button from '../components/atoms/Button';
import ListeInfoMeteo from '../components/molecules/ListInfoMeteo';
import LayoutTemplate from '../components/organisms/LayoutTemplate';

type params = {
  params: {
    key: string
  }
}

const DetailLieu = () => {
  const { t } = useTranslation();
  const { lieuxFavoris, setSeuilPersonnalise } = useUtilisateur();
  const { utilisateur } = useUtilisateur();

  const params = useRoute() as params;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [meteo, setMeteo] = useState<Meteo | undefined>();
  const [ lieu, setLieu ] = useState<Readonly<Lieu> | null>(null);

  useEffect(() => {
    const lieu = lieuxFavoris.find(lieuFav => lieuFav.key === params.params.key) ?? null;
    setLieu(lieu);
  }, [lieuxFavoris]);

  useEffect(() => {
    const fetchMeteo = async () => {
      if (lieu && utilisateur) {
        const meteoData = await lieu.getMeteo(utilisateur.getReglageApp().getSystemeMesure());
        setMeteo(meteoData);
      }
    };

    fetchMeteo();
  }, [lieu, utilisateur]);

  return (
    <LayoutTemplate>
      <GoBackButton onPress={navigation.goBack} iconType='arrowReturn'/>

      <View style={styles.container}>
        <Title text={lieu?.nom} fontSize={50} />
        <Title text={lieu?.region} fontSize={20} />
        <TimeAgoText lastUpdateDate={meteo?.heureActualisation} fontSize={15} />

        <View style={styles.details}>
          <Title text={t("detailLieu.releveDirect")} fontSize={22} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <ListeInfoMeteo meteo={meteo} blacklist={['heureActualisation']} />
            {
              lieu?.getReglageAlerte().map((alerte) => {
                return (
                  <View key={alerte.typeEvenement}>
                    <Title text={alerte.typeEvenement} fontSize={20}/>
                    <Text>{alerte.isActiver}</Text>
                    <View>
                    {
                      Object.entries(alerte.getCritere()).map(([key, value]) => {
                        return (
                          <View key={key}>
                            <Text>{key} = {value}</Text>
                            <Button
                                onPress={() => setSeuilPersonnalise(lieu.key, alerte.typeEvenement, key as keyof meteoType, ++value)}
                                title="++ Valeur"
                                styleBtn="whiteBg"
                            />
                          </View>
                        );
                      })
                    }
                    </View>
                  </View>
                );
              })
            }
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
