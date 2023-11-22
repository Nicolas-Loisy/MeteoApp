import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface CriteriaProps {
  valid: boolean;
  text: string;
}

const Criteria: React.FC<CriteriaProps> = ({ valid, text }) => {
    const logoStyle = valid ? styles.validLogo : styles.invalidLogo;

    return (
        <View style={styles.container}>
        {valid ? (
            <Image source={require('../../assets/icons/circle-check-regular.png')} style={[styles.logo, logoStyle]} />
        ) : (
            <Image source={require('../../assets/icons/circle-xmark-regular.png')} style={[styles.logo, logoStyle]} />
        )}
        <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 3,
  },
  logo: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  validLogo: {
    tintColor: '#1E375A', // Couleur bleue pour le logo valid
  },
  invalidLogo: {
    tintColor: '#C83434', // Couleur rouge pour le logo invalid
  },
  text: {
    color: '#1E375A',
    fontSize: 16,
    fontStyle: 'normal',
  },
});

export default Criteria;