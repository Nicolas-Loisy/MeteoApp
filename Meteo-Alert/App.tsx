import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import Navigation from './src/navigation/Navigation';

import * as TaskManager from 'expo-task-manager';
import * as NavigationBar from 'expo-navigation-bar';
import * as Font from 'expo-font';
import * as BackgroundFetch from 'expo-background-fetch';

import './src/services/i18n/i18n';

import { AlertNotificationRoot } from 'react-native-alert-notification';
import { UtilisateurProvider } from './src/services/context/UtilisateurContext';
import { GeographieProvider } from './src/services/context/GeographieContext';
import { registerBackgroundFetchAsync } from './src/services/background/BackgroundTaskService';

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState<BackgroundFetch.BackgroundFetchStatus | null>(null);

  const BACKGROUND_FETCH_TASK = 'background-fetch';

  useEffect(() => {
    async function setupBackgroundTask() {
      await registerBackgroundFetchAsync();
      const currentStatus = await BackgroundFetch.getStatusAsync();
      if (currentStatus !== null) {
        setStatus(currentStatus);
        const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
        setIsRegistered(isRegistered);
      } else {
        console.error("Failed to get background fetch status.");
      }
    }

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
        'Karla-Bold': require('./src/assets/fonts/Karla-Bold.ttf'),
      });
      setFontLoaded(true);
    }

    loadFont();
    setupBackgroundTask();
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
    <UtilisateurProvider>
      <GeographieProvider>

        <AlertNotificationRoot>
          <Navigation />
        </AlertNotificationRoot>

      </GeographieProvider>
    </UtilisateurProvider>
  );
};

export default App;