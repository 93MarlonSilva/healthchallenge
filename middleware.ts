import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['pt', 'en', 'es'];
const defaultLocale = 'pt';

export function middleware(request: NextRequest) {
  // Verificar se o pathname começa com um locale
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirecionar se não houver locale
  if (pathnameIsMissingLocale) {
    const locale = defaultLocale;
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Pular todos os arquivos internos do Next.js
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 