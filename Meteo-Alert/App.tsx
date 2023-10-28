import React, { createContext, useState } from 'react';
import Navigation from './navigation/Navigation';
import { UserProvider } from './services/compteUtilisateur/UserContext';

const App = () => {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
};

export default App;