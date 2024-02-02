import React, { useState, useEffect } from 'react';
import Navigation from './src/navigation/Navigation';
import { AccountProvider } from './src/services/compteUtilisateur/AccountContext';
import * as NavigationBar from 'expo-navigation-bar';
import * as Font from 'expo-font';
import { Text } from 'react-native';
import './src/services/i18n/i18n';
import { UserProvider } from './src/services/context/UserContext';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { LieuProvider } from './src/services/context/LieuContext';
import { LieuxFavorisProvider } from './src/services/context/LieuxFavorisContext';

const App = () => {

  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Inter-Black': require('./src/assets/fonts/Inter-Black.ttf'),
        'Inter-Bold': require('./src/assets/fonts/Inter-Bold.ttf'),
        'Inter-ExtraBold': require('./src/assets/fonts/Inter-ExtraBold.ttf'),
        'Inter-ExtraLight': require('./src/assets/fonts/Inter-ExtraLight.ttf'),
        'Inter-Light': require('./src/assets/fonts/Inter-Light.ttf'),
        'Inter-Medium': require('./src/assets/fonts/Inter-Medium.ttf'),
        'Inter-Regular': require('./src/assets/fonts/Inter-Regular.ttf'),
        'Inter-SemiBold': require('./src/assets/fonts/Inter-SemiBold.ttf'),
        'Inter-Thin': require('./src/assets/fonts/Inter-Thin.ttf'),
        'Jomhuria-Regular': require('./src/assets/fonts/Jomhuria-Regular.ttf'),
        'Karla-Medium': require('./src/assets/fonts/Karla-Medium.ttf'),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>; // Ou affiche un écran de chargement pendant le chargement de la police
  }


  // NavigationBar.setBackgroundColorAsync("black");
  // On gère la navigation bar pour les appareils sous Android
  if (/Android/i.test(navigator.userAgent)) {
    NavigationBar.setBehaviorAsync('overlay-swipe');
    NavigationBar.setVisibilityAsync('hidden');
  }


  return (
    <UserProvider>
      <AccountProvider>
      <LieuxFavorisProvider>
      <LieuProvider>

          <AlertNotificationRoot>
            <Navigation />
          </AlertNotificationRoot>

      </LieuProvider>
      </LieuxFavorisProvider>
      </AccountProvider>
    </UserProvider>
  );
};

export default App;