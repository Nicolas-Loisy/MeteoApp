import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InfoMeteoProps {
  label: string;
  value: string;
}

const InfoMeteo: React.FC<InfoMeteoProps> = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value} >{value}</Text>
      </View>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingBottom: 8,
    maxWidth: '100%',
    minWidth: '90%'
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: '#1E375A',
  },
  value: {
    fontSize: 16,
    color: '#1E375A',
    fontWeight: 'bold'
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginTop: 8,
  },
});

export default InfoMeteo;
