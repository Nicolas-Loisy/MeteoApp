import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

type Props = {
  rules: Record<string, boolean>;
};

const SummaryRules: React.FC<Props> = ({ rules }) => {
  return (
    <View>
      <Text style={styles.title}>Summary Rules:</Text>
      <View style={styles.listContainer}>
        {Object.entries(rules).map(([key, value]) => (
          <View key={key} style={styles.listItem}>
            <Text>{key}: {value ? 'OK' : 'NOOK'}</Text>
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
    marginLeft: 20,
  },
  listItem: {
    marginBottom: 5,
  },
});

export default SummaryRules;
