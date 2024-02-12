import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Trash from '../../assets/icons/svg/trash-fill.svg';

interface GoBackButtonProps {
    onPress: () => void;
}

const TrashButton: React.FC<GoBackButtonProps> = ({ onPress }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={ styles.trash }
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        >
            <Trash />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    trash: {
        width: 30,
        height: 30,
        zIndex: 1,
    }
});

export default TrashButton;
