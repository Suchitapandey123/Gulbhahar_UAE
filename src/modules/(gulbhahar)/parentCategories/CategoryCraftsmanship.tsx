import Image from "next/image";

interface SectionFeature {
  icon: string;
  title: string;
  description: string;
}

interface CraftsmanshipSection {
  title: string;
  icon: string;
  content: string;
  features: SectionFeature[];
}

interface CategoryCraftsmanshipProps {
  sections: CraftsmanshipSection[];
}

export default function CategoryCraftsmanship({
  sections,
}: CategoryCraftsmanshipProps) {
  return (
    <section className="bg-stone-50 py-24 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-12 md:gap-20 mb-24 last:mb-0`}
          >
            <div className="w-full md:w-1/2 relative aspect-square group">
              <div className="absolute -inset-4 border border-red-900/10 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={`https://images.unsplash.com/photo-${
                    idx === 0
                      ? "1603912627214-12130998c5fd"
                      : "1583391733956-3750e0ff4e8b"
                  }?auto=format&fit=crop&q=80&w=1000`}
                  alt={section.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-8">
              <span className="text-red-900 text-6xl opacity-20 font-serif">
                0{idx + 1}
              </span>
              <h3 className="text-4xl md:text-5xl font-serif text-gray-900">
                {section.icon} {section.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {section.content}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                {section.features.map((feature, fIdx) => (
                  <div
                    key={fIdx}
                    className="space-y-2 p-4 bg-white rounded-xl shadow-sm border border-black/5 hover:border-red-900/20 transition-colors"
                  >
                    <span className="text-2xl block">{feature.icon}</span>
                    <h4 className="font-bold text-xs uppercase tracking-widest text-gray-900">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
