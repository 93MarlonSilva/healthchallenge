'use client';

import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import '@/app/i18n';
import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { FaPlay } from 'react-icons/fa';

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
    description: 'A Órtese Splint Bilateral Hidrolight é feita de neoprene Plush, com propriedades isolantes térmicas e um acabamento elegante em plush. Possui ampla capacidade de ajuste devido à aderência do tecido. Em repouso, a órtese já está pré-ajustada, com fechamento do polegar e uma membrana elástica que funciona como um bolso, facilitando a colocação pelo próprio paciente. As talas internas são facilmente ajustáveis para se adaptarem à mão desejada. São fornecidas duas talas removíveis, uma com curvatura ideal para sustentar o punho até a palma da mão, e a segunda reta na parte dorsal do punho, impedindo movimentos para cima e para baixo. O elástico aderente envolve a articulação, proporcionando compressão de acordo com a indicação médica e a necessidade do paciente.',
    level: 'Nível 3 Recuperação e tratamento de lesões GRAVES',
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

  useEffect(() => {
    setMounted(true);
  }, []);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('Product not found')}</h1>
          <p className="text-gray-600">{t('The product you are looking for does not exist.')}</p>
        </div>
      </div>
    );
  }

  return (
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
          <p className="text-sm text-gray-600 mt-2">Código: {product.code}</p>

          {/* Description */}
          <h2 className="text-xl font-semibold mt-4">{t('Description')}</h2>
          <p className="mt-2 text-gray-700">{product.description}</p>

          {/* Level and Description */}
          <div className="mt-4">
            <p className="text-lg font-semibold text-gray-800">{t('Level')} {product.level.split(' ')[1]}</p>
            <p className="text-gray-600">{product.level.substring(product.level.indexOf(' ', product.level.indexOf(' ') + 1) + 1)}</p>
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
            Fabricação <span style={{ color: 'var(--color-orange)' }}>própria</span> e nacional.<br/>
            <span style={{ color: 'var(--color-orange)' }}>Qualidade</span> garantida!
          </h2>
          <p className="text-[var(--color-semidark)] mt-[16px]">Antes de utilizar o produto, leia atentamente <br/>as precauções e Instruções de uso.</p>
        </div>
      </div>

      {/* Center Image Section */}
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Image
          src="/assets/images/center.png"
          alt="Center Section Image"
          width={1200} // Adjust based on expected image width or design
          height={600} // Adjust based on expected image height or design
          layout="responsive"
          objectFit="contain"
          className="w-full"
        />
      </div>

      <hr className="my-6 mx-12 border border-[#ececec] h-0.5px" />

      {/* Collapsible Details Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Details Panel */}
        <div className="py-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => togglePanel('details')}>
            <h3 className="text-lg font-semibold text-[var(--color-dark)]">Detalhes</h3>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-[var(--color-dark)] transform transition-transform duration-300 ${expandedPanel === 'details' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {expandedPanel === 'details' && (
            <div className="mt-4 text-[var(--color-semidark)]">
              <p><span className="font-semibold">Nível:</span> {product.level}</p>
              <p><span className="font-semibold">Nome Comercial:</span> {product.name}</p>
              <p><span className="font-semibold">Linha:</span> Orthopedic</p>
              <p><span className="font-semibold">Cod. Produto (referências/SKU):</span> {product.code}</p>
              <p><span className="font-semibold">Família de Produtos:</span> {product.family}</p>
              <p><span className="font-semibold">Modelos do produto (esquerda/direita-bilateral):</span> {product.model}</p>
              <p><span className="font-semibold">Composição:</span> 74% borracha de cloropreno, 16% poliamida, 9%poliestireno e 1%PVC. (Placeholder)</p>
              <p>PRODUTO TÉRMICO (Placeholder)</p>
            </div>
          )}
        </div>
        <hr className="my-6 mx-0 border border-[#ececec] h-0.5px" />

        {/* Technical Specifications Panel */}
        <div className="py-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => togglePanel('specs')}>
            <h3 className="text-lg font-semibold text-[var(--color-dark)]">Especificações técnicas</h3>
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
            <h3 className="text-lg font-semibold text-[var(--color-dark)]">Indicações e Instrução de uso</h3>
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
            <h3 className="text-lg font-semibold text-[var(--color-dark)]">Garantia</h3>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-[var(--color-dark)] transform transition-transform duration-300 ${expandedPanel === 'warranty' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {expandedPanel === 'warranty' && (
            <div className="mt-4 text-[var(--color-semidark)]">
              {/* Add warranty information here */}
              <p>Placeholder for warranty information.</p>
            </div>
          )}
        </div>
      </div>

      <hr className="my-6 mx-12 border border-[#ececec] h-0.5px" />

      {/* Other Products Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-[var(--color-semidark)] mb-0 leading-tight">
            Conheça também <br/>
            nossos outros produtos
          </h2>
        <div className="flex items-center gap-4">
          {/* Left Arrow */}
          <button className="p-2 text-[var(--color-dark)] disabled:opacity-50">
            &lt;
          </button>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar flex-grow">
            {/* Placeholder Product Card */}
            <div className="flex-shrink-0 w-60">
              <div className="relative w-full h-60 bg-gray-200 rounded-lg overflow-hidden">
                 <Image
                  src="/assets/images/list/curtaPlegar.png"
                  alt="Product Image"
                  fill
                  className="object-cover"
                />
                 {/* Lançamento Badge */}
                 <span className="absolute top-2 left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded">Lançamento</span>
              </div>
              <p className="text-gray-800 font-semibold mt-2">Órtese Soft Curta com Polegar</p>
              <p className="text-gray-600 text-sm">Código SKU OR1065 / OR1065</p>
            </div>
             {/* Placeholder Product Card */}
            <div className="flex-shrink-0 w-60">
              <div className="relative w-full h-60 bg-gray-200 rounded-lg overflow-hidden">
                 <Image
                  src="/assets/images/list/semPolegar.png"
                  alt="Product Image"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-gray-800 font-semibold mt-2">Órtese Soft Curta sem Polegar</p>
              <p className="text-gray-600 text-sm">Código SKU OR1066</p>
            </div>
             {/* Placeholder Product Card */}
            <div className="flex-shrink-0 w-60">
              <div className="relative w-full h-60 bg-gray-200 rounded-lg overflow-hidden">
                 <Image
                  src="/assets/images/list/softPolegar.png"
                  alt="Product Image"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-gray-800 font-semibold mt-2">Órtese de Polegar LEAN®</p>
              <p className="text-gray-600 text-sm">Código SKU OR1012</p>
            </div>
             {/* Placeholder Product Card */}
            <div className="flex-shrink-0 w-60">
              <div className="relative w-full h-60 bg-gray-200 rounded-lg overflow-hidden">
                 <Image
                  src="/assets/images/list/softair.png"
                  alt="Product Image"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-gray-800 font-semibold mt-2">Órtese Safe Air</p>
              <p className="text-gray-600 text-sm">Código SKU OR1051</p>
            </div>
            {/* Add more product cards here */}
          </div>
          {/* Right Arrow */}
           <button className="p-2 text-[var(--color-dark)] disabled:opacity-50">
            &gt;
          </button>
        </div>
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
  );
} 