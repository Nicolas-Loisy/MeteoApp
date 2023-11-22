import React from 'react';
import Navigation from './navigation/Navigation';
import { UserProvider } from './services/compteUtilisateur/UserContext';
import * as NavigationBar from 'expo-navigation-bar';

const App = () => {
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