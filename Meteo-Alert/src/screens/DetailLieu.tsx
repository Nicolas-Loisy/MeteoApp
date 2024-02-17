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
import TrashButton from '../components/atoms/TrashButton';
import ReglageAlerte from '../components/molecules/ReglageAlerte';
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
  const { utilisateur, lieuxFavoris, setSeuilPersonnalise, supprimerLieuFavori } = useUtilisateur();

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
        const meteoData = await lieu.getMeteo(utilisateur.reglageApp.systemeMesure);
        setMeteo(meteoData);
      }
    };

    fetchMeteo();
  }, [lieu, utilisateur]);

  const handleSupprimerLieuFavori = async () => {
    if (utilisateur && lieu) {
      await supprimerLieuFavori(lieu);
      navigation.navigate('Accueil');
    }
  };

  return (
    <LayoutTemplate>
      <View style={styles.actionButton}>
        <GoBackButton onPress={navigation.goBack} iconType='arrowReturn'/>
        <TrashButton onPress={handleSupprimerLieuFavori} />
      </View>

      <View style={styles.container}>
        <Title text={lieu?.nom} fontSize={50} />
        <Title text={lieu?.region} fontSize={20} />
        <TimeAgoText lastUpdateDate={meteo?.heureActualisation} fontSize={15} />

        <View style={styles.details}>
          <ScrollView showsVerticalScrollIndicator={false}>          
            <Title text={t("detailLieu.releveDirect")} fontSize={22} />
            <ListeInfoMeteo meteo={meteo} blacklist={['heureActualisation']} />
            
            <ReglageAlerte lieu={lieu} />
            
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
    marginTop: 15,
    height: '97%',
    // borderBottomColor: 'white',
    // borderBottomWidth: 1
  },
  details: {
    marginTop: 20,
    flex: 1,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default DetailLieu;
