import Image from "next/image";

interface Feature {
  icon: string;
  title: string;
  description: string;
  image?: string;
}

interface CategoryFeaturesSectionProps {
  tagline: string;
  title: string;
  items: Feature[];
}

const iconMap: Record<string, string> = {
  sparkles: "✨",
  palette: "🎨",
  shield: "🛡️",
  recycle: "♻️",
  crown: "👑",
  gift: "🎁",
  clock: "⏰",
  certificate: "📜",
  users: "👥",
  truck: "🚚",
  needle: "🪡",
  gem: "💎",
  layers: "📚",
  briefcase: "💼",
  "shopping-bag": "🛍️",
  circle: "⭕",
  link: "🔗",
  star: "⭐",
};

export default function CategoryFeaturesSection({
  tagline,
  title,
  items,
}: CategoryFeaturesSectionProps) {
  return (
    <section className="">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-red-800 text-sm font-bold tracking-[0.2em] uppercase">
            {tagline}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mt-4">
            {title}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="group bg-stone-50 rounded-2xl p-6 hover:bg-red-50 transition-colors duration-300"
            >
              {/* Content */}
              <h3 className="font-bold text-gray-900 text-lg mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Optional Image */}
              {item.image && (
                <div className="mt-6 relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

    </section>
  );
}
