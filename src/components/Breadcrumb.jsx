"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ArrowRight from './ui/ArrowRight';

const Breadcrumb = () => {
  const pathname = usePathname();
  const generateBreadcrumbs = () => {
    const segments = pathname.replace(/\/$/, '').split('/').filter(Boolean);
    const items = segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        path,
      };
    });
    
    return items;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="flex items-center space-x-1 text-sm md:text-base py-4 px-4 md:px-6">
      <Link 
        href="/" 
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <span className="text-black font-raleway text-lg">Home</span>
      </Link>
      
      {breadcrumbs.map((item, index) => (
        <div key={item.path} className="flex items-center">
           <ArrowRight className="h-4 w-4 mx-1"/>
          <Link
            href={item.path}
            className={`hover:text-gray-900 ${
              index === breadcrumbs.length - 1
                ? 'text-customRed font-raleway text-lg'
                : 'text-gray-700'
            }`}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;