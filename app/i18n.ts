'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Função para inicializar o i18next
const initI18next = async (lng: string) => {
  await i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      lng, // Definindo o idioma inicial explicitamente
      fallbackLng: 'pt',
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: '/locales/{{lng}}/common.json',
        requestOptions: {
          cache: 'no-store'
        }
      },
      ns: ['common'],
      defaultNS: 'common',
      detection: {
        order: ['path', 'navigator'],
        lookupFromPathIndex: 0,
        caches: []
      },
      react: {
        useSuspense: false,
      },
      load: 'languageOnly',
      supportedLngs: ['pt', 'en', 'es']
    });
  return i18n;
};

// Inicializando com o idioma padrão
initI18next('pt');

export default i18n; 