import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Lieu from '../../models/valueObject/Lieu';
import { useNavigation } from '@react-navigation/core';
import Meteo from '../../models/valueObject/Meteo';

interface LieuSearchCardProps {
  lieu: Lieu;
}

const LieuSearchCard: React.FC<LieuSearchCardProps> = ({ lieu }) => {
  const [favorite, setFavorite] = useState(false);
  const navigation = useNavigation();

  const handleAddToFavorites = () => {
    // Rajouter la méthode
    setFavorite(!favorite);
  };

  return (
    <Pressable style={styles.card} onPress={handleAddToFavorites}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.cityName}>{lieu.getNom()}</Text>
          <Text style={styles.regionName}>{lieu.getRegion()}</Text>
          <Text style={styles.paysName}>{lieu.getPays()}</Text>
        </View>

        <View style={styles.favoriteButton}>
          <Text>{'Ajouter'}</Text>
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