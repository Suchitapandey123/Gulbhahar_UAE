// ISR with on-demand revalidation - uses 'home' tag
// Revalidate via: POST /api/revalidate { secret, type: 'tag', tag: 'home' }
import HomePage from '@/shared-components/Homepage/HomePage';
import productApi from './api/v0/product-service';

// ISR: Revalidate every hour (fallback), or on-demand via /api/revalidate
export const revalidate = 3600;

// Fetch products with proper caching - no need for QueryClient on server
async function getProducts() {
  try {
    const data = await productApi.getAllProduct();
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  const data = await getProducts();

  return (
    <HomePage data={data} />
  );
}