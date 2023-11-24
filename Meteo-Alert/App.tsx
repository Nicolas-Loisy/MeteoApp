import React, { useState, useEffect } from 'react';
import Navigation from './navigation/Navigation';
import { UserProvider } from './services/compteUtilisateur/UserContext';
import * as NavigationBar from 'expo-navigation-bar';
import * as Font from 'expo-font';
import {Text} from 'react-native';


const App = () => {
  
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>; // Ou affiche un écran de chargement pendant le chargement de la police
  }


  // NavigationBar.setBackgroundColorAsync("black");
  NavigationBar.setBehaviorAsync('overlay-swipe');
  NavigationBar.setVisibilityAsync('hidden');

  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
};

export default App;