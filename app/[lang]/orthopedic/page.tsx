'use client';

import { useTranslation } from 'react-i18next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import '@/app/i18n';
import { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';

interface Product {
  id: number;
  name: string;
  code: string;
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Órtese Soft Curta com Polegar', code: 'OR1065', image: '/assets/images/list/curtaPlegar.png' },
  { id: 2, name: 'Órtese Soft Curta sem Polegar', code: 'OR1066', image: '/assets/images/list/semPolegar.png' },
  { id: 3, name: 'Órtese Soft Curta com Polegar', code: 'OR1065', image: '/assets/images/list/curtaPlegar.png' },
  { id: 4, name: 'Órtese Safe Air', code: 'OR1051', image: '/assets/images/list/softair.png' },
  { id: 5, name: 'Órtese Soft Curta com Polegar', code: 'OR1065', image: '/assets/images/list/softPolegar.png' },
  { id: 6, name: 'Órtese Soft Curta sem Polegar', code: 'OR1066', image: '/assets/images/list/semPolegar.png' },
  { id: 7, name: 'Órtese Soft Curta com Polegar', code: 'OR1065', image: '/assets/images/list/curtaPlegar.png' },
  { id: 8, name: 'Órtese Soft Curta sem Polegar', code: 'OR1066', image: '/assets/images/list/semPolegar.png' },
  { id: 9, name: 'Órtese Soft Curta com Polegar', code: 'OR1065', image: '/assets/images/list/curtaPlegar.png' },
  { id: 10, name: 'Órtese Safe Air', code: 'OR1051', image: '/assets/images/list/softair.png' },
  { id: 11, name: 'Órtese Soft Curta com Polegar', code: 'OR1065', image: '/assets/images/list/softPolegar.png' },
  { id: 12, name: 'Órtese Soft Curta sem Polegar', code: 'OR1066', image: '/assets/images/list/semPolegar.png' },
  { id: 13, name: 'Órtese Soft Curta com Polegar', code: 'OR1065', image: '/assets/images/list/curtaPlegar.png' },
  { id: 14, name: 'Órtese Soft Curta sem Polegar', code: 'OR1066', image: '/assets/images/list/semPolegar.png' },
  { id: 15, name: 'Órtese Soft Curta com Polegar', code: 'OR1065', image: '/assets/images/list/curtaPlegar.png' },
  { id: 16, name: 'Órtese Safe Air', code: 'OR1051', image: '/assets/images/list/softair.png' },
  { id: 17, name: 'Órtese Soft Curta com Polegar', code: 'OR1065', image: '/assets/images/list/softPolegar.png' },
  { id: 18, name: 'Órtese Soft Curta sem Polegar', code: 'OR1066', image: '/assets/images/list/semPolegar.png' },
  { id: 19, name: 'Órtese Soft Curta com Polegar', code: 'OR1065', image: '/assets/images/list/curtaPlegar.png' },
  { id: 20, name: 'Órtese Soft Curta sem Polegar', code: 'OR1066', image: '/assets/images/list/semPolegar.png' },
  { id: 21, name: 'Órtese Soft Curta com Polegar', code: 'OR1065', image: '/assets/images/list/curtaPlegar.png' },
  { id: 22, name: 'Órtese Safe Air', code: 'OR1051', image: '/assets/images/list/softair.png' },
  { id: 23, name: 'Órtese Soft Curta com Polegar', code: 'OR1065', image: '/assets/images/list/softPolegar.png' },
  { id: 24, name: 'Órtese Soft Curta sem Polegar', code: 'OR1066', image: '/assets/images/list/semPolegar.png' },
];

const ITEMS_PER_PAGE = 9;

export default function OrthopedicPage() {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showDesktopSearchBar, setShowDesktopSearchBar] = useState(false);

  useEffect(() => {
    setMounted(true);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setCurrentProducts(products.slice(startIndex, endIndex));
  }, [currentPage]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <Header />

      {/* Breadcrumb */}
      {/* Moved below into the image container */}

      {/* Main Orthopedic Section with Background Image */}
      <div className="relative w-full overflow-hidden">

        {/* Breadcrumb positioned absolutely over the image */}
        <div className="absolute top-0 left-0 right-0 z-30">
          <div className="px-4 sm:px-6 pt-4 text-sm text-[var(--color-dark)] md:ml-[10%] lg:ml-[15%] xl:ml-[20%]">
            <span className="text-[var(--color-semidark)]">Início &gt;</span> Linha Orthopedic
          </div>
        </div>

        <Image
          src="/assets/images/orthopedic.png"
          alt="Orthopedic Line Background"
          layout="responsive"
          width={1920}
          height={1080}
          priority
          className="z-0"
        />
        {/* Overlay */}
        <div className="absolute inset-0 opacity-30 z-10"></div>

        {/* Content over the image */}
        <div className="absolute inset-0 z-20 flex flex-col items-start justify-center h-full px-4 sm:px-6 text-[var(--color-dark)] md:ml-[10%] lg:ml-[15%] xl:ml-[20%]">
          {/* Description Image */}
          <Image
            src="/assets/images/orthopedicdescription.png"
            alt="Orthopedic Line Description"
            width={400}
            height={240}
            className="object-contain mb-6 md:mb-10 mt-10 sm:mb-10 w-[280px] sm:w-[400px]"
          />
          {/* Description Text as List */}
          <ul className="list-disc list-inside text-base sm:text-lg text-[var(--color-dark)] mb-6 sm:mb-8 text-justify max-w-[280px] sm:max-w-lg">
            <li className="font-medium">Produtos desenvolvidos para auxiliar na prevenção e retorno das atividades, no tratamento e recuperação de pacientes com lesões ortopédicas.</li>
          </ul>
        </div>

        {/* This is the overlay div over the main image */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(255, 255, 255, 0.8) 0%, rgba(255,255,255,0.01) 30%, rgba(128, 39, 108, 0.1) 100%)",
            opacity: 1,
          }}
        />
      </div>

      {/* Families Section */}
      <div className="px-4 sm:px-6 py-12 md:ml-[10%] lg:ml-[15%] xl:ml-[20%]">
        <h2 className="text-2xl sm:text-3xl font-medium mb-6 sm:mb-8 text-center md:text-left">
          Conheça as 
          <span className="text-[var(--color-purple)]"> famílias exclusivas</span> <br />
          da linha Orthopedic
        </h2>
        {/* Family Buttons/Tags */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8">
          <span className="px-3 sm:px-4 py-2 bg-[var(--color-purple)] text-white rounded-full text-sm sm:text-base">Hidrolight Neo®</span>
          <span className="px-3 sm:px-4 py-2 bg-gray-200 rounded-full text-sm sm:text-base">Comfort Air®</span>
          <span className="px-3 sm:px-4 py-2 bg-gray-200 rounded-full text-sm sm:text-base">Ortho Recovery®</span>
          <span className="px-3 sm:px-4 py-2 bg-gray-200 rounded-full text-sm sm:text-base">Air Flex®</span>
          <span className="px-3 sm:px-4 py-2 bg-gray-200 rounded-full text-sm sm:text-base">Softline®</span>
          <span className="px-3 sm:px-4 py-2 bg-gray-200 rounded-full text-sm sm:text-base">Foot Care®</span>
          <span className="px-3 sm:px-4 py-2 bg-gray-200 rounded-full text-sm sm:text-base">Lean®</span>
        </div>
        {/* Description */}
        <ul className="text-base sm:text-lg text-[var(--color-semidark)] text-justify max-w-lg">
          <li>{t('Família voltada para extrair os benefícios do Neoprene. Propriedades térmicas, compressivas e elásticas: são essas três propriedades que fazem do Neoprene uma ferramenta eficaz no tratamento e prevenção de lesões no tratamento ortopédico.')}</li>
        </ul>
      </div>

      {/* Divider */}
      <hr className="my-6 mx-12 border border-[#ececec] h-0.5px" />

      {/* Products and Filters Layout */}
      <div className="px-4 sm:px-6 py-12 flex flex-col md:flex-row md:ml-[10%] lg:ml-[15%] xl:ml-[20%]">

        {/* Filters Area (Conditionally rendered based on screen size) */}
        {/* Desktop Filters Sidebar */}
        <div className="w-[200px] pr-4 hidden md:block">
          <div className="border rounded p-4">
            <h3 className="text-lg font-semibold mb-4">Filtros</h3>
            {/* Placeholder filter items */}
            <div className="border-b py-2">Lançamentos</div>
            <div className="border-b py-2">Famílias/Tecnologias</div>
            <div className="py-2">Produtos</div>
          </div>
        </div>

        {/* Mobile Filters Button and Dropdown */}
        <div className="md:hidden w-full flex justify-start mb-4 relative">
          <button
            className="flex items-center gap-2  rounded-full"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            {/* Filter Icon from react-icons */}
            <FiFilter size={20} />
            Filtrar
          </button>

          {/* Mobile Filters Dropdown */}
          {showMobileFilters && (
            <div className="absolute top-full left-0 w-48 bg-white border rounded shadow-lg z-50">
              {/* Filter Options */}
              <div className="p-0">
                <div className="px-4 py-2 border-b cursor-pointer">
                  Lançamentos
                </div>
                <div className="flex justify-between items-center px-4 py-2 border-b cursor-pointer">
                  Famílias/Tecnologias
                  <span>v</span>
                </div>
                <div className="flex justify-between items-center px-4 py-2 cursor-pointer">
                  Produtos
                  <span>v</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Products Content (Right) */}
        <div className="w-full md:w-3/4 flex flex-col">

          {/* Top Controls Area */}
          <div className="flex flex-col gap-4 mb-8">

            {/* Product Count, Search Area (Desktop only), and Download Button Row */}
            <div className="flex justify-between items-center w-full">
              {/* Left Side: Product Count and Search Area (Desktop Only) */}
              <div className="flex items-center gap-4 flex-shrink-0">
                {/* Product Count */}
                <div className="text-lg font-semibold whitespace-nowrap">
                  {products.length} produtos
                </div>
                {/* Desktop Search Area (Visible only on Desktop) */}
                <div className="hidden md:flex items-center gap-2">
                  {/* Desktop Search Icon (always visible on desktop, toggles input) */}
                  <Image
                    src="/assets/images/icons/search.png"
                    alt="Search Icon"
                    width={38} 
                    height={38} 
                    className="cursor-pointer"
                    onClick={() => setShowDesktopSearchBar(!showDesktopSearchBar)}
                  />
                  {/* Desktop Search Input (toggle visibility on desktop) */}
                  {showDesktopSearchBar && (
                    <div className="relative flex items-center flex-grow">
                      <input
                        type="text"
                        placeholder={t('search')}
                        className="pl-1 px-0 py-1 rounded-lg border border-stone-400 text-base focus:outline-none transition-all duration-200 w-full"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Download Button */}
              <div className="flex-shrink-0">
                <button className="bg-[var(--color-orange)] text-white px-4 py-2 rounded-full flex items-center gap-2">
                  Baixar Catálogo
                  <Image
                    src="/assets/images/icons/download.png"
                    alt="Download Icon"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>

            {/* Mobile Search Area - Removed */}
            <div className="flex items-center gap-2 w-full md:hidden">
              {/* Search Icon (always visible on mobile) */}
              <Image
                src="/assets/images/icons/search.png"
                alt="Search Icon"
                width={38}
                height={38}
                className="cursor-pointer"
                onClick={() => setShowSearchBar(!showSearchBar)}
              />

              {/* Search Input (toggle visibility on mobile) */}
              {showSearchBar && (
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder={t('search')}
                    className="pl-1 px-0 py-1 rounded-lg border border-stone-400 text-base focus:outline-none transition-all duration-200 w-full"
                  />
                </div>
              )}
            </div>

          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-3 gap-6">
            {currentProducts.map(product => (
              <div key={product.id} className="flex flex-col items-center text-center">
                <a href={`/${i18n.language}/orthopedic/${product.code}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={450}
                    height={338}
                    objectFit="contain"
                  />
                </a>
                <p className="mt-2 text-lg font-semibold text-[var(--color-dark)]">{product.name}</p>
                <p className="text-sm text-gray-600">Cód. Produto: {product.code}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 items-center gap-1">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              // Simple logic: show first, last, current, and a few around current
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
              ) {
                return (
                    <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`mx-1 px-3 py-1 rounded-full transition-all duration-200
                      ${currentPage === pageNumber 
                        ? 'bg-white text-[var(--color-dark)] shadow-[0_0_4px_0.1px_rgba(0,0,0,0.6)] shadow-black' 
                        : 'border border-transparent text-gray-700 hover:border-gray-300'}`
                    }
                  >
                    {pageNumber}
                  </button>
                  
                );
              } else if (pageNumber === currentPage - 3 || pageNumber === currentPage + 3) {
                // Show ellipsis
                return <span key={pageNumber} className="mx-1 px-3 py-1">...</span>;
              }
              return null;
            })}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 