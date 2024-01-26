import React from 'react';
import { FlatList } from 'react-native';
import Lieu from '../../models/valueObject/Lieu';
import LieuCard from './LieuCard';

interface LieuListProps {
  lieux: ReadonlyArray<Lieu>;
}

const LieuList: React.FC<LieuListProps> = ({ lieux }) => {
  return (
    <FlatList
      data={lieux}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false} // Ne pas afficher la barre de défilement
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => <LieuCard lieu={item} />}
    />
  );  
};

export default LieuList;
