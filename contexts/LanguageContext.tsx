"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import '@/app/i18n';
import i18n from '@/app/i18n';

interface LanguageContextType {
  t: (key: string) => string;
  setLanguage: (lang: 'pt' | 'en' | 'es') => void;
  i18n: typeof i18n;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  const setLanguage = (lang: 'pt' | 'en' | 'es') => {
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ t, setLanguage, i18n }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 