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
          <span className="font-medium text-gray-900">MATERIAL & CARE</span>
          {openAccordion === "material" ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {openAccordion === "material" && (
          <div className="pb-4 text-sm text-gray-600 animate-in fade-in slide-in-from-top-2 space-y-2">
            <p>{product.material || "Premium quality fabric"}</p>
            <p className="text-gray-500">• Dry clean recommended · Handle with care · Store in a cool dry place</p>
          </div>
        )}
      </div>

      {/* SHIPPING */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleAccordion("shipping")}
          className="w-full py-4 flex justify-between items-center text-left"
        >
          <span className="font-medium text-gray-900">SHIPPING INFORMATION</span>
          {openAccordion === "shipping" ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {openAccordion === "shipping" && (
          <div className="pb-4 text-sm text-gray-600 animate-in fade-in slide-in-from-top-2 space-y-1.5">
            <p>• Orders dispatched within <span className="font-medium text-gray-800">1–2 business days</span></p>
            <p>• Delivery across the UAE in <span className="font-medium text-gray-800">3–5 business days</span></p>
            <p>• Free UAE shipping on all orders</p>
            <p>• DHL / Aramex tracking link shared after dispatch</p>
          </div>
        )}
      </div>

      {/* RETURNS */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleAccordion("returns")}
          className="w-full py-4 flex justify-between items-center text-left"
        >
          <span className="font-medium text-gray-900">RETURNS & EXCHANGE</span>
          {openAccordion === "returns" ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {openAccordion === "returns" && (
          <div className="pb-4 text-sm text-gray-600 animate-in fade-in slide-in-from-top-2 space-y-1.5">
            <p>• <span className="font-medium text-gray-800">7-day easy returns</span> from date of delivery</p>
            <p>• Item must be unused, unwashed & in original packaging</p>
            <p>• Exchange available for size issues</p>
            <p>• Contact us on WhatsApp to initiate return</p>
          </div>
        )}
      </div>
    </div>
  );
};
