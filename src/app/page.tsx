import HomePage from '@/modules/(gulbhahar)/home';

export const revalidate = 1800; // 30 min ISR

export default async function Home() {
  return <HomePage />
}
