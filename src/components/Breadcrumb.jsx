'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Breadcrumb = () => {
  const [isClient, setIsClient] = useState(false); // State to track if component is mounted on client

  const router = useRouter();
  const path = router.pathname;

  // Set isClient to true once the component is mounted on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Return nothing on the server side
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
          <li className="text-gray-500">Collection</li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
