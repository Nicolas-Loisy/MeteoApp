import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ClickableTextProps {
  text: string;
  onPress: () => void;
}

const ClickableText: React.FC<ClickableTextProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.clickableText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  clickableText: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
  },
});

export default ClickableText;
