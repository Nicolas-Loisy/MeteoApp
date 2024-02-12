import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Logo from './Logo';

interface CriteriaProps {
  valid: boolean;
  text: string;
}

const Criteria: React.FC<CriteriaProps> = ({ valid, text }) => {
    const logoStyle = valid ? '#1E375A' : '#C83434'; // Couleur bleue #1E375A pour le logo valid ET Couleur rouge #C83434 pour le logo invalid

    return (
        <View style={styles.container}>
        {valid ? (
            <Logo imageSource={require('../../assets/icons/circle-check-regular.png')} color={logoStyle} size={22}/>
        ) : (
            <Logo imageSource={require('../../assets/icons/circle-xmark-regular.png')} color={logoStyle} size={22}/>
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
  text: {
    color: '#1E375A',
    fontSize: 16,
    fontStyle: 'normal',
  },
});

export default Criteria;