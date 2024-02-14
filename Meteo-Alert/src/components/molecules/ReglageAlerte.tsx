import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TextInput } from 'react-native';
import Button from '../../components/atoms/Button';
import meteoType from '../../models/types/meteoType';
import Title from '../atoms/Title';
import Lieu from '../../models/valueObject/Lieu';
import { useUtilisateur } from '../../services/context/UtilisateurContext';
import { t } from 'i18next';

interface Props {
  lieu: Readonly<Lieu> | null;
}

const ReglageAlerte: React.FC<Props> = ({ lieu }) => {

  const { setSeuilPersonnalise } = useUtilisateur();
  const label = t("reglageAlerte.label", { returnObjects: true }) as Record<string, string>;
  

  const [critere, setSeuilPersonnalise] = useState(false);




  return (
    <>
      <View style={styles.title}>
        <Title text={t('reglageAlerte.title')} fontSize={22} />
      </View>

      {lieu?.getReglageAlerte().map((alerte) => (
        <View key={alerte.typeEvenement}>

          <View style={styles.alertTitle}>
            <Title text={t('reglageAlerte.' + alerte.typeEvenement)} fontSize={20} />
            <Switch
              trackColor={{false: '#767577', true: '#C7E9FF'}}
              thumbColor={alerte.isActiver ? '#1E375A' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={null}
              value={alerte.isActiver}
            />
          </View>

          <View>
            {Object.entries(alerte.getCritere()).map(([key, value]) => (
              <View key={key}>
                <Text style={styles.alertText}>
                  {label[key]} {/* < ou > */} {value} {/* unité */}
                </Text>
                

                {/* TODO Faire un composant CritereInput props => critere / val / ... */}
                <TextInput
                  keyboardType='numeric'
                  onChangeText={(value) => setSeuilPersonnalise(lieu.key, alerte.typeEvenement, key as keyof meteoType, Number(value))}
                  // value={String(2)}
                  style={null}
                  placeholder='Number'
                  maxLength={10}
                />

                {/* <Button
                  onPress={() => setSeuilPersonnalise(lieu.key, alerte.typeEvenement, key as keyof meteoType, ++value)}
                  title="++ Valeur"
                  styleBtn="whiteBg"
                /> */}

              </View>
            ))}
          </View>

        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    marginBottom: 10
  },
  alertTitle: {
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  alertText: {
    color: '#1E375A',
    fontSize: 16,
    fontFamily: 'Karla-Medium'
  }
});

export default ReglageAlerte;
