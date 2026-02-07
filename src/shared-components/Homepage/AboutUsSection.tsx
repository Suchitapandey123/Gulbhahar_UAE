import { SoulOfGulbhaharItem } from "@/app/api/home/type";
import { ArrowRight, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";


// const stories = [
//   {
//     id: 1,
//     image: "https://d21ojmskh8ksuv.cloudfront.net/static/home/soul-of-gulbhahar/1.webp",
//     category: "The Heritage",
//     title: "Made with Love & Care",
//     description:
//       "Gulbhahar starts with a passion for Indian craft and the people who make it. Each piece is crafted with love and care by skilled craftsmen who have learned their trade over the years. We give care to every small detail to keep the traditions alive.",
//     highlight: "100+ Years Legacy",
//   },
//   {
//     id: 2,
//     image: "https://d21ojmskh8ksuv.cloudfront.net/static/home/soul-of-gulbhahar/2.webp",
//     category: "The Vision",
//     title: "A Tradition That Is Perfect For Today",
//     description:
//       "Traditional methods are used to create designs that are appropriate for today’s world. Gulbhahar retains the essence of tradition but gives it a clean and simple look. The products we offer are easy to use, easy to wear, and blend in seamlessly with today’s world. None of our products has lost its roots.",
//     highlight: "Modern Innovation",
//   },
//   {
//     id: 3,
//     image: "https://d21ojmskh8ksuv.cloudfront.net/static/home/soul-of-gulbhahar/3.webp",
//     category: "The Ethics",
//     title: "Crafting Luxury With Care",
//     description:
//       "Luxury at Gulbhahar means taking care and putting thought into every item. Our products are produced in limited quantities so that craftsmen have the time to do their work well. Materials are selected with care, and waste is minimised. The aim is to have products that are long-lasting and special every time they are worn.",
//     highlight: "Sustainable Artisans",
//   },
// ];

interface AboutUsSectionProps {
  SoulOfGulbhahar : SoulOfGulbhaharItem[]
}

const AboutUsSection: React.FC<AboutUsSectionProps> = ({SoulOfGulbhahar}) => {
  return (
    <section className=" overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
        {/* Editorial Header */}
        <div className="relative mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-center gap-8">
            <div className="max-w-2xl">
              <div className="flex justify-center items-center gap-3 mb-6">
                <span className="w-12 h-[1px] bg-[#800000]" />
                <span className="text-[#800000] text-xs text-center font-bold tracking-[0.4em] uppercase">
                  Our Philosophy
                </span>
              </div>
              <h2 className="text-5xl font-serif text-center text-[#1a1a1a] leading-[0.9] tracking-tight">
                The Soul of {" "}
                <span className="italic text-[#800000] serif-italics">
                  Gulbhahar
                </span>
              </h2>
            </div>
          </div>
          {/* Decorative background text */}
          <div className="absolute  -top-12 -right-12 text-[12rem] font-black text-gray-200/20 select-none pointer-events-none hidden lg:block">
            EST. 2024
          </div>
        </div>

        {/* Story Blocks */}
        <div className="space-y-6 ">
          {SoulOfGulbhahar.map((story, index) => (
            <div
              key={story.id}
              className={`flex  flex-col ${
                index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-12 md:gap-24`}
            >
              {/* Image Frame with Asymmetrical Border */}
              <div className="relative w-full md:w-1/2">
                <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Floating Highlight Badge */}
                  <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl hidden md:block">
                    <span className="text-white text-[10px] font-bold tracking-[0.3em] uppercase block mb-1">
                      {story.category}
                    </span>
                    <span className="text-white text-xl font-serif">
                      {story.highlight}
                    </span>
                  </div>
                </div>
                {/* Decorative Frame Element */}
                <div
                  className={`absolute -inset-4  border-[#800000]/10 -z-10 hidden md:block ${
                    index % 2 === 1 ? "-translate-x-4" : "translate-x-4"
                  } translate-y-4`}
                />
              </div>

              {/* Content block */}
              <div className="w-full md:w-1/2 space-y-4">
                <div className="space-y-4">
                  <span className="text-[#800000] text-[10px] font-bold tracking-[0.5em] uppercase px-4 py-1.5 bg-[#800000]/5 rounded-full inline-block">
                    {story.category}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] leading-tight">
                    {story.title}
                  </h3>
                </div>

                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                  {story.description}
                </p>

                <div className="">
                  <Link
                    href="/heritage-culture"
                    className="inline-flex items-center gap-4 text-[#1a1a1a] font-bold tracking-widest uppercase text-xs hover:text-[#800000] transition-colors group"
                  >
                    Read the Story
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#800000] group-hover:bg-[#800000] group-hover:text-white transition-all duration-300">
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Final CTA */}
        <div className="mt-10 relative py-24 md:py-32 bg-[#1a1a1a] overflow-hidden group">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[url('/home-page/culture.svg')] bg-repeat opacity-20 scale-150" />
          </div>

          <div className="relative z-10 text-center px-4">
            <h3 className="text-4xl md:text-7xl font-serif text-white mb-8 leading-tight">
              Ready to walk in <br />
              <span className="italic serif-italics text-[#D4AF37]">
                Living Art?
              </span>
            </h3>
            <p className="text-gray-400 text-lg md:text-xl font-light mb-12 max-w-xl mx-auto">
              Every pair is a masterpiece waiting for its next chapter. Find
              your signature story in our latest collections.
            </p>
            <Link href="/collections">
              <button className="bg-white text-nowrap text-black px-12 py-5 rounded-full font-bold tracking-[0.2em] uppercase text-sm flex items-center gap-4 mx-auto hover:bg-[#D4AF37] hover:text-white transition-all duration-500 shadow-2xl active:scale-95">
                Explore Collections
                <MoveUpRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
