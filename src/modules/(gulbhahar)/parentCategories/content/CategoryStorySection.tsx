import Image from "next/image";

interface Highlight {
  icon: string;
  title: string;
  description: string;
}

interface CategoryStorySectionProps {
  tagline: string;
  title: string;
  description: string;
  highlights: Highlight[];
  image?: string;
}

export default function CategoryStorySection({
  tagline,
  title,
  description,
  highlights,
  image,
}: CategoryStorySectionProps) {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <span className="text-red-800 text-sm font-bold tracking-[0.2em] uppercase">
                {tagline}
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mt-4 leading-tight">
                {title}
              </h2>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">{description}</p>

            <div className="space-y-6 pt-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex gap-4">

                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          {image && (
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-red-200 rounded-full opacity-50" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-red-200 rounded-full opacity-30" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
