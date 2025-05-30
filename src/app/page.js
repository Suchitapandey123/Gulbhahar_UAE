import axios from 'axios';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import Providers from './providers'; // your React Query Provider
import HomePage from '@/all_components/Homepage/HomePage';
import Navbar from '@/all_components/Navbar/Navbar';
import Footer from '@/all_components/Footer/Footer';
import productApi from './api/v0/product-service';


export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: productApi.getAllProduct(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    // <Providers dehydratedState={dehydratedState}>
    //   <Navbar />
      <HomePage />
    //   <Footer />
    // </Providers>
  );
}
