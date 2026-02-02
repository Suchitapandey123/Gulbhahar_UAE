import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryCTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function CategoryCTASection({
  title,
  description,
  buttonText,
  buttonLink,
}: CategoryCTASectionProps) {
  return (
    <section className="bg-gradient-to-br from-red-900 via-red-800 to-red-900">
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative Element */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-1 bg-white/30 rounded-full" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
          {title}
        </h2>

        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {description}
        </p>

        <Link
          href={buttonLink}
          className="inline-flex items-center gap-3 bg-white text-red-900 px-8 py-4 rounded-full font-bold hover:bg-red-50 transition-colors group"
        >
          {buttonText}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
