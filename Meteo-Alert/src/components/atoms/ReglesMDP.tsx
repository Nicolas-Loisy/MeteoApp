import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { t } from 'i18next';

import Logo from './Logo';

type Props = {
  rules: Record<string, boolean>;
};

const ReglesMDP: React.FC<Props> = ({ rules }) => {
  return (
    <View>
      {/* <Text style={styles.title}>Summary Rules:</Text> */}
      <View style={styles.listContainer}>
        {Object.entries(rules).map(([key, value]) => (
          <View key={key} style={styles.listItem}>
            <Logo 
              imageSource={value ? require('../../assets/icons/circle-check-regular.png') : require('../../assets/icons/circle-xmark-regular.png')} 
              size={18} 
              color= {value ? '#1E375A' : '#C83434'}
            />
            <Text>{t("summaryRules." + key) }</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    marginLeft: -80,
    marginBottom: 20
  },
  listItem: {
    marginBottom: 5,
    flexDirection: 'row',
    paddingVertical: 1,
  },
});

export default ReglesMDP;
