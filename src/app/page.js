import HomePage from '@/all_components/Homepage/HomePage';
import productApi from './api/v0/product-service';
import { QueryClient } from '@tanstack/react-query';

export default async function Home() {
 // Server fetch with TanStack
 const queryClient = new QueryClient();
 
 const data = await queryClient.fetchQuery({
   queryKey: ['getAllProduct'],
   queryFn: () => productApi.getAllProduct()  // Arrow function
 });
 
//  console.log('Server Response:', data);

 return (
   <HomePage data={data} />
 );
}