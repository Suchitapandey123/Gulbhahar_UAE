import ShowcaseReelItem from "./components/ShowcaseReelItem";

interface ReelData {
  id: number;
  videoUrl: string;
  title: string;
}

const CULTURAL_REELS: ReelData[] = [
  {
    id: 1,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/11.mp4",
    title: "The Art of Zardozi",
  },
  {
    id: 2,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/14.mp4",
    title: "Handloom Heritage",
  },
  {
    id: 3,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/13.mp4",
    title: "Mastering Silk",
  },
  {
    id: 4,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/12.mp4",
    title: "The Craftsmanship Story",
  },
];

export default function Home_OurShowcase() {
  return (
    <section className="bg-white py-5 overflow-hidden">
      {/* Server-rendered header for SEO */}
      <div className="max-w-[1600px] mx-auto mb-4">
        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-customRed text-xs font-bold tracking-[0.4em] uppercase">
              Gulbhahar Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl text-center font-serif text-[#1a1a1a] leading-tight">
            Stories{" "}
            <span className="italic text-customRed serif-italics">
              in Motion
            </span>
          </h2>
        </div>
        <p className="text-center text-gray-500 max-w-2xl mx-auto font-light text-base md:text-lg">
          Experience our artisanal journey in motion. From the first stitch to
          the final embellishment, witness the soul of Gulbhahar.
        </p>
      </div>

      {/* Client components for video interactivity */}
      <div className="flex justify-start 2xl:justify-center overflow-x-auto gap-6 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing">
        {CULTURAL_REELS.map((reel) => (
          <ShowcaseReelItem key={reel.id} reel={reel} />
        ))}
        {/* Placeholder for spacing at the end */}
        <div className="flex-none w-1" />
      </div>
    </section>
  );
}
