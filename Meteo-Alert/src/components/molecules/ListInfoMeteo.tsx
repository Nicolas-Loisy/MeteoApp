import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import Meteo from '../../models/valueObject/Meteo';
import InfoMeteo from '../atoms/InfoMeteo';

interface ListeInfoMeteoProps {
  meteo?: Meteo;
  blacklist?: Array<keyof Meteo>;
}

const ListeInfoMeteo: React.FC<ListeInfoMeteoProps> = ({ meteo, blacklist = [] }) => {
  const { t } = useTranslation();
  const label = t("detailLieu.label", { returnObjects: true }) as Record<string, string>;
  return (
    <View style={styles.container}>
      {
        meteo &&
        (Object.keys(meteo) as Array<keyof Meteo>).map((key) => {
          if (meteo[key] && meteo[key] !== undefined && !blacklist.includes(key)) {
            return (
              <InfoMeteo
                key={key}
                label={label[key]}
                value={meteo[key].toString()}
              />
            );
          }
          return null;
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  }
});

export default ListeInfoMeteo;
