import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';

import Lieu from '../../models/valueObject/Lieu';
import Meteo from '../../models/valueObject/Meteo';

import SnowSvg from '../../assets/icons/svg/thermometer-snow.svg';
import RainSvg from '../../assets/icons/svg/cloud-drizzle.svg';
import CloudSunSvg from '../../assets/icons/svg/cloud-sun.svg';
import SunSvg from '../../assets/icons/svg/sun.svg';
import CloudsSvg from '../../assets/icons/svg/clouds.svg';
import CloudSvg from '../../assets/icons/svg/cloudy.svg';
import CloudMoonSvg from '../../assets/icons/svg/cloud-moon.svg';
import MoonSvg from '../../assets/icons/svg/moon.svg';
import { useUtilisateur } from '../../services/context/UtilisateurContext';


interface LieuCardProps {
  lieu: Readonly<Lieu>;
}

const LieuCard: React.FC<LieuCardProps> = ({ lieu }) => {
  const [temperature, setTemperature] = useState<string | null>(null);
  const [meteo, setMeteo] = useState<Meteo | null>(null);

  const { utilisateur } = useUtilisateur();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    const fetchTemperature = async () => {
      if (utilisateur) {
        try {
          const meteo = await lieu.getMeteo(utilisateur.reglageApp.systemeMesure);
          setTemperature(meteo?.temperature.toString() || 'N/A');
          setMeteo(meteo);
        } catch (error) {
          console.error('Error fetching temperature:', error);
          setTemperature('N/A');
        }
      }      
    };

    fetchTemperature();
  }, [lieu, utilisateur]);

  const handleCardPress = () => {
    // Naviguer vers la page DetailLieu avec la key
    navigation.navigate('DetailLieu', { key: lieu.key });
  };

  const PICTO_TYPES = [
    { condition: () => meteo && meteo.neige !== undefined && meteo.neige.getValeur() > 0, component: SnowSvg },
    { condition: () => meteo && meteo.pluie !== undefined && meteo.pluie.getValeur() > 0, component: RainSvg },
    { condition: () => meteo && meteo.nuage !== undefined && meteo.nuage.getValeur() >= 0 && meteo.nuage.getValeur() < 25, component: meteo?.isDaytime() ? SunSvg : MoonSvg },
    { condition: () => meteo && meteo.nuage !== undefined && meteo.nuage.getValeur() >= 25 && meteo.nuage.getValeur() < 50, component: meteo?.isDaytime() ? CloudSunSvg : CloudMoonSvg },
    { condition: () => meteo && meteo.nuage !== undefined && meteo.nuage.getValeur() >= 50 && meteo.nuage.getValeur() < 75, component: CloudSvg },
    { condition: () => meteo && meteo.nuage !== undefined && meteo.nuage.getValeur() >= 75 && meteo.nuage.getValeur() <= 100, component: CloudsSvg },
  ];

  const generatePictoComponents = () => {
    const pictoComponents = [];
    for (const { condition, component } of PICTO_TYPES) {
      if (condition()) {
        pictoComponents.push(React.createElement(component, styles.pictoSvg));
      }
    }
  
    return pictoComponents.length > 0 ? pictoComponents : null;
  };

  return (
    <Pressable style={styles.card} onPress={handleCardPress}>
      <View style={styles.cardPicto}>
        {generatePictoComponents()?.map((picto, index) => (
          <React.Fragment key={index}>{picto}</React.Fragment>
        ))}
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.cardCity}>
          <Text style={styles.citySubtitles}>{lieu.region}{lieu.region && lieu.pays ? ' - ' : ''}{lieu.pays}</Text>
          <Text style={styles.cityName}>{lieu.nom}</Text>
        </View>

        <View style={styles.cardTemp}>
          <Text style={styles.temperature}>{temperature}</Text> 
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
  cardPicto: {
    width: '100%',
    alignItems: "flex-end",
    height: 'auto',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  cardContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cardCity: {
  },
  cardTemp: {
    alignSelf: 'flex-end',
    // alignSelf: 'center',
  },
  cityName: {
    fontSize: 30,
    fontFamily: 'Karla-Medium',
    color: 'white',
    marginRight: 16,
  },
  citySubtitles: {
    fontSize: 15,
    fontFamily: 'Karla-Medium',
    color: 'white',
    marginRight: 16,
  },
  temperature: {
    fontSize: 18,
    textAlign: 'right',
    color: 'white',
    fontWeight: 'bold',
  },
  pictoSvg: {
    width: 30,
    height: 30,
    marginLeft: 8,
    color: "#AAD4EF"
    // color: "#ffff"
  },
});

export default LieuCard;