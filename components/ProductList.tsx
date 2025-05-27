import Image from 'next/image';

export interface Product {
  id: string;
  name: string;
  code: string;
  image: string;
  tags: string[];
  isNewRelease: boolean;
}

interface ProductListProps {
  products: Product[];
  title?: string;
}

export default function ProductList({ products, title }: ProductListProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {title && (
        <h2 className="text-3xl font-bold text-[var(--color-semidark)] mb-8 leading-tight">
          {title}
        </h2>
      )}
      <div className="flex items-center gap-4">
        {/* Left Arrow */}
        <button className="p-2 text-[var(--color-dark)] disabled:opacity-50">
          &lt;
        </button>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar flex-grow">
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-60">
              <div className="relative w-full h-60 bg-gray-200 rounded-lg overflow-hidden group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {product.isNewRelease && (
                  <span className="absolute top-2 left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded">
                    Lançamento
                  </span>
                )}
              </div>
              <p className="text-gray-800 font-semibold mt-2">{product.name}</p>
              <p className="text-gray-600 text-sm">Código SKU {product.code}</p>
            </div>
          ))}
        </div>
        {/* Right Arrow */}
        <button className="p-2 text-[var(--color-dark)] disabled:opacity-50">
          &gt;
        </button>
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
  );
} 