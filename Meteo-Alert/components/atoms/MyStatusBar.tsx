import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';

interface StatusBarProps {
}

const MyStatusBar: React.FC<StatusBarProps> = ({ }) => {
  return (
    <StatusBar
        animated={true}
        backgroundColor="black"
        barStyle={"light-content"}
        showHideTransition={"fade"}
        hidden={false}
    />
  );
};

const styles = StyleSheet.create({
});

export default MyStatusBar;
