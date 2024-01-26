import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useAccountContext } from '../../services/compteUtilisateur/AccountContext';
import Button from '../atoms/Button';
import { t } from 'i18next';
import Logo from '../atoms/Logo';
import { useUser } from '../../services/context/UserContext';

interface VoletParametreProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoletParametre: React.FC<VoletParametreProps> = ({ isOpen, onClose }) => {
  
  const { serviceCompte } = useAccountContext();
  const handleDeconnexion = () => {
    serviceCompte.deconnexion();
  };

  const { utilisateur } = useUser();


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
          <View style={styles.closeButtonLogo} >
            <Logo imageSource={require('../../assets/icons/icon-refus.png')} color='white' size={30}/>
          </View>
        </TouchableOpacity>
        
        {/* Contenu du volet */}
        <View style={styles.voletContent} >
          <Text style={styles.text}>{utilisateur?.getPrenom()}</Text>
          <Text style={styles.text}>{utilisateur?.getMail()}</Text>

          {/* Bouton de connexion */}
          <Button
            onPress={handleDeconnexion}
            title={t('voletParametre.deconnexion')}
            styleBtn="noBg"
          />
        </View>
        
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
  voletContent: {
    marginTop: 50,
    height: "90%",
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    marginBottom: 30,
  },
  closeButtonLogo: {
    color: '#FFF',
    fontSize: 16,
    padding: 10,
  },
  text: {
    color: "white",
    marginLeft: 20,
    fontSize: 15
  }
  // Styles pour le contenu du volet
});

export default VoletParametre;
