import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface TitleProps {
  text?: string;
  fontSize: number;
}

const Title: React.FC<TitleProps> = ({ text, fontSize }) => {
  const styles = StyleSheet.create({
    title: {
      color: '#1E375A',
      fontFamily: 'Karla-Bold',
      fontWeight: '400',
      fontSize: fontSize,
      lineHeight: fontSize + 10, // Fixe la hauteur du texte pour une seule ligne, +10 pour les accents
    },
  });

  return (
    <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
      {text || ''}
    </Text>
  );
};

export default Title;
