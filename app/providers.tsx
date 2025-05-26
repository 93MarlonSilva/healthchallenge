'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import { CountryProvider } from '@/contexts/CountryContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CountryProvider>
        {children}
      </CountryProvider>
    </LanguageProvider>
  );
} 