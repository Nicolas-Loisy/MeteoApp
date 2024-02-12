import React from 'react';
import { View, StyleSheet } from 'react-native';

import LieuList from '../molecules/LieuList';
import Lieu from '../../models/valueObject/Lieu';

interface LieuxSectionProps {
  lieux: ReadonlyArray<Readonly<Lieu>>;
}

const LieuxSection: React.FC<LieuxSectionProps> = ({ lieux }) => {
  return (
    <View style={styles.lieuxSection}>
      <LieuList lieux={lieux} />
    </View>
  );
};

export default LieuxSection;

const styles = StyleSheet.create({
  lieuxSection: {
    flex: 1,
    marginTop: 20,
    marginBottom: 30,
    width: "100%",
    borderTopColor: 'white',
    borderTopWidth: 1,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  }
});
