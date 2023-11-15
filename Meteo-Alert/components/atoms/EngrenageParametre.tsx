import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface EngrenageParametreProps {
  onOpenVolet: () => void;
}

const EngrenageParametre: React.FC<EngrenageParametreProps> = ({ onOpenVolet }) => {
  return (
    <TouchableOpacity onPress={onOpenVolet}>
      {/* Logo engrenage */}
      <Text style={styles.logo}>⚙️</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logo: {
    fontSize: 36,
  },
});

export default EngrenageParametre;
