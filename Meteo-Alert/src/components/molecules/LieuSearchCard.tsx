import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Lieu from '../../models/valueObject/Lieu';
import LieuxFavorisBuilder from '../../models/builder/LieuxFavorisBuilder';
import { useUser } from '../../services/context/UserContext';

interface LieuSearchCardProps {
  lieu: Lieu;
}

const LieuSearchCard: React.FC<LieuSearchCardProps> = ({ lieu }) => {
  const { utilisateur } = useUser();
  // const [isFavorite, setIsFavorite] = useState(LieuxFavorisBuilder.isLieuAlreadyExist(lieu));
  const [isFavorite, setIsFavorite] = useState(false); // TODO

  const handleToggleFavorite = () => {
    if (utilisateur) {
      if (isFavorite) {
        LieuxFavorisBuilder.supprimerLieuFavori(lieu, utilisateur.uid);
      } else {
        LieuxFavorisBuilder.ajouterLieuFavori(lieu, utilisateur.uid);
      }
      setIsFavorite(!isFavorite);
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
          <Text>{isFavorite ? 'Retirer' : 'Ajouter'}</Text>
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