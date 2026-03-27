import HomePage from '@/modules/(gulbhahar)/home';

export const revalidate = false; // 30 min ISR

export default async function Home() {
  return <HomePage />
}
