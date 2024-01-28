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
      fontFamily: 'Karla-Medium',
      fontWeight: '400',
      fontSize: fontSize,
      lineHeight: fontSize, // Fixe la hauteur du texte pour une seule ligne
    },
  });

  return (
    <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
      {text || ''}
    </Text>
  );
};

export default Title;
