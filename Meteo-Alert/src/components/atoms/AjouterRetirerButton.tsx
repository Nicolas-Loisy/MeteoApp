import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import PlusAjouter from '../../assets/icons/svg/plus-ajouter.svg';
import MoinsRetirer from '../../assets/icons/svg/moins-retirer.svg';

interface AjouterRetirerButtonProps {
    onPress: () => void;
    isAdd: boolean;
}

const AjouterRetirerButton: React.FC<AjouterRetirerButtonProps> = ({ isAdd = true, onPress }) => {
    const Icon = isAdd ? PlusAjouter : MoinsRetirer;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={isAdd ? styles.plusAjouter : styles.moinsRetirer}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        >
            <Icon />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    plusAjouter: {
        width: 30,
        height: 30,
        zIndex: 1
    },
    moinsRetirer: {
        width: 30,
        height: 30,
        zIndex: 1
    }
});

export default AjouterRetirerButton;
