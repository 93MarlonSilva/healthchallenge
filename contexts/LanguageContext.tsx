"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import '@/app/i18n';

type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  currentLanguage: Language;
}

const translations = {
  pt: {
    welcome: "Bem-vindo ao",
    products: "Produtos",
    about: "Sobre nós",
    contact: "Contato",
    catalogs: "Catálogos",
    contactUs: "Fale conosco",
    search: "Pesquisar...",
    selectCountry: "Selecionar País",
    institutional: "Institucional",
    aboutUs: "Sobre nós",
    workWithUs: "Trabalhe conosco",
    catalogDownloads: "Download de Catálogos",
    generalCatalog: "Catálogo geral",
    orthopedicLine: "Linha Orthopedic",
    sportsLine: "Linha Sports",
    specialCaresLine: "Linha Special Cares",
    footCareCatalog: "Catálogo Foot Care",
    accessibilityCatalog: "Catálogo Acessibilidade",
    contactAndQuestions: "Entre em contato e tire suas dúvidas",
    followUs: "Nos acompanhe também nas redes sociais",
    rightsReserved: "Todos os direitos reservados.",
  },
  en: {
    welcome: "Welcome to",
    products: "Products",
    about: "About us",
    contact: "Contact",
    catalogs: "Catalogs",
    contactUs: "Contact us",
    search: "Search...",
    selectCountry: "Select Country",
    institutional: "Institutional",
    aboutUs: "About us",
    workWithUs: "Work with us",
    catalogDownloads: "Catalog Downloads",
    generalCatalog: "General catalog",
    orthopedicLine: "Orthopedic Line",
    sportsLine: "Sports Line",
    specialCaresLine: "Special Cares Line",
    footCareCatalog: "Foot Care Catalog",
    accessibilityCatalog: "Accessibility Catalog",
    contactAndQuestions: "Contact us and get your questions answered",
    followUs: "Follow us on social media",
    rightsReserved: "All rights reserved.",
  },
  es: {
    welcome: "Bienvenido a",
    products: "Productos",
    about: "Sobre nosotros",
    contact: "Contacto",
    catalogs: "Catálogos",
    contactUs: "Contáctenos",
    search: "Buscar...",
    selectCountry: "Seleccionar País",
    institutional: "Institucional",
    aboutUs: "Sobre nosotros",
    workWithUs: "Trabaje con nosotros",
    catalogDownloads: "Descargas de Catálogos",
    generalCatalog: "Catálogo general",
    orthopedicLine: "Línea Ortopédica",
    sportsLine: "Línea Deportiva",
    specialCaresLine: "Línea Cuidados Especiales",
    footCareCatalog: "Catálogo Cuidado del Pie",
    accessibilityCatalog: "Catálogo Accesibilidad",
    contactAndQuestions: "Contáctenos y resuelva sus dudas",
    followUs: "Síguenos en redes sociales",
    rightsReserved: "Todos los derechos reservados.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('pt');

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
    // Remover o locale atual da URL e adicionar o novo
    const pathWithoutLocale = pathname?.split('/').slice(2).join('/') || '';
    const newPath = `/${lang}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`;
    router.push(newPath);
  };

  useEffect(() => {
    if (pathname) {
      const locale = pathname.split('/')[1];
      if (locale && ['pt', 'en', 'es'].includes(locale)) {
        setCurrentLanguage(locale as Language);
        i18n.changeLanguage(locale);
      }
    }
  }, [pathname, i18n]);

  return (
    <LanguageContext.Provider value={{ language: currentLanguage, setLanguage, t, currentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 