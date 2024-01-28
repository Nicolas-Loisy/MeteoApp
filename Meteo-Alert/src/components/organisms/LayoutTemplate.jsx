import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LayoutTemplate = ({ children }) => {
  return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.8 }}
        colors={['#F8EBFF', '#AAD0EE', '#40A3DA']}
        style={styles.container}
      >
        <View style={styles.header}>
          {/* Contenu de l'en-tête */}
        </View>

        <View style={styles.content}>
          {children}
        </View>

        <View style={styles.footer}>
          {/* Contenu du pied de page */}
        </View>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // Styles de l'en-tête
  },
  content: {
    flex: 1, // Pour occuper tout l'espace restant
    padding: 20, // Marge intérieure commune à tous les écrans
  },
  footer: {
    // Styles du pied de page
  },
});

export default LayoutTemplate;
