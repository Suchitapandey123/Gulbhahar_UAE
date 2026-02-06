"use client";
import { ArrowLeft, Home, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Static premium 404 Not Found page for Gulbhahar.
 * Background styles preserved, animations removed.
 */
const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-[#fffcf9] flex flex-col selection:bg-[#800000]/10">
      {/* Dynamic Background Elements (Static) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floral Pattern Overlay */}
        <div className="floral-pattern absolute inset-0 opacity-[0.03]" />

        {/* Soft Radial Glows - Static */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#800000] rounded-full blur-[120px] opacity-[0.15]" />
        <div className="absolute -bottom-48 -right-48 w-[700px] h-[700px] bg-[#800000] rounded-full blur-[140px] opacity-[0.1]" />
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative z-10 w-full min-h-[75vh] flex flex-col items-center justify-center px-6 pt-32 pb-20">
        {/* 404 Watermark - Static */}
        <div
          className="text-8xl md:text-[16rem] font-serif font-bold leading-none tracking-tighter text-transparent select-none mb-4"
          style={{
            fontFamily: "'Old Standard TT', serif",
            WebkitTextStroke: "1px rgba(128, 0, 0, 0.1)",
          }}
        >
          404
        </div>

        {/* Content */}
        <div className="container relative mx-auto max-w-5xl flex flex-col items-center text-center">
          <h2
            className="text-4xl md:text-6xl font-serif font-bold text-[#2d2d2d] mb-6 tracking-tight"
            style={{ fontFamily: "'Old Standard TT', serif" }}
          >
            A Misplaced <span className="text-[#800000] italic">Treasure</span>
          </h2>

          <p className="max-w-xl mx-auto text-gray-500 text-lg leading-relaxed mb-12 px-4 italic">
            "Not all those who wander are lost, but this particular trail seems
            to have faded."
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/">
              <button className="flex items-center gap-3 px-10 py-5 bg-[#800000] text-white rounded-full font-semibold shadow-xl transition-all hover:bg-[#600000] hover:-translate-y-1">
                <Home size={20} />
                <span>Return to Home</span>
              </button>
            </Link>

            <Link href="/collections">
              <button className="flex items-center gap-3 px-10 py-5 bg-white text-[#800000] border border-[#800000]/20 rounded-full font-semibold shadow-lg transition-all hover:bg-gray-50 hover:-translate-y-1">
                <ShoppingBag size={20} />
                <span>Explore Collections</span>
              </button>
            </Link>
          </div>

          {/* Back Link */}
          <button
            onClick={() => router.back()}
            className="mt-12 flex items-center gap-2 text-gray-400 hover:text-[#800000] transition-colors text-sm font-medium tracking-widest uppercase"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          {/* Luxury Divider */}
          <div className="mt-20 flex items-center justify-center gap-6 w-full max-w-sm opacity-30">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#800000]" />
            <div className="w-2 h-2 rounded-full border border-[#800000]" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#800000]" />
          </div>

          <p className="mt-4 text-[10px] uppercase tracking-[0.4em] font-bold text-[#800000] opacity-40">
            Gulbhahar Heritage
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
