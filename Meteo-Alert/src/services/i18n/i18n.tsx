import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


// Dynamic import of different translation files
const langueDefaut = process.env.REACT_APP_LANGUE_DEFAUT ?? "fr-FR";
const locales = require.context('../../locales', false, /\.json$/);
const keys: string[] = locales.keys();
const regex: RegExp = /^\.\/(.+)\.json$/;

export const langues: string[] = keys
  .map(key => key.match(regex))
  .filter(matchResult => matchResult !== null)
  .map(matchResult => matchResult![1]); 

export const langueActuelle = 
  Object.keys(locales).includes(navigator.language) 
  ? navigator.language 
  : langueDefaut;

// Reading loaded translation files
const resources: Record<string, any> = {};
locales.keys().forEach(key => {
  const langKey = key.replace('./', '').replace('.json', '');
  resources[langKey] = locales(key);
});

// Initializing i18n settings
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: resources,
    fallbackLng: langueActuelle,
    debug: false,
    defaultNS: 'react-native',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;