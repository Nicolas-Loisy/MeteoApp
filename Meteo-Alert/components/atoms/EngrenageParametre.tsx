import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

interface EngrenageParametreProps {
  onOpenVolet: () => void;
}

const EngrenageParametre: React.FC<EngrenageParametreProps> = ({ onOpenVolet }) => {
  return (
    <TouchableOpacity onPress={onOpenVolet}>
      <Image
        source={require('../../assets/icons/gear-solid.png')}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logo: {
    fontSize: 36,
  },
});

export default EngrenageParametre;
