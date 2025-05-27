'use client';

import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import '@/app/i18n';
import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { FaPlay } from 'react-icons/fa';
import { CountryProvider } from '@/contexts/CountryContext';
import Link from 'next/link';
import { orthopedicProducts } from '@/data/orthopedicProducts';

interface ProductDetails {
  code: string;
  name: string;
  family: string;
  description: string;
  level: string;
  colors: string[];
  model: string;
  sizes: string[];
  images: string[];
}

// Placeholder data - replace with actual data fetching based on productCode
const productData: { [key: string]: ProductDetails } = {
  'OR1065': {
    code: 'OR1065',
    name: 'Órtese Splint Bilateral',
    family: 'Hidrolight Neo®',
    description: '',
    level: '',
    colors: ['Preto'],
    model: 'Bilateral',
    sizes: ['Único', 'Especial'],
    images: [
      '/assets/images/detail/OR1065-1.png',
      '/assets/images/detail/OR1065-2.png',
      '/assets/images/detail/OR1065-3.png',
      '/assets/images/detail/OR1065-4.png',
      '/assets/images/detail/OR1065-5.png',
    ],
  },
  // Add other product data here
};

export default function ProductDetailPage() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const productCode = typeof params?.productCode === 'string' ? params.productCode : undefined;
  const [mounted, setMounted] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const productsContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePreviousClick = () => {
    if (currentProductIndex > 0) {
      setCurrentProductIndex(prev => prev - 1);
      scrollToProduct(currentProductIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentProductIndex < orthopedicProducts.length - 1) {
      setCurrentProductIndex(prev => prev + 1);
      scrollToProduct(currentProductIndex + 1);
    }
  };

  const scrollToProduct = (index: number) => {
    if (productsContainerRef.current) {
      const container = productsContainerRef.current;
      const productWidth = 256; // 240px (w-60) + 16px (gap-4)
      const scrollPosition = index * productWidth;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (productsContainerRef.current) {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - productsContainerRef.current.offsetLeft);
      setScrollLeft(productsContainerRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !productsContainerRef.current) return;
    
    const x = e.touches[0].pageX - productsContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    productsContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (productsContainerRef.current) {
      const container = productsContainerRef.current;
      const productWidth = 256; // 240px (w-60) + 16px (gap-4)
      const newIndex = Math.round(container.scrollLeft / productWidth);
      setCurrentProductIndex(Math.max(0, Math.min(newIndex, orthopedicProducts.length - 1)));
      scrollToProduct(Math.max(0, Math.min(newIndex, orthopedicProducts.length - 1)));
    }
  };

  const product = productCode ? productData[productCode] : undefined;
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const thumbnailCarouselRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null);

  useEffect(() => {
    if (product && product.images.length > 0) {
      setMainImageIndex(0);
    }
  }, [product]);

  const handleThumbnailClick = (index: number) => {
    setMainImageIndex(index);
  };

  const handleArrowClick = (direction: 'prev' | 'next') => {
    if (!product) return;
    const totalImages = product.images.length;
    if (direction === 'prev') {
      setMainImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else {
      setMainImageIndex((prevIndex) => (prevIndex < totalImages - 1 ? prevIndex + 1 : prevIndex));
    }
  };

  useEffect(() => {
    if (thumbnailCarouselRef.current && product?.images[mainImageIndex]) {
      const activeThumbnail = thumbnailCarouselRef.current.children[mainImageIndex] as HTMLElement;
      if (activeThumbnail) {
        activeThumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [mainImageIndex, product?.images]);

  const togglePanel = (panel: string) => {
    if (expandedPanel === panel) {
      setExpandedPanel(null);
    } else {
      setExpandedPanel(panel);
    }
  };

  if (!mounted) {
    return null;
  }

  if (!product) {
    return (
      <CountryProvider>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('Product not found')}</h1>
            <p className="text-gray-600">{t('The product you are looking for does not exist.')}</p>
          </div>
        </div>
      </CountryProvider>
    );
  }

  return (
    <CountryProvider>
      <div>
        <Header />

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="text-sm text-gray-600">
            <span className="text-gray-400">{t('navigation.home')} &gt;</span> {t('products')} &gt; {product.name}
          </div>
        </div>

        {/* Product Detail Section */}
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
          {/* Left Side - Image Gallery */}
          <div className="w-full md:w-1/2">
            {/* Main Image */}
            <div className="relative w-full h-96 bg-gray-200 flex items-center justify-center border border-gray rounded-lg overflow-hidden">
              {product.images.length > 0 && (
                <Image
                  src={product.images[mainImageIndex]}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              )}
              {/* Image index display */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 text-sm rounded">
                {mainImageIndex + 1}/{product.images.length}
              </div>
              {/* Magnifying glass icon */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 p-2 rounded-full cursor-pointer z-10" onClick={() => setShowModal(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Thumbnails Carousel */}
            <div className="mt-4 flex items-center gap-2">
              {/* Left Arrow */}
              <button onClick={() => handleArrowClick('prev')} disabled={mainImageIndex === 0} className={`p-2 ${mainImageIndex === 0 ? 'text-gray-400' : 'text-[var(--color-dark)]'} disabled:opacity-50`}>
                &lt;
              </button>
              <div ref={thumbnailCarouselRef} className="flex gap-2 overflow-x-auto flex-grow hide-scrollbar">
                {product.images.map((image, index) => (
                  <div key={index} className="flex flex-col items-center flex-shrink-0 cursor-pointer" onClick={() => handleThumbnailClick(index)}>
                    <div className="w-20 h-20 bg-gray-300 relative">
                      <Image
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Orange bar indicator */}
                    {mainImageIndex === index && (
                      <div className="w-10 h-0.5 bg-[var(--color-orange)] mt-1"></div>
                    )}
                  </div>
                ))}
              </div>
              {/* Right Arrow */}
              <button onClick={() => handleArrowClick('next')} disabled={mainImageIndex === product.images.length - 1} className={`p-2 ${mainImageIndex === product.images.length - 1 ? 'text-gray-400' : 'text-[var(--color-dark)]'} disabled:opacity-50`}>
                &gt;
              </button>
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="w-full md:w-1/2">
            {/* Family */}
            <p className="text-sm text-gray-500">{product.family}</p>

            {/* Product Name */}
            <h1 className="text-3xl font-bold mt-2">{product.name}</h1>

            {/* Product Code */}
            <p className="text-sm text-gray-600 mt-2">{t('Product Code')}: {product.code}</p>

            {/* Description */}
            <h2 className="text-xl font-semibold mt-4">{t('Description')}</h2>
            <p className="mt-2 text-gray-700">{t('productCodeDescription')}</p>

            {/* Level and Description */}
            <div className="mt-4">
              <p className="text-lg font-semibold text-gray-800">{t('level3')}</p>
              <p className="text-gray-600">{t('level3Description')}</p>
            </div>

            {/* Divider */}
            <hr className="my-6" />

            {/* Colors */}
            <div className="mt-4 flex items-center">
              <p className="text-gray-600 mr-2">{t('Colors available')}:</p>
              <div className="flex gap-2 items-center">
                 {/* Placeholder color indicator - replace with actual color logic if needed */}
                <span className="w-4 h-4 rounded-full bg-black"></span>
                <p className="text-gray-800">{product.colors.join(', ')}</p>
              </div>
            </div>

            {/* Model */}
            <div className="mt-2 flex items-center">
              <p className="text-gray-600 mr-2">{t('Model')}:</p>
              <p className="text-gray-800">{product.model}</p>
            </div>

            {/* Sizes */}
            <div className="mt-2 flex items-center">
              <p className="text-gray-600 mr-2">{t('Sizes available')}:</p>
              <div className="flex gap-2">
                {product.sizes.map((size, index) => (
                  <span key={index} className="px-3 py-1 border rounded-md text-sm bg-gray-200 text-gray-800">
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Guide Links */}
            <div className="mt-4 flex items-center gap-4">
              {/* Discover Ideal Size Link */}
              <a href="#" className="text-[var(--color-orange)] flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.809l4.513 4.514m-5.05-5.05l4.513 4.514" />
                </svg>
                {t('Discover your ideal size')}
              </a>
              {/* Size Chart Link */}
              <a href="#" className="text-gray-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 2v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('Size chart')}
              </a>
            </div>

            {/* Find Online Stores Button */}
            <button className="mt-8 bg-[var(--color-orange)] text-white px-6 py-2 rounded-full flex items-center gap-2">
              {t('Find online stores')}
            </button>

            {/* Become a Seller Link */}
            <div className="mt-4">
              <a href="#" className="text-gray-600 underline">
                {t('Liked this product? Be a seller')}
              </a>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="relative w-full mx-auto">
            <Image
              src="/assets/images/video.png"
              alt="Product Video Thumbnail"
              width={800}
              height={450}
              layout="responsive"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full p-4 shadow-lg cursor-pointer">
                <FaPlay className="text-[var(--color-orange)] text-3xl" />
              </div>
            </div>
          </div>
          <div className="mt-[40px]">
            <h2 className="text-3xl font-bold text-[var(--color-semidark)] mb-0 leading-tight">
              {t('Fabricado com')} <span style={{ color: 'var(--color-orange)' }}>{t('própria')}</span> {t('nacional')}.<br/>
              <span style={{ color: 'var(--color-orange)' }}>{t('Qualidade')}</span> {t('garantida')}!
            </h2>
            <p className="text-[var(--color-semidark)] mt-[16px]">{t('Read instructions')}</p>
          </div>
        </div>

        {/* Center Image Section */}
        <div className="container mx-auto md:px-40 px-8 py-8 flex justify-center">
          <Image
            src="/assets/images/center.png"
            alt="Center Section Image"
            width={1200} 
            height={600} 
            layout="responsive"
            objectFit="contain"
            className="w-full"
          />
        </div>

        {/* Divider before Collapsible Section */}
        <div className="container mx-auto px-4">
          <hr className="my-6 border border-[#ececec] h-0.5px" />
        </div>

        {/* Collapsible Details Section */}
        <div className="container mx-auto px-4 py-8">
          {/* Details Panel */}
          <div className="py-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => togglePanel('details')}>
              <h3 className="text-lg font-semibold text-[var(--color-dark)]">{t('Details')}</h3>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-[var(--color-dark)] transform transition-transform duration-300 ${expandedPanel === 'details' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {expandedPanel === 'details' && (
              <div className="mt-4 text-[var(--color-semidark)]">
                <p><span className="font-semibold">{t('Level')}:</span> {t('level3')}</p>
                <p><span className="font-semibold">{t('Commercial Name')}:</span> {product.name}</p>
                <p><span className="font-semibold">{t('Line')}:</span> {t('Orthopedic Line')}</p>
                <p><span className="font-semibold">{t('Product Code')} (references/SKU):</span> {product.code}</p>
                <p><span className="font-semibold">{t('Product Family')}:</span> {product.family}</p>
                <p><span className="font-semibold">{t('Product Models')} (left/right-bilateral):</span> {product.model}</p>
                <p><span className="font-semibold">{t('Composition')}:</span> 74% chloroprene rubber, 16% polyamide, 9% polystyrene and 1% PVC. (Placeholder)</p>
                <p>{t('THERMAL PRODUCT')} (Placeholder)</p>
              </div>
            )}
          </div>
          <hr className="my-6 mx-0 border border-[#ececec] h-0.5px" />

          {/* Technical Specifications Panel */}
          <div className="py-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => togglePanel('specs')}>
              <h3 className="text-lg font-semibold text-[var(--color-dark)]">{t('Technical specifications')}</h3>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-[var(--color-dark)] transform transition-transform duration-300 ${expandedPanel === 'specs' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {expandedPanel === 'specs' && (
              <div className="mt-4 text-[var(--color-semidark)]">
                {/* Add technical specifications here */}
                <p>Placeholder for technical specifications.</p>
              </div>
            )}
          </div>
          <hr className="my-6 mx-0 border border-[#ececec] h-0.5px" />

          {/* Indications and Usage Instructions Panel */}
          <div className="py-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => togglePanel('instructions')}>
              <h3 className="text-lg font-semibold text-[var(--color-dark)]">{t('Indications and usage instructions')}</h3>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-[var(--color-dark)] transform transition-transform duration-300 ${expandedPanel === 'instructions' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {expandedPanel === 'instructions' && (
              <div className="mt-4 text-[var(--color-semidark)]">
                {/* Add indications and instructions here */}
                <p>Placeholder for indications and instructions.</p>
              </div>
            )}
          </div>
          <hr className="my-6 mx-0 border border-[#ececec] h-0.5px" />

          {/* Warranty Panel */}
          <div className="py-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => togglePanel('warranty')}>
              <h3 className="text-lg font-semibold text-[var(--color-dark)]">{t('Warranty')}</h3>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-[var(--color-dark)] transform transition-transform duration-300 ${expandedPanel === 'warranty' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {expandedPanel === 'warranty' && (
              <div className="mt-4 text-[var(--color-semidark)]">
                <p>{t('Placeholder for warranty information.')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Divider after Collapsible Section */}
        <div className="container mx-auto px-4">
           <hr className="my-6 border border-[#ececec] h-0.5px" />
        </div>

        {/* Other Products Section */}
        <div className="px-4 sm:px-6 py-12 md:ml-[5%] lg:ml-[10%] xl:ml-[10%]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-medium text-center md:text-left">
              {t('Other Products')}
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={handlePreviousClick}
                disabled={currentProductIndex === 0}
                className="w-9 h-9 p-2 bg-white text-[var(--color-dark)] rounded-full shadow-md disabled:opacity-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
              >
                &lt;
              </button>
              <button 
                onClick={handleNextClick}
                disabled={currentProductIndex === orthopedicProducts.length - 1}
                className="w-9 h-9 p-2 bg-white text-[var(--color-dark)] rounded-full shadow-md disabled:opacity-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
              >
                &gt;
              </button>

            </div>
          </div>
          <div 
            className="overflow-x-auto hide-scrollbar touch-pan-x" 
            ref={productsContainerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex gap-4">
              {orthopedicProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-60">
                  <Link href={`/${i18n.language}/orthopedic/${product.code}`}>
                    <div className="relative w-full h-60 bg-gray-200 rounded-lg overflow-hidden group">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {product.isNewRelease && (
                        <span className="absolute top-2 left-2 bg-[var(--color-lightpurple)] text-white text-xs px-2 py-1 rounded">
                          {t('New releases')}
                        </span>
                      )}
                    </div>
                  </Link>
                  <p className="text-gray-800 font-semibold mt-2">{product.name}</p>
                  <p className="text-gray-600 text-sm">Código SKU {product.code}</p>
                </div>
              ))}
            </div>
          </div>

          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>

        <Footer />

        {/* Image Modal */}
        {showModal && product.images.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
            <div className="relative max-w-screen-lg max-h-screen-lg" onClick={(e) => e.stopPropagation()}>
              <Image
                src={product.images[mainImageIndex]}
                alt={product.name}
                width={900}
                height={800}
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </CountryProvider>
  );
} 