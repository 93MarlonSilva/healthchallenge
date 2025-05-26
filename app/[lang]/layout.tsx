import { Inter } from 'next/font/google';
import Providers from '../providers';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({
  children,
  params: { lang }
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return children;
} 