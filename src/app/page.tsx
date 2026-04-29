import HomePage from '@/modules/(gulbhahar)/home';

export const revalidate = 1800; // 30 min ISR

export default async function Home() {
  return (
    <>
      <link rel="preload" as="image" href="https://d21ojmskh8ksuv.cloudfront.net/static/home/hero-section/1.webp" media="(min-width: 768px)" fetchPriority="high" />
      <link rel="preload" as="image" href="https://d21ojmskh8ksuv.cloudfront.net/static/home/hero-section/1-mobile.webp" media="(max-width: 767px)" fetchPriority="high" />
      <link rel="preload" as="image" href="https://d21ojmskh8ksuv.cloudfront.net/static/home/hero-section/2.webp" media="(min-width: 768px)" />
      <link rel="preload" as="image" href="https://d21ojmskh8ksuv.cloudfront.net/static/home/hero-section/2-mobile.webp" media="(max-width: 767px)" />
      <HomePage />
    </>
  );
}
