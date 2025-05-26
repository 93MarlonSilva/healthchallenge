"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

const countries = [
  { name: 'Brasil', code: 'BR', lang: 'pt' },
  { name: 'USA', code: 'US', lang: 'en' },
  { name: 'Espanha', code: 'ES', lang: 'es' }
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const searchInputRef = React.useRef(null);
  const [showSearchDesktop, setShowSearchDesktop] = useState(false);
  const searchInputDesktopRef = useRef<HTMLInputElement>(null);
  const { t, setLanguage } = useLanguage();

  useEffect(() => {
    if (showSearchDesktop && searchInputDesktopRef.current) {
      searchInputDesktopRef.current.focus();
    }
  }, [showSearchDesktop]);

  return (
    <>
      <header className={`w-full flex items-center justify-between lg:justify-around px-8 h-16 bg-background shadow-none relative z-20 transition-all duration-300 ${showSearchDesktop ? 'pb-8 min-h-[6rem]' : ''}`}>
        <div className="h-10 w-auto flex items-center">
          <Link href="/" className="transition-transform duration-300 hover:scale-110">
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              width={120}
              height={40}
              className="object-contain"
              priority
              sizes="120px"
            />
          </Link>
        </div>
        {/* Menu Desktop */}
        <nav className="flex gap-8 max-md:hidden items-center">
          <Link href="/orthopedic" className="text-[var(--color-semidark)] text-base font-normal hover:text-[var(--color-purple)] transition-colors">{t('products')}</Link>
          <Link href="#" className="text-[var(--color-semidark)] text-base font-normal hover:text-[var(--color-purple)] transition-colors">{t('about')}</Link>
          <Link href="#" className="text-[var(--color-semidark)] text-base font-normal hover:text-[var(--color-purple)] transition-colors">{t('contact')}</Link>
          <Link href="#" className="text-[var(--color-semidark)] text-base font-normal hover:text-[var(--color-purple)] transition-colors">{t('catalogs')}</Link>
          <button
            className="bg-[#F8F8F8] hover:bg-[var(--color-gray)] w-6 h-6 rounded-full flex items-center justify-center transition-colors"
            aria-label="Buscar"
            onClick={() => { if (!showSearchDesktop) setShowSearchDesktop(true); }}
          >
            <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="7" stroke="#4C4D4C" strokeWidth="2" />
              <line x1="13" y1="13" x2="17" y2="17" stroke="#4C4D4C" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </nav>
        <div className="flex items-center gap-4 max-md:hidden">
          <button className="bg-[var(--color-orange)] hover:bg-[#c95c00] text-white rounded-lg px-6 py-2 font-semibold text-base transition-colors">
            {t('contactUs')}
          </button>
          <div className="relative">
            {isOpen && (
              <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer bg-white min-w-[60px]"
            >
           
              <span style={{ width: 20.67, aspectRatio: '20.67/12.67', border: '1px solid #4C4D4C', borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#fff' }}>
                <ReactCountryFlag countryCode={selectedCountry.code} svg style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', margin: 0, padding: 0 }} title={selectedCountry.name} />
              </span>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L6 6L11 1" stroke="#4C4D4C" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            {isOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[60px]">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setSelectedCountry(country);
                      setLanguage(country.lang as 'pt' | 'en' | 'es');
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full"
                  >
                    <span style={{ width: 20.67, aspectRatio: '20.67/12.67', border: '1px solid #4C4D4C', borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#fff' }}>
                      <ReactCountryFlag countryCode={country.code} svg style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', margin: 0, padding: 0 }} title={country.name} />
                    </span>
                    <span className="text-sm">{country.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Menu Mobile */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <rect y="5" width="24" height="2" rx="1" fill="#4C4D4C" />
            <rect y="11" width="24" height="2" rx="1" fill="#4C4D4C" />
            <rect y="17" width="24" height="2" rx="1" fill="#4C4D4C" />
          </svg>
        </button>
        {/* Sidebar Mobile */}
        {menuOpen && (
          <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setMenuOpen(false)}>
            <nav
              className="absolute top-0 right-0 w-64 h-full bg-[var(--background)] shadow-lg flex flex-col p-6 gap-6 animate-slideIn"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="self-end mb-4"
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <line x1="6" y1="6" x2="18" y2="18" stroke="#4C4D4C" strokeWidth="2" strokeLinecap="round" />
                  <line x1="18" y1="6" x2="6" y2="18" stroke="#4C4D4C" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <Link href="/orthopedic" className="text-[var(--color-semidark)] text-lg font-medium hover:text-[var(--color-purple)] transition-colors" onClick={() => setMenuOpen(false)}>{t('products')}</Link>
              <Link href="#" className="text-[var(--color-semidark)] text-lg font-medium hover:text-[var(--color-purple)] transition-colors" onClick={() => setMenuOpen(false)}>{t('about')}</Link>
              <Link href="#" className="text-[var(--color-semidark)] text-lg font-medium hover:text-[var(--color-purple)] transition-colors" onClick={() => setMenuOpen(false)}>{t('contact')}</Link>
              <Link href="#" className="text-[var(--color-semidark)] text-lg font-medium hover:text-[var(--color-purple)] transition-colors" onClick={() => setMenuOpen(false)}>{t('catalogs')}</Link>
              <div className="flex items-center gap-2 mb-4">
                <button
                  className="bg-[#F8F8F8] hover:bg-[var(--color-gray)] w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Buscar"
                  tabIndex={-1}
                  onClick={() => setShowSearchMobile((v) => !v)}
                >
                  <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7" stroke="#4C4D4C" strokeWidth="2" />
                    <line x1="13" y1="13" x2="17" y2="17" stroke="#4C4D4C" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder={t('search')}
                  className={`pl-1 px-0 py-1 rounded-lg border border-stone-400 text-base focus:outline-none transition-all duration-200 ${showSearchMobile ? 'block' : 'hidden'}`}
                  onBlur={() => setShowSearchMobile(false)}
                  ref={searchInputRef}
                />
              </div>
              <button className="bg-[var(--color-orange)] hover:bg-[#c95c00] text-white rounded-lg px-4 py-2 font-semibold text-base transition-colors mt-2">
                {t('contactUs')}
              </button>
              <div className="relative mt-2">
                {isOpenMobile && (
                  <div className="fixed inset-0 z-40" onClick={() => setIsOpenMobile(false)} />
                )}
                <button
                  onClick={() => setIsOpenMobile(!isOpenMobile)}
                  className="flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer bg-white min-w-[60px]"
                >
                  <span className="text-sm mr-2">{t('selectCountry')}</span>
                  <span style={{ width: 20.67, aspectRatio: '20.67/12.67', border: '1px solid #4C4D4C', borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#fff' }}>
                    <ReactCountryFlag countryCode={selectedCountry.code} svg style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', margin: 0, padding: 0 }} title={selectedCountry.name} />
                  </span>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke="#4C4D4C" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                {isOpenMobile && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[60px]">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setSelectedCountry(country);
                          setLanguage(country.lang as 'pt' | 'en' | 'es');
                          setIsOpenMobile(false);
                          setMenuOpen(false);
                        }}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full"
                      >
                        <span style={{ width: 20.67, aspectRatio: '20.67/12.67', border: '1px solid #4C4D4C', borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#fff' }}>
                          <ReactCountryFlag countryCode={country.code} svg style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', margin: 0, padding: 0 }} title={country.name} />
                        </span>
                        <span className="text-sm">{country.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
      {showSearchDesktop && (
        <div className="w-full flex justify-center bg-background py-8">
          <input
            type="text"
            placeholder={t('search')}
            className="w-full max-w-xl px-4 py-2 text-lg rounded-lg border border-stone-400 focus:outline-none shadow-md"
            onBlur={() => setShowSearchDesktop(false)}
            ref={searchInputDesktopRef}
          />
        </div>
      )}
    </>
  );
} 