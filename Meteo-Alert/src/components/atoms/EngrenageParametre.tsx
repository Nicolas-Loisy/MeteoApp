import React from 'react';
import { TouchableOpacity } from 'react-native';

import Logo from './Logo';

interface EngrenageParametreProps {
  onOpenVolet: () => void;
}

const EngrenageParametre: React.FC<EngrenageParametreProps> = ({ onOpenVolet }) => {
  return (
    <TouchableOpacity
      onPress={onOpenVolet}
      hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
    >
      <Logo imageSource={require('../../assets/icons/gear-solid.png')} size={30}/>
    </TouchableOpacity>
  );
};

export default EngrenageParametre;
