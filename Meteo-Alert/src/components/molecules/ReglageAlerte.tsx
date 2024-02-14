import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Title from '../atoms/Title';
import Lieu from '../../models/valueObject/Lieu';
import { useUtilisateur } from '../../services/context/UtilisateurContext';
import { t } from 'i18next';
import EvenementEnum from '../../models/enum/EvenementEnum';
import meteoType from '../../models/types/meteoType';
import Critere from '../atoms/Critere';
import Meteo from '../../models/valueObject/Meteo';

interface Props {
  lieu: Readonly<Lieu> | null;
}

const ReglageAlerte: React.FC<Props> = ({ lieu }) => {

  const { setSeuilPersonnalise, setActiverAlerte } = useUtilisateur();

  const handleChangeCritere = async (typeEvenement: EvenementEnum, critere: keyof meteoType, nouvelleValeur: number) => {
    if (!lieu) throw new Error("Lieu ne peut pas être null");
    
    await setSeuilPersonnalise(lieu.key, typeEvenement, critere, nouvelleValeur);
  }

  const handleChangeActive = async (typeEvenement: EvenementEnum, bool: boolean) => {
    if (!lieu) throw new Error("Lieu ne peut pas être null");

    await setActiverAlerte(lieu.key, typeEvenement, bool);
  }

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
              thumbColor={alerte.getActiver() ? '#1E375A' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(bool) => handleChangeActive(alerte.typeEvenement, bool)}
              value={alerte.getActiver()}
            />
          </View>

          <View style={styles.criteres}>
            {Object.entries(alerte.getCritere()).map(([nomCritere, critere]) => {
              return (
                <View key={nomCritere}>
                  <Critere 
                    label={nomCritere} 
                    valeurDefaut={critere.valeur} 
                    operateurComparaison={critere.operateurComparaison}
                    unite={critere.uniteMesure}
                    onChange={(nouvelleValeur: number) => {
                      handleChangeCritere(alerte.typeEvenement, nomCritere as keyof meteoType, nouvelleValeur);
                    }}
                  />
                </View>
              )
            })}
          </View>

        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    alignItems: 'flex-start',
    marginBottom: 10
  },
  alertTitle: {
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  criteres: {
    marginBottom: 10
  }
});

export default ReglageAlerte;
