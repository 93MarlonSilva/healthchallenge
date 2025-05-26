'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

interface Country {
  name: string;
  code: string;
  lang: string;
}

interface CountryContextType {
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
}

const countries = [
  { name: 'Brasil', code: 'BR', lang: 'pt' },
  { name: 'USA', code: 'US', lang: 'en' },
  { name: 'Espanha', code: 'ES', lang: 'es' }
];

const CountryContext = createContext<CountryContextType | null>(null);

export function CountryProvider({ children }: { children: ReactNode }) {
  const { i18n } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState(() => {
    const savedCountry = localStorage.getItem('selectedCountry');
    if (savedCountry) {
      const parsed = JSON.parse(savedCountry);
      // Verifica se o país salvo ainda é válido
      if (countries.some(c => c.code === parsed.code)) {
        return parsed;
      }
    }
    // Se não houver país salvo ou for inválido, usa o país correspondente ao idioma atual
    return countries.find(country => country.lang === i18n.language) || countries[0];
  });

  // Salva o país selecionado no localStorage
  useEffect(() => {
    localStorage.setItem('selectedCountry', JSON.stringify(selectedCountry));
  }, [selectedCountry]);

  // Sincroniza o idioma quando o país muda
  useEffect(() => {
    if (i18n.language !== selectedCountry.lang) {
      i18n.changeLanguage(selectedCountry.lang);
    }
  }, [selectedCountry, i18n]);

  // Sincroniza o país quando o idioma muda
  useEffect(() => {
    const country = countries.find(country => country.lang === i18n.language);
    if (country && country.code !== selectedCountry.code) {
      setSelectedCountry(country);
    }
  }, [i18n.language]);

  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
}

export { countries }; 