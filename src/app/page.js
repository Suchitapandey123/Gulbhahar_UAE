// Solution 1: Force fresh data on every request (Recommended)
import HomePage from '@/all_components/Homepage/HomePage';
import productApi from './api/v0/product-service';
import { QueryClient } from '@tanstack/react-query';



export default async function Home() {
  // Create a new QueryClient instance for each request
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Disable caching for server-side fetching
        cacheTime: 0,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
      },
    },
  });
  
  const data = await queryClient.fetchQuery({
    queryKey: ['getAllProduct'],
    queryFn: () => productApi.getAllProduct(),
    // Force fresh fetch
    staleTime: 0,
    cacheTime: 0,
  });
  
  // // console.log('Fresh Server Response:', data);

  return (
    <HomePage data={data} />
  );
}