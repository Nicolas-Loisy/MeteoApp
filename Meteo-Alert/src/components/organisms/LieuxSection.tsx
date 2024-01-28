import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LieuList from '../molecules/LieuList';
import Lieu from '../../models/valueObject/Lieu';

interface LieuxSectionProps {
  lieux: ReadonlyArray<Lieu>;
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
    marginTop: 30,
    marginBottom: 30,
    width: "100%",
    // paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
