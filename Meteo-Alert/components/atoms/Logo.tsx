import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

interface LogoProps {
  imageSource: any; // Remplacez 'any' par le type réel de votre source d'image
  size?: number; // Taille optionnelle du logo
  color?: string; // Couleur optionnelle du logo
  marginRight?: number; // Marge optionnelle autour du logo
}

const Logo: React.FC<LogoProps> = ({ imageSource, size = 20, color = '#1E375A', marginRight = 10 }) => {
  return (
    <View style={[styles.container, { width: size, height: size, marginRight }]}>
      <Image
        source={imageSource}
        style={[styles.logoImage, { tintColor: color }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent', // Fond transparent pour montrer la couleur du logo
    borderRadius: 4,
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
});

export default Logo;
