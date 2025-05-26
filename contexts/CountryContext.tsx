'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface CountryContextType {
  selectedCountry: Country | null;
  setSelectedCountry: (country: Country) => void;
}

const CountryContext = createContext<CountryContextType | null>(null);

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedCountry = localStorage.getItem('selectedCountry');
    if (savedCountry) {
      const parsed = JSON.parse(savedCountry);
      setSelectedCountry(parsed);
    } else {
      // Define o país padrão com base no idioma atual
      const defaultCountry = {
        code: i18n.language === 'pt' ? 'BR' : i18n.language === 'es' ? 'ES' : 'US',
        name: i18n.language === 'pt' ? 'Brasil' : i18n.language === 'es' ? 'España' : 'United States',
        flag: i18n.language === 'pt' ? '🇧🇷' : i18n.language === 'es' ? '🇪🇸' : '🇺🇸'
      };
      setSelectedCountry(defaultCountry);
      localStorage.setItem('selectedCountry', JSON.stringify(defaultCountry));
    }
  }, [i18n.language]);

  // Atualiza o país quando o idioma muda
  useEffect(() => {
    if (mounted) {
      const newCountry = {
        code: i18n.language === 'pt' ? 'BR' : i18n.language === 'es' ? 'ES' : 'US',
        name: i18n.language === 'pt' ? 'Brasil' : i18n.language === 'es' ? 'España' : 'United States',
        flag: i18n.language === 'pt' ? '🇧🇷' : i18n.language === 'es' ? '🇪🇸' : '🇺🇸'
      };
      setSelectedCountry(newCountry);
      localStorage.setItem('selectedCountry', JSON.stringify(newCountry));
    }
  }, [i18n.language, mounted]);

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