import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';

const MyStatusBar = ({ }) => {
  return (
    <StatusBar
      animated={true}
      backgroundColor="black"
      barStyle={"dark-content"}
      showHideTransition={"fade"}
      hidden={false}
    />
  );
};

const styles = StyleSheet.create({
});

export default MyStatusBar;
