import { Raleway } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Providers from './providers';

const raleway = Raleway({ 
  subsets: ['latin'],
  variable: '--font-raleway',
});

export const metadata = {
  title: 'Health Challenge',
  description: 'Sua saúde em primeiro lugar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={raleway.variable}>
        <LanguageProvider>
          <Providers>{children}</Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
