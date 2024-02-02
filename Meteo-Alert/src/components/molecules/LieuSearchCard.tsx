import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Lieu from '../../models/valueObject/Lieu';
import { useUser } from '../../services/context/UserContext';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLieuxFavoris } from '../../services/context/LieuxFavorisContext';

interface LieuSearchCardProps {
  lieu: Readonly<Lieu>;
}

const LieuSearchCard: React.FC<LieuSearchCardProps> = ({ lieu }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { utilisateur } = useUser();
  const { lieuxFavoris, setLieuxFavoris } = useLieuxFavoris();
  const [ isFavori, setFavori ] = useState<boolean>(false);

  useEffect(() => {
    if (utilisateur) {
      const isLieuFav = lieuxFavoris.some((lieuFav: Readonly<Lieu>) => lieuFav.key === lieu.key);  
      setFavori(isLieuFav);
    }
  }, [utilisateur, lieu]);
  
  const handleToggleFavorite = async () => {
    if (utilisateur) {
      if (isFavori) {
        await utilisateur.supprimerLieuFavori(lieu);
      } else {
        await utilisateur.ajouterLieuFavori(lieu);
      }
      setLieuxFavoris(utilisateur.getLieuxFavoris());
      navigation.navigate('Accueil');
    }
  };
  

  return (
    <Pressable style={styles.card} onPress={handleToggleFavorite}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.cityName}>{lieu.nom}</Text>
          <Text style={styles.regionName}>{lieu.region}</Text>
          <Text style={styles.paysName}>{lieu.pays}</Text>
        </View>

        <View style={styles.favoriteButton}>
          <Text>{isFavori ? 'Retirer' : 'Ajouter'}</Text>
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