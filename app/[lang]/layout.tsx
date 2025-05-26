import { LanguageProvider } from '@/contexts/LanguageContext';
import { CountryProvider } from '@/contexts/CountryContext';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <CountryProvider>
        {children}
      </CountryProvider>
    </LanguageProvider>
  );
} 