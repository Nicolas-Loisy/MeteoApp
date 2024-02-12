import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/atoms/Button';
import meteoType from '../../models/types/meteoType';
import Title from '../atoms/Title';
import Lieu from '../../models/valueObject/Lieu';
import { useUtilisateur } from '../../services/context/UtilisateurContext';

interface Props {
  lieu: Readonly<Lieu> | null;
}

const ReglageAlerte: React.FC<Props> = ({ lieu }) => {

  const { setSeuilPersonnalise } = useUtilisateur();

  return (
    <>
      {lieu?.getReglageAlerte().map((alerte) => (
        <View key={alerte.typeEvenement}>
          <Title text={alerte.typeEvenement} fontSize={20} />
          <Text>{alerte.isActiver}</Text>
          <View>
            {Object.entries(alerte.getCritere()).map(([key, value]) => (
              <View key={key}>
                <Text>{key} = {value}</Text>
                <Button
                  onPress={() => setSeuilPersonnalise(lieu.key, alerte.typeEvenement, key as keyof meteoType, ++value)}
                  title="++ Valeur"
                  styleBtn="whiteBg"
                />
              </View>
            ))}
          </View>
        </View>
      ))}
    </>
  );
};

export default ReglageAlerte;
