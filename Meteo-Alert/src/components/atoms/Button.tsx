import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  styleBtn?: 'whiteBg' | 'noBg';
}

const Button: React.FC<ButtonProps> = ({ onPress, title, styleBtn = 'whiteBg' }) => {
  // Styles conditionnels
  // View
  const conditionalStyles: { [key: string]: StyleProp<ViewStyle> } = {
    whiteBg: {
      borderRadius: 30,
      borderWidth: 1,
      borderColor: '#1E375A',
      backgroundColor: '#FFF',
    },
    noBg: {
      borderRadius: 30,
      borderWidth: 2,
      borderColor: '#fff',
      backgroundColor: 'transparent',
    },
  };

  // Text
  const conditionalStylesText: { [key: string]: StyleProp<TextStyle> } = {
    whiteBg: {
      color: '#1E375A',
    },
    noBg: {
      color: '#fff',
    },
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, conditionalStyles[styleBtn]]}>
        <Text style={[styles.buttonText, conditionalStylesText[styleBtn]]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Styles communs
const styles = StyleSheet.create({
  button: {
    width: 303,
    height: 53,
    flexShrink: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    // fontWeight: 'bold',
  },
});

export default Button;
