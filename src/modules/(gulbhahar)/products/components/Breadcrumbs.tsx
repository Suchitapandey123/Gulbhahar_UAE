import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface BreadcrumbsProps {
  parentCategoryName: string;
  productName: string;
  customRed: string;
}

export const Breadcrumbs = ({
  parentCategoryName,
  productName,
  customRed,
}: BreadcrumbsProps) => {
 
  return (
    <div className="mb-4 lg:mb-6">
      <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto pb-1">
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-gray-900 transition-colors"
          >
            <Home className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
          <Link
            href={`/${parentCategoryName}`}
            className="hover:text-gray-900 transition-colors"
            style={{ color: customRed }}
          >
            Products
          </Link>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
          <span
            className="whitespace-nowrap max-w-[80px] sm:max-w-none truncate"
            style={{ color: customRed }}
            title={parentCategoryName}
          >
            {parentCategoryName?.charAt(0).toUpperCase() + parentCategoryName?.slice(1)}
          </span>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
          <span
            className="text-gray-900 font-medium whitespace-nowrap max-w-[100px] sm:max-w-[200px] lg:max-w-none truncate"
            title={productName}
          >
            {productName}
          </span>
        </div>
      </nav>
    </div>
  );
};
