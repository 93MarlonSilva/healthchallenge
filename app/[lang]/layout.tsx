import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CountryProvider } from '@/contexts/CountryContext';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <LanguageProvider>
      <CountryProvider>
        {children}
      </CountryProvider>
    </LanguageProvider>
  );
} 