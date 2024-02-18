import React, { useState, useEffect, useRef } from 'react';
import { Text, Platform } from 'react-native';
import Navigation from './src/navigation/Navigation';

import * as TaskManager from 'expo-task-manager';
import * as NavigationBar from 'expo-navigation-bar';
import * as Font from 'expo-font';
import * as BackgroundFetch from 'expo-background-fetch';

import './src/services/i18n/i18n';

import { AlertNotificationRoot } from 'react-native-alert-notification';
import { UtilisateurProvider } from './src/services/context/UtilisateurContext';
import { GeographieProvider } from './src/services/context/GeographieContext';
import { schedulePushNotification } from './src/notification/notificationUtils';

const BACKGROUND_FETCH_TASK = 'background-fetch';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();
  console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
  await schedulePushNotification();
  console.log("LA NOTIF !");
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 1, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState<BackgroundFetch.BackgroundFetchStatus | null>(null);

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

  useEffect(() => {
    // Push notifications registration and listeners...
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