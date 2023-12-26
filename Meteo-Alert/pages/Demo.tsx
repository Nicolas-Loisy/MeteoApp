import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import EngrenageParametre from '../components/atoms/EngrenageParametre';
import VoletParametre from '../components/organisms/VoletParametre';
import MyStatusBar from '../components/atoms/MyStatusBar';
import ClickableText from '../components/atoms/ClickableText';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../components/atoms/Button';
import Criteria from '../components/atoms/Criteria';
import Field from '../components/molecules/Field';
import { useTranslation } from 'react-i18next';
import Croix from '../assets/icons/svg/vector.svg';

const Demo = () => {
  const { t } = useTranslation();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isVoletOpen, setIsVoletOpen] = useState(false);

  const handleOpenVolet = () => {
    setIsVoletOpen(true);
  };

  const handleCloseVolet = () => {
    setIsVoletOpen(false);
  };

  const { width } = Dimensions.get('window');
  const croixPosition = width * 0.10;

  return (
    <>
    <MyStatusBar/>
    <LayoutTemplate>
      <View style={styles.container}>
        <Croix onPress={() => navigation.goBack()} style={[styles.croix, { left: croixPosition }]} />
        <ClickableText
            text="ClickableText"
            onPress={() => navigation.navigate('RechercheLieu')}
        />
        <VoletParametre isOpen={isVoletOpen} onClose={handleCloseVolet} />
        <EngrenageParametre onOpenVolet={handleOpenVolet} />
        <Button
          onPress={handleOpenVolet}
          title="Button"
          styleBtn="whiteBg"
        />

        <Criteria valid={true} text="Critère 1" />
        <Criteria valid={false} text="Critère 2" />

        <Field onChangeText={() => null} iconSource={require('../assets/icons/at-solid.png')} fieldName="Adresse mail"/>
        <Field onChangeText={() => null} iconSource={require('../assets/icons/key-solid.png')} fieldName="Mot de passe" isPassword/>
      </View>
    </LayoutTemplate>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue', 
  },
  button: {
    borderWidth: 1,
    borderColor:'blue',
    padding: 10,
    borderRadius: 5,
  },
  croix: {
    position: 'absolute',
    top: 40, // Ajustez cette valeur selon votre préférence pour la position verticale
    zIndex: 1,
  },
});

export default Demo;
