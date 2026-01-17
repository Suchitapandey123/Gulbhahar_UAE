// Optimized with caching for better performance
import HomePage from '@/all_components/Homepage/HomePage';
import productApi from './api/v0/product-service';
import { QueryClient } from '@tanstack/react-query';

// Revalidate every 60 seconds for fresh data while maintaining cache
export const revalidate = 60;

export default async function Home() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Cache for 5 minutes, consider stale after 1 minute
        gcTime: 5 * 60 * 1000,
        staleTime: 60 * 1000,
      },
    },
  });

  const data = await queryClient.fetchQuery({
    queryKey: ['getAllProduct'],
    queryFn: () => productApi.getAllProduct(),
    staleTime: 60 * 1000,
  });

  return (
    <HomePage data={data} />
  );
}