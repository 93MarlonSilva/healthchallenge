"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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