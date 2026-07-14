// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import arMessages from './ar.json';
import enMessages from './en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: arMessages },
      en: { translation: enMessages },
    },
    fallbackLng: 'ar',
    supportedLngs: ['ar', 'en'], 
    load: 'languageOnly', 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;