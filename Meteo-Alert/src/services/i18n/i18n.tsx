import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


// Dynamic import of different translation files
const langueDefaut = process.env.REACT_APP_LANGUE_DEFAUT ?? "fr-FR";
const locales = require.context('../../locales', false, /\.json$/);
const keys: string[] = locales.keys();
const regexToutesLettres: RegExp = /(?<=\.\/).+?(?=\.json)/;

// Definition of the list of available languages
export const langues: Record<string, string> = Object.fromEntries(
  keys
    .reduce((acc, key) => {
      const toutesLettres = key.match(regexToutesLettres)?.[0] ?? null;

      if (toutesLettres != null && toutesLettres) {
        acc.push([toutesLettres, toutesLettres]);
      }
      return acc;
    }, [] as [string, string][])
    .sort(([a], [b]) => a.localeCompare(b))
);

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
    fallbackLng: langues[navigator.language] || langueDefaut,
    debug: false,
    defaultNS: 'react-native',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;