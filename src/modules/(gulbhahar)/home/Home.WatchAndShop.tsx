import ReelCard from "./components/ReelCard";

// Sample Reel Data - server-side defined, passed to client
const REELS_DATA = [
  {
    id: 1,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/watch-and-shop/saree.mp4",
    title: "The Ethereal Saree",
    product: {
      name: "Handcrafted Silk Saree",
      price: "₹14,999",
      image:
        "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/saree.webp",
    },
  },
  {
    id: 2,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/watch-and-shop/suits.mp4",
    title: "Royal Suit Edit",
    product: {
      name: "Embroidered Velvet Suit",
      price: "₹12,499",
      image:
        "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/suits.webp",
    },
  },
  {
    id: 3,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/watch-and-shop/lehenga.mp4",
    title: "The Grand Lehenga",
    product: {
      name: "Bridal Heritage Lehenga",
      price: "₹45,999",
      image:
        "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/lehenga.webp",
    },
  },
  {
    id: 4,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/watch-and-shop/jewellery.mp4",
    title: "Timeless Jewels",
    product: {
      name: "Kundan Statement Set",
      price: "₹8,499",
      image:
        "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/jewellery.webp",
    },
  },
  {
    id: 5,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/watch-and-shop/bags.mp4",
    title: "Artisan Bags",
    product: {
      name: "Hand-Embroidered Potli",
      price: "₹3,299",
      image:
        "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/bags.webp",
    },
  },
  {
    id: 6,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/watch-and-shop/juttis.mp4",
    title: "The Soulful Juttis",
    product: {
      name: "Traditional Leather Juttis",
      price: "₹2,499",
      image:
        "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/juttis.webp",
    },
  },
];

const Home_WatchAndShop = () => {
  return (
    <section className="overflow-hidden mt-8">
      {/* Server-rendered header for SEO */}
      <div className="flex flex-col space-y-4 justify-center mb-6">
        <div className="flex justify-center items-center gap-3">
          <span className="w-16 h-px bg-[#800000]" />
          <span className="text-[#800000] text-[11px] font-bold tracking-[0.4em] uppercase">
            Gulbhahar Studio
          </span>
        </div>

        <h2 className="text-5xl md:text-7xl text-center font-serif text-[#1a1a1a] leading-[1.1]">
          Watch <span className="italic text-[#800000] serif-italics">&</span>{" "}
          Shop
        </h2>

        <p className="text-gray-500 text-center text-base md:text-lg leading-relaxed font-light">
          Experience our latest silhouettes in motion. Every thread tells a
          story of heritage, now just a tap away.
        </p>
      </div>

      {/* Horizontal Reels Container - Client components for interactivity */}
      <div className="relative">
        <div className="flex overflow-x-auto gap-4 no-scrollbar snap-x snap-proximity md:snap-mandatory cursor-grab active:cursor-grabbing">
          {REELS_DATA.map((reel) => (
            <div key={reel.id} className="snap-center">
              <ReelCard reel={reel} />
            </div>
          ))}

          {/* Trailer space */}
          <div className="flex-none w-12" />
        </div>
      </div>
    </section>
  );
};

export default Home_WatchAndShop;
