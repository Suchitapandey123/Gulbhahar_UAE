"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Product } from "../types";

interface ProductDetailsAccordionProps {
  product: Product;
  openAccordion: string | null;
  toggleAccordion: (section: string) => void;
}

export const ProductDetailsAccordion = ({
  product,
  openAccordion,
  toggleAccordion,
}: ProductDetailsAccordionProps) => {
  return (
    <div className="space-y-0">
      {/* OVERVIEW */}
      {product.overview && product.overview.length > 0 && (
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleAccordion("overview")}
            className="w-full py-4 flex justify-between items-center text-left"
          >
            <span className="font-medium text-gray-900">OVERVIEW</span>
            {openAccordion === "overview" ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {openAccordion === "overview" && (
            <div className="pb-4 text-sm text-gray-600 animate-in fade-in slide-in-from-top-2">
              <ul className="space-y-2">
                {product.overview.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* DETAILS */}
      {product.details && product.details.length > 0 && (
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleAccordion("details")}
            className="w-full py-4 flex justify-between items-center text-left"
          >
            <span className="font-medium text-gray-900">DETAILS</span>
            {openAccordion === "details" ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {openAccordion === "details" && (
            <div className="pb-4 text-sm text-gray-600 animate-in fade-in slide-in-from-top-2">
              <ul className="space-y-2">
                {product.details.map((detail, idx) => (
                  <li key={idx}>• {detail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* MATERIAL */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleAccordion("material")}
          className="w-full py-4 flex justify-between items-center text-left"
        >
          <span className="font-medium text-gray-900">MATERIAL</span>
          {openAccordion === "material" ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {openAccordion === "material" && (
          <div className="pb-4 text-sm text-gray-600 animate-in fade-in slide-in-from-top-2">
            {product.material || "Cotton Blend"}
          </div>
        )}
      </div>
    </div>
  );
};
