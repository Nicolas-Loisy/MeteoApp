import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Lieu from '../../models/valueObject/Lieu';
import LieuxFavorisBuilder from '../../models/builder/LieuxFavorisBuilder';
import Utilisateur from '../../models/Utilisateur';

interface LieuSearchCardProps {
  lieu: Lieu;
  lieuxFavorisBuilder: LieuxFavorisBuilder;
}

const LieuSearchCard: React.FC<LieuSearchCardProps> = ({ lieu, lieuxFavorisBuilder }) => {
  const [isFavorite, setIsFavorite] = useState(lieuxFavorisBuilder.isLieuAlreadyExist(lieu));

  const handleToggleFavorite = () => {
    const uidUtilisateur = 'je sais pas comment récupérer luid de l utilisateur';

    if (isFavorite) {
      lieuxFavorisBuilder.supprimerLieu(lieu.getNom(), lieu.getRegion(), lieu.getPays());
    } else {
      lieuxFavorisBuilder.ajouterLieu(lieu, uidUtilisateur);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Pressable style={styles.card} onPress={handleToggleFavorite}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.cityName}>{lieu.getNom()}</Text>
          <Text style={styles.regionName}>{lieu.getRegion()}</Text>
          <Text style={styles.paysName}>{lieu.getPays()}</Text>
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