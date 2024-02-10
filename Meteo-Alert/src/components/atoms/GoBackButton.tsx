import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Croix from '../../assets/icons/svg/vector.svg';
import ArrowReturn from '../../assets/icons/svg/arrow-left-short.svg';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const GoBackButton = ({ iconType = 'croix' }) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const Icon = iconType === 'arrowReturn' ? ArrowReturn : Croix;

    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={iconType === 'arrowReturn' ? styles.arrowReturn : styles.croix }
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}>
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
