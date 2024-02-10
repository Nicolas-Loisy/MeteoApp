import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Croix from '../../assets/icons/svg/vector.svg';
import ArrowReturn from '../../assets/icons/svg/arrow-left-short.svg';

interface GoBackButtonProps {
    onPress: () => void;
    iconType: string;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ onPress, iconType = 'croix' }) => {
    const Icon = iconType === 'arrowReturn' ? ArrowReturn : Croix;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={iconType === 'arrowReturn' ? styles.arrowReturn : styles.croix }
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        >
            <Icon />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    croix: {
        width: 20,
        height: 20,
        zIndex: 1,
    },
    arrowReturn: {
        width: 20,
        height: 20,
        zIndex: 1,
    }
});

export default GoBackButton;
