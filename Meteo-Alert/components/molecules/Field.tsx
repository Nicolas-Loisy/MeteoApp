import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo from '../atoms/Logo';

interface FieldProps {
  iconSource: any; // Source de l'image
  fieldName: string; // Nom du champ
}

const Field: React.FC<FieldProps> = ({ iconSource, fieldName }) => {
  return (
    <View style={styles.container}>
      <Logo imageSource={iconSource} size={25}/>
      <Text style={styles.fieldName}>{fieldName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 303,
    height: 53,
    flexShrink: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#C7E9FF',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  fieldName: {
    color: '#2D3E44',
    fontSize: 14,
  },
});

export default Field;