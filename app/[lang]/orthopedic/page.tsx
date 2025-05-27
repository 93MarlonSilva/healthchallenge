'use client';

import { useTranslation } from 'react-i18next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import '@/app/i18n';
import { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { CountryProvider } from '@/contexts/CountryContext';
import Link from 'next/link';
import { Product } from '@/components/ProductList';
import { orthopedicProducts } from '@/data/orthopedicProducts';

const ITEMS_PER_PAGE = 9;

export default function OrthopedicPage() {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showDesktopSearchBar, setShowDesktopSearchBar] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showNewReleases, setShowNewReleases] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFamiliesTechnologies, setShowFamiliesTechnologies] = useState(false);
  const [showProductsFilter, setShowProductsFilter] = useState(false);

  useEffect(() => {
    setMounted(true);
    filterAndPaginateProducts();
  }, [currentPage, selectedTags, showNewReleases, searchQuery]);

  const filterAndPaginateProducts = () => {
    let filteredProducts = [...orthopedicProducts];
    
    // Filtrar por tags selecionadas
    if (selectedTags.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        selectedTags.some(tag => product.tags.includes(tag))
      );
    }
    
    // Filtrar por lançamentos
    if (showNewReleases) {
      filteredProducts = filteredProducts.filter(product => product.isNewRelease);
    }
    
    // Filtrar por termo de busca
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.code.toLowerCase().includes(lowerCaseQuery) ||
        product.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
      );
    }
    
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setCurrentProducts(filteredProducts.slice(startIndex, endIndex));
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      }
      return [...prev, tag];
    });
    setCurrentPage(1);
    setSearchQuery('');
  };

  const handleNewReleasesClick = () => {
    setShowNewReleases(prev => !prev);
    setCurrentPage(1);
    setSearchQuery('');
  };
  
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    setSelectedTags([]);
    setShowNewReleases(false);
  };

  const handleToggleFamiliesTechnologies = () => {
    setShowFamiliesTechnologies(prev => !prev);
  };

  const handleToggleProductsFilter = () => {
    setShowProductsFilter(prev => !prev);
  };

  const totalPages = Math.ceil(
    (selectedTags.length > 0 || showNewReleases || searchQuery 
      ? orthopedicProducts.filter(p => 
          (selectedTags.length === 0 || selectedTags.some(tag => p.tags.includes(tag))) &&
          (!showNewReleases || p.isNewRelease) &&
          (!searchQuery || 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
          )
        ).length 
      : orthopedicProducts.length) / ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!mounted) {
    return null;
  }

  return (
    <CountryProvider>
      <div>
        <Header />

        {/* Breadcrumb */}
        {/* Moved below into the image container */}

        {/* Main Orthopedic Section with Background Image */}
        <div className="relative w-full overflow-hidden">

          {/* Breadcrumb positioned absolutely over the image */}
          <div className="absolute top-0 left-0 right-0 z-30">
            <div className="px-4 sm:px-6 pt-4 text-sm text-[var(--color-dark)] md:ml-[5%] lg:ml-[10%] xl:ml-[10%]">
              <span className="text-[var(--color-semidark)]">{t('navigation.home')} &gt;</span> {t('Orthopedic Line')}
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
          <div className="absolute inset-0 z-20 flex flex-col items-start justify-center h-full px-4 sm:px-6 text-[var(--color-dark)] md:ml-[5%] lg:ml-[10%] xl:ml-[10%]">
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
              <li className="font-medium">{t('Products developed to assist in prevention and return of activities, in the treatment and recovery of patients with orthopedic injuries.')}</li>
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
        <div className="px-4 sm:px-6 py-12 md:ml-[5%] lg:ml-[10%] xl:ml-[10%]">
          <h2 className="text-2xl sm:text-3xl font-medium mb-6 sm:mb-8 text-center md:text-left">
            {t('Meet the')} 
            <span className="text-[var(--color-purple)]"> {t('exclusive families')}</span> <br />
            {t('of the Orthopedic line')}
          </h2>
          {/* Family Buttons/Tags */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8">
            {['Hidrolight Neo®', 'Comfort Air®', 'Ortho Recovery®', 'Air Flex®', 'Softline®', 'Foot Care®', 'Lean®'].map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base transition-colors duration-200 ${
                  selectedTags.includes(tag)
                    ? 'bg-[var(--color-purple)] text-white'
                    : 'bg-gray-200 hover:bg-[var(--color-lightpurple)] hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {/* Description */}
          <ul className="text-base sm:text-lg text-[var(--color-semidark)] text-justify max-w-lg">
            <li>{t('Family focused on extracting the benefits of Neoprene. Thermal, compressive and elastic properties: these are the three properties that make Neoprene an effective tool in the treatment and prevention of injuries in orthopedic treatment.')}</li>
          </ul>
        </div>

        {/* Divider */}
        <hr className="my-6 mx-12 border border-[#ececec] h-0.5px" />

        {/* Products and Filters Layout */}
        <div className="px-4 sm:px-6 py-12 flex flex-col md:flex-row md:ml-[5%] lg:ml-[10%] xl:ml-[10%]">

          {/* Filters Area (Conditionally rendered based on screen size) */}
          {/* Desktop Filters Sidebar */}
          <div className="w-[250px] pr-10 hidden md:block">
            <div className="bg-slate-50 rounded-lg  w-full">
              <h3 className="text-lg font-semibold mb-3 mt-3 p-4 border-b border-stone-300 w-full border rounded-t-lg">{t('Filters')}</h3>

              <div 
                className={`border-b border-stone-300 py-0 cursor-pointer w-full p-2 mb-2 mt-2 ${showNewReleases ? 'text-[var(--color-purple)]' : ''}`}
                onClick={handleNewReleasesClick}
              >
                <span className="mb-4 block">{t('New releases')}</span>
              </div>

              {/* Families/Technologies Filter */}
              <div
                className="border-b border-stone-300 py-2 cursor-pointer flex justify-between items-center w-full p-2 mb-2"
                onClick={handleToggleFamiliesTechnologies}
              >
                {t('Families/Technologies')}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transform transition-transform duration-300 ${showFamiliesTechnologies ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {showFamiliesTechnologies && (
                <div className="py-2 pl-4 w-full">
                  <p className="text-sm text-gray-600">Family options here...</p>
                </div>
              )}

              {/* Products Filter */}
              <div
                className="py-2 cursor-pointer flex justify-between items-center w-full p-2 mb-4"
                onClick={handleToggleProductsFilter}
              >
                {t('Products')}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transform transition-transform duration-300 ${showProductsFilter ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {showProductsFilter && (
                <div className="py-2 pl-4 w-full">
                  <p className="text-sm text-gray-600">Product options here...</p>
                </div>
              )}
            </div>
          </div>


          {/* Mobile Filters Button and Dropdown */}
          <div className="md:hidden w-full flex justify-start mb-4 relative">
            <button
              className="flex items-center gap-2 rounded-full"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <FiFilter size={20} />
              {t('Filter')}
            </button>

            {/* Mobile Filters Dropdown */}
            {showMobileFilters && (
              <div className="absolute top-full left-0 w-48 bg-white border rounded shadow-lg z-50">
                <div className="p-0">
                  <div 
                    className={`px-4 py-2 border-b cursor-pointer ${showNewReleases ? 'text-[var(--color-purple)]' : ''}`}
                    onClick={handleNewReleasesClick}
                  >
                    {t('New releases')}
                  </div>
                  <div className="flex justify-between items-center px-4 py-2 border-b cursor-pointer">
                    {t('Families/Technologies')}
                    <span>v</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2 cursor-pointer">
                    {t('Products')}
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
                    {(selectedTags.length > 0 || showNewReleases || searchQuery 
                      ? orthopedicProducts.filter(p => 
                          (selectedTags.length === 0 || selectedTags.some(tag => p.tags.includes(tag))) &&
                          (!showNewReleases || p.isNewRelease) &&
                          (!searchQuery || 
                            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                          )
                        ).length 
                      : orthopedicProducts.length)} {t('products')}
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
                          value={searchQuery}
                          onChange={handleSearchInputChange}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Download Button */}
                <div className="flex-shrink-0">
                  <button className="bg-[var(--color-orange)] text-white px-4 py-2 rounded-full flex items-center gap-2">
                    {t('Download Catalog')}
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
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                    />
                  </div>
                )}
              </div>

            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-3 gap-6">
              {currentProducts.map(product => (
                <div key={product.id} className="flex flex-col items-center text-center">
                  <Link href={`/${i18n.language}/orthopedic/OR1065`}>
                    <div className="overflow-hidden transition-transform duration-300 hover:scale-110 relative">
                      {product.isNewRelease && (
                        <div className="absolute top-2 left-2 bg-[var(--color-lightpurple)] rounded-md px-6 py-3 flex items-center justify-center z-10">
                          <span className="text-white text-xs font-medium">
                            {t('New releases')}
                          </span>
                        </div>
                      )}
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={450}
                        height={338}
                        objectFit="contain"
                      />
                    </div>
                  </Link>
                  <p className="mt-2 text-lg font-semibold text-[var(--color-dark)]">{product.name}</p>
                  <p className="text-sm text-gray-600">{t('Product Code')}: {product.code}</p>
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
    </CountryProvider>
  );
} 