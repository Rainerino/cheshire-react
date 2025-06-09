import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";
// import en_json from '/locales/en/translation.json?url';
// import ch_json from '/locales/ch/translation.json?url';

i18n
  .use(HttpApi) // used to load data from othe directory
  .use(LanguageDetector) // detects the current language
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // debug: true,
    lng: 'en',
    supportedLngs: ['en', 'ch'], // Array of supported languages
    // fallbackLng: 'en', // Fallback language
    // detection: {
    //   order: ['localStorage', 'navigator'], //  Order of language detection
    //   lookupLocalStorage: 'i18nextLng', // Key for local storage
    // },
    backend: {
      loadPath: '/cheshire/locales/{{lng}}/translation.json',
    },
  });

export default i18n;