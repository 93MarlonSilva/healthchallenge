'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Função para obter o idioma inicial
const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    const langMatch = path.match(/^\/([a-z]{2})\//);
    return langMatch ? langMatch[1] : 'pt';
  }
  return 'pt';
};

// Função para inicializar o i18next
const initI18next = async () => {
  const initialLang = getInitialLanguage();

  await i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      lng: initialLang,
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
        useSuspense: true,
        bindI18n: 'languageChanged loaded',
        bindI18nStore: 'added removed',
        transEmptyNodeValue: '',
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p']
      },
      load: 'languageOnly',
      supportedLngs: ['pt', 'en', 'es']
    });
  return i18n;
};

// Inicializando o i18next
initI18next();

export default i18n; 