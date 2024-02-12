import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useUtilisateur } from '../../services/context/UtilisateurContext';

import Lieu from '../../models/valueObject/Lieu';
import AjouterRetirerButton from '../atoms/AjouterRetirerButton';

interface LieuSearchCardProps {
  lieu: Readonly<Lieu>;
}

const LieuSearchCard: React.FC<LieuSearchCardProps> = ({ lieu }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { utilisateur, lieuxFavoris, ajouterLieuFavori, supprimerLieuFavori } = useUtilisateur();
  const [ isFavori, setFavori ] = useState<boolean>(false);

  useEffect(() => {
    if (lieuxFavoris) {
      const isLieuFav = lieuxFavoris.some((lieuFav: Readonly<Lieu>) => lieuFav.key === lieu.key);  
      setFavori(isLieuFav);
    }
  }, [lieu]);
  
  const handleToggleFavorite = async () => {
    if (utilisateur) {
      if (isFavori) {
        await supprimerLieuFavori(lieu);
      } else {
        await ajouterLieuFavori(lieu);
      }
      navigation.navigate('Accueil');
    }
  };
  
  return (
    <Pressable style={styles.card}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.cityName}>{lieu.nom}</Text>
          <Text style={styles.regionName}>{lieu.region}</Text>
          <Text style={styles.paysName}>{lieu.pays}</Text>
        </View>

        <View style={styles.favoriteButton}>
          <AjouterRetirerButton isAdd={!isFavori} onPress={handleToggleFavorite}/>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#477FA2', // #1E375A
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
    borderColor: 'white',
    borderWidth: 1,
    height: "auto"
  },
  cardContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cityName: {
    fontSize: 30,
    fontFamily: 'Karla-Medium',
    color: 'white',
    marginRight: 16,
  },
  paysName: {
    color: 'white',
    fontFamily: 'Karla-Medium',
    fontSize: 16,
  },
  regionName: {
    color: 'white',
    fontFamily: 'Karla-Medium',
    fontSize: 16,
  },
  favoriteButton: {
    justifyContent: 'center',
  },
});

export default LieuSearchCard;