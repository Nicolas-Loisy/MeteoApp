import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
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
import Password from '../models/datatype/Password';
import SummaryRules from '../components/atoms/SummaryRules';

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

  const [passwordValue, setPasswordValue] = useState<string>("");
  const [password, setPassword] = useState<Password | null>(null);
  const passwordRules = Password.checkRules(passwordValue);
  const handlePasswordChange = (value: string) => {
    setPasswordValue(value);
  }

  useEffect(() => {
    const rules = Password.checkRules(passwordValue);
    if (!Object.values(rules).includes(false)) {
      setPassword(new Password(passwordValue));
    }
  }, [passwordValue]);

  useEffect(() => {
    console.log(password);
  }, [password]);


  return (
    <>
    <MyStatusBar/>
    <LayoutTemplate>
      <View style={styles.container}>
        <Text>{t('demo.test')}</Text> 
        <Text>{t('demo.testInjection', { number: '1234567890' })}</Text> 
        <ClickableText
            text="ClickableText"
            onPress={() => navigation.navigate('Connexion')}
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
        <Field onChangeText={handlePasswordChange} value={passwordValue} iconSource={require('../assets/icons/key-solid.png')} fieldName="Mot de passe" isPassword/>
        <SummaryRules
          rules={passwordRules}
        />
      
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
});

export default Demo;
