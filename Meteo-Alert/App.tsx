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
        'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
        'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
        'Inter-ExtraBold': require('./assets/fonts/Inter-ExtraBold.ttf'),
        'Inter-ExtraLight': require('./assets/fonts/Inter-ExtraLight.ttf'),
        'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
        'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
        'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
        'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
        'Inter-Thin': require('./assets/fonts/Inter-Thin.ttf'),
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