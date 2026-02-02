import ReelItem, { ReelData } from "./components/ReelItem";

// Reels data - can be fetched from API/CMS in production
const REELS_DATA: ReelData[] = [
  {
    id: 1,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/11.mp4",
    posterUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/poster-1.jpg",
    title: "Handcrafted with Love",
    description: "Every stitch tells a story",
  },
  {
    id: 2,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/14.mp4",
    posterUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/poster-2.jpg",
    title: "The Art of Embroidery",
    description: "Traditional techniques, modern elegance",
  },
  {
    id: 3,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/13.mp4",
    posterUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/poster-3.jpg",
    title: "Colors of Heritage",
    description: "Inspired by India's rich culture",
  },
  {
    id: 4,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/12.mp4",
    posterUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/poster-4.jpg",
    title: "From Artisan to You",
    description: "A journey of craftsmanship",
  },
];

export default function Home_Reels() {
  return (
    <section className="bg-gradient-to-b from-stone-50 to-white py-12 md:py-16 overflow-hidden">
      {/* Server-rendered header for SEO */}
      <div className="max-w-[1600px] mx-auto px-4 mb-8 md:mb-10">
        {/* Section label */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-[#800000]/40" />
          <span className="text-[#800000] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
            Watch & Shop
          </span>
          <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-[#800000]/40" />
        </div>

        {/* Section title */}
        <h2 className="text-3xl md:text-5xl text-center font-serif text-gray-900 leading-tight mb-4">
          Our{" "}
          <span className="italic text-[#800000]">Reels</span>
        </h2>

        {/* Section description */}
        <p className="text-center text-gray-500 max-w-xl mx-auto text-sm md:text-base">
          Discover the beauty of handcrafted artistry through our curated collection of videos
        </p>
      </div>

      {/* Reels horizontal scroll - Client components for video interactivity */}
      <div className="relative">
        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-stone-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrollable container */}
        <div className="flex pl-4 md:pl-10 2xl:pl-20 justify-start 2xl:justify-center overflow-x-auto gap-4 md:gap-6 no-scrollbar snap-x snap-mandatory pb-4">
          {REELS_DATA.map((reel) => (
            <ReelItem key={reel.id} reel={reel} />
          ))}
          {/* End spacing */}
          <div className="flex-none w-4 md:w-10 2xl:w-20" />
        </div>
      </div>

      {/* View all link */}
      <div className="flex justify-center mt-8">
        <a
          href="/reels"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#800000] hover:text-[#600000] transition-colors group"
        >
          <span>View all reels</span>
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}