import Image from "next/image";

interface CategoryHeroProps {
  title: string;
  subtitle: string;
  heroImage: string;
}

export default function CategoryHero({
  title,
  subtitle,
  heroImage,
}: CategoryHeroProps) {
  return (
    <section className="relative h-screen  w-full overflow-hidden">
      <Image
        src={heroImage}
        alt={title}
        fill
        priority
        className="object-cover object-center "
      />
      {/* Elegant Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white" /> */}

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-4xl animate-fade-in-up">
          <span className="text-white/90 text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-4 block">
            The Gulbhahar Collection
          </span>
          <h1 className="text-4xl md:text-7xl lg:text-8xl text-white font-serif leading-tight mb-6">
            {title.split(" ").map((word, i) => (
              <span
                key={i}
                className={i % 2 !== 0 ? "italic serif-italics" : ""}
              >
                {word}{" "}
              </span>
            ))}
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto italic">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
