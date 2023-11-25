import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface VoletParametreProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoletParametre: React.FC<VoletParametreProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={isOpen}
      onRequestClose={onClose}
      // statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animatable.View
        animation={isOpen ? 'slideInRight' : 'slideOutRight'}
        duration={600}
        style={styles.volet}
      >
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Fermer</Text>
        </TouchableOpacity>
        {/* Contenu du volet */}
        {/* Vous pouvez ajouter ici les éléments de contenu du volet */}
      </Animatable.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  volet: {
    width: 322,
    height: '100%',
    backgroundColor: '#1E375A',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    padding: 10,
  },
  // Styles pour le contenu du volet
});

export default VoletParametre;
