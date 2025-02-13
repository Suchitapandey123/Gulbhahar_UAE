'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Breadcrumb = () => {
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  const path = router.pathname;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex space-x-2 text-blue-600">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        {path === '/collection' && (
          <li className="text-customRed">Collection</li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
