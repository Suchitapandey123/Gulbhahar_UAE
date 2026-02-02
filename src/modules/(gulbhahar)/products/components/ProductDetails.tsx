import { Product } from "../types";

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="space-y-12 lg:sticky lg:top-28 lg:self-start">
      {/* Elegant Section Header Component */}
      {product.overview && product.overview.length > 0 && (
        <section className="relative">
          {/* Classic header with decorative lines */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-300" />
            <h3 className="text-lg md:text-xl font-serif italic text-[#800000] tracking-wide">
              The Story
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-300" />
          </div>

          {/* Overview content with elegant styling */}
          <div className="relative pl-6 border-l-2 border-[#800000]/20">
            <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-[#800000]" />
            <ul className="space-y-5">
              {product.overview.map((item, idx) => (
                <li
                  key={idx}
                  className="relative text-gray-600 leading-relaxed text-[15px] pl-4"
                >
                  <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#800000]/40" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="absolute -left-1.5 bottom-0 w-3 h-3 rounded-full bg-[#800000]/30" />
          </div>
        </section>
      )}

      {product.details && product.details.length > 0 && (
        <section>
          {/* Classic header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-300" />
            <h3 className="text-lg md:text-xl font-serif italic text-[#800000] tracking-wide">
              Craftsmanship
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-300" />
          </div>

          {/* Details in an elegant card */}
          <div className="relative bg-gradient-to-br from-stone-50 to-gray-50 p-6 md:p-8 border border-gray-100">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#800000]/30" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#800000]/30" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#800000]/30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#800000]/30" />

            <div className="space-y-4">
              {product.details.map((detail, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-[15px] text-gray-700"
                >
                  <span className="text-[#800000] mt-1">✦</span>
                  <span className="leading-relaxed">{detail}</span>
                </div>
              ))}

              {product.material && (
                <div className="mt-6 pt-6 border-t border-dashed border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
                      Material
                    </span>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>
                  <p className="mt-3 text-gray-800 font-medium">
                    {product.material}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {!product.overview?.length && !product.details?.length && (
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-300" />
            <h3 className="text-lg md:text-xl font-serif italic text-[#800000] tracking-wide">
              About This Piece
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-300" />
          </div>

          <div className="relative bg-gradient-to-br from-stone-50 to-gray-50 p-6 md:p-8 border border-gray-100">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#800000]/30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#800000]/30" />

            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-[15px] italic">
              {product.description ||
                "An elegant handcrafted creation from Gulbhahar, where tradition meets contemporary design. Each piece tells a story of skilled artisanship passed down through generations."}
            </p>
          </div>
        </section>
      )}

      {/* Signature footer */}
      <div className="flex items-center justify-center gap-3 pt-4">
        <div className="h-px w-12 bg-[#800000]/20" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400">
          Gulbhahar
        </span>
        <div className="h-px w-12 bg-[#800000]/20" />
      </div>
    </div>
  );
};
