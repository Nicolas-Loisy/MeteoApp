import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';

// Dynamic import of different translation files
export const langueDefaut = process.env.REACT_APP_LANGUE_DEFAUT ?? "fr_FR";
const locales = require.context('../../locales', false, /\.json$/);
const keys: string[] = locales.keys();
const regexNomLocale: RegExp = /^\.\/(.+)\.json$/;
const regexLangue = /^(.*)_/ //Deux premières lettres

export const langues: string[] = keys
  .map(key => key.match(regexNomLocale))
  .filter(matchResult => matchResult !== null)
  .map(matchResult => matchResult![1]); 


// Définition de la langue utilisée
const localeTelephone: string = NativeModules.SettingsManager.settings.AppleLocale ?? NativeModules.I18nManager.localeIdentifier ?? langueDefaut;
const langueTelephone: string | null = localeTelephone.match(regexLangue)?.[1] ?? null;

let langueActuelle: string;
if (Object.keys(locales).includes(localeTelephone)){
  // La locale du téléphone existe dans la liste des locales de l'application
  langueActuelle = localeTelephone;

} else if (langueTelephone) {
  // Les deux lettres correspondant à une langue existe dans l'une des locales de l'application
  langueActuelle = Object.keys(locales).find(locale => locale.startsWith(langueTelephone)) ?? langueDefaut

} else {
  // Cas par défaut si aucune langue adéquate n'a été trouvée
  langueActuelle = langueDefaut
}

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