// @ts-nocheck
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({ items }) => (
  <div className="flex items-center gap-2 mb-6 sm:mb-8">
    {items.map((item, index) => (
      <div key={index} className="flex items-center gap-2">
        {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
        <button
          onClick={item.onClick}
          className={`text-sm sm:text-base font-medium transition-colors ${
            index === items.length - 1
              ? 'text-red-900 cursor-default'
              : 'text-gray-600 hover:text-red-900'
          }`}
        >
          {item.label}
        </button>
      </div>
    ))}
  </div>
);

export default Breadcrumb;