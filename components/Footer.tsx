"use client";

import React, { useState } from 'react';
import ReactCountryFlag from "react-country-flag";
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import { FiPhone, FiMail } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const countries = [
  { name: 'Brasil', code: 'BR', lang: 'pt' },
  { name: 'USA', code: 'US', lang: 'en' },
  { name: 'Espanha', code: 'ES', lang: 'es' }
];

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const { t, setLanguage } = useLanguage();

  return (
    <footer className="bg-[var(--color-semidark)] text-white py-8 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* Seção 1: Logo */}
        <div>
          <Link href="/" className="transition-transform duration-300 hover:scale-110 inline-block">
            <Image
              src="/assets/images/logowhite.png"
              alt="Logo"
              width={160}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Seção 2: Institucional */}
        <div>
          <h3 className="font-semibold mb-2">{t('institutional')}</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">{t('aboutUs')}</a></li>
            <li><a href="#" className="hover:underline">{t('workWithUs')}</a></li>
          </ul>
        </div>

        {/* Seção 3: Download de Catálogos */}
        <div>
          <h3 className="font-semibold mb-2">{t('catalogDownloads')}</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">{t('generalCatalog')}</a></li>
            <li><a href="/orthopedic" className="hover:underline">{t('orthopedicLine')}</a></li>
            <li><a href="#" className="hover:underline">{t('sportsLine')}</a></li>
            <li><a href="#" className="hover:underline">{t('specialCaresLine')}</a></li>
            <li><a href="#" className="hover:underline">{t('footCareCatalog')}</a></li>
            <li><a href="#" className="hover:underline">{t('accessibilityCatalog')}</a></li>
          </ul>
        </div>

        {/* Seção 4: Contato */}
        <div>
          <h3 className="font-semibold mb-2">{t('contactAndQuestions')}</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="mr-2 w-8 h-8 flex items-center justify-center rounded-full border-2 border-[var(--color-orange)] text-[var(--color-orange)] text-2xl" style={{width:32, height:32}}>
                <FiPhone size={20} />
              </span>
              <a href="tel:+554833333333" className="hover:underline">+55 48 3333 3333</a>
            </li>
            <li className="flex items-center">
              <span className="mr-2 w-8 h-8 flex items-center justify-center rounded-full border-2 border-[var(--color-orange)] text-[var(--color-orange)] text-2xl flex-shrink-0" style={{width:32, height:32}}>
                <FiMail size={20} />
              </span>
              <a href="mailto:sac@loremipsum.com.br" className="hover:underline">sac@loremipsum.com.br ou rp@loremipsum.com.br</a>
            </li>
          </ul>
          <h3 className="font-semibold mt-4 mb-2">{t('followUs')}</h3>
          <div className="flex space-x-3">
            <a href="#" className="w-8 h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-8 xl:h-8 flex items-center justify-center rounded-full border-2 border-[var(--color-orange)] text-[var(--color-orange)] text-2xl" style={{width:32, height:32}}>
              <FaInstagram size={20} />
            </a>
            <a href="#" className="w-8 h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-8 xl:h-8 flex items-center justify-center rounded-full border-2 border-[var(--color-orange)] text-[var(--color-orange)] text-2xl" style={{width:32, height:32}}>
              <FaYoutube size={20} />
            </a>
            <a href="#" className="w-8 h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-8 xl:h-8 flex items-center justify-center rounded-full border-2 border-[var(--color-orange)] text-[var(--color-orange)] text-2xl" style={{width:32, height:32}}>
              <FaFacebookF size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Rodapé Inferior */}
      <div className="border-t border-gray-600 mt-8 pt-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <div className="relative">
            {isOpen && (
              <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <span className="text-sm mr-2">{t('selectCountry')}</span>
              <ReactCountryFlag
                countryCode={countries.find(c => c.name === selectedCountry.name)?.code || 'BR'}
                svg
                style={{
                  height: '24px',
                  width: 'auto',
                  border: '1px solid #4C4D4C',
                  borderRadius: 0,
                  background: '#fff',
                  display: 'inline-block',
                  margin: 0,
                  padding: 0,
                  verticalAlign: 'middle'
                }}
                title={selectedCountry.name}
              />
              <svg
                className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isOpen && (
              <div className="absolute bottom-full mb-2 right-0 bg-[var(--color-semidark)] border border-white/20 rounded-lg shadow-lg z-50">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setSelectedCountry(country);
                      setLanguage(country.lang as 'pt' | 'en' | 'es');
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 hover:bg-white/10 transition-colors"
                  >
                    <ReactCountryFlag
                      countryCode={country.code}
                      svg
                      style={{
                        height: '24px',
                        width: 'auto',
                        border: '1px solid #4C4D4C',
                        borderRadius: 0,
                        background: '#fff',
                        display: 'inline-block',
                        margin: 0,
                        padding: 0,
                        verticalAlign: 'middle'
                      }}
                      title={country.name}
                    />
                    <span>{country.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="text-sm text-center md:text-right mt-4 md:mt-0">
            <p>© 2023 Lorem Ipsum. {t('rightsReserved')}</p>
            <p>Av dos Bútias, 150 - Florianópolis - SC - Brasil</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;