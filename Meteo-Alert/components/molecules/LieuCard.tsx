import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Lieu from '../../models/valueObject/Lieu';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';

interface LieuCardProps {
  lieu: Lieu;
}

export type RootStackParamList = {
    DetailLieu: { 
        lieuData: { 
            nom: string; 
            region: string; 
            pays: string 
        }
    } | undefined;
};

const LieuCard: React.FC<LieuCardProps> = ({ lieu }) => {
  const [temperature, setTemperature] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const temperatureStr = (await lieu.getMeteo())?.getTemperatureStr();
        setTemperature(temperatureStr || 'N/A');
      } catch (error) {
        console.error('Error fetching temperature:', error);
        setTemperature('N/A');
      }
    };

    fetchTemperature();
  }, [lieu]);

  const handleCardPress = () => {
    // Naviguer vers la page DetailLieu avec les données du lieu
    navigation.navigate('DetailLieu' , { lieuData: { nom: lieu.getNom(), region: lieu.getRegion(), pays: lieu.getPays() } });
  };

  return (
    <Pressable style={styles.card} onPress={handleCardPress}>
      <Text style={styles.cardText}>{lieu.getNom()}</Text>
      <Text style={styles.cardText}>{temperature}</Text>
    </Pressable>
  );
};

export default LieuCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
});
