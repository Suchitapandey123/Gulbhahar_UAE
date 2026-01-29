import { TrendingUp } from "lucide-react";
import { Old_Standard_TT } from "next/font/google";

const oldStandardTT = Old_Standard_TT({
  weight: "400",
  variable: "--font-old-standard-tt",
  subsets: ["latin"],
});

export default function QuickTag({ popularTags = [] }) {
  // If no tags, don't render
  if (!popularTags || popularTags.length === 0) return null;

  return (
    <div className="max-w-[1600px] mx-auto px-4 animate-fade-in">
      {/* Full Width Popular Tags */}
      <div className="w-full animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-red-700 animate-bounce" />
          <span
            className={`${oldStandardTT.variable} text-2xl lg:text-3xl font-semibold relative`}
          >
            <span className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 bg-clip-text text-transparent">
              Popular Tags
            </span>
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          {popularTags.map((tag, index) => (
            <div
              key={index}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-0.5 hover:scale-105 active:scale-98">
                <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 -z-10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />

                <span
                  className={`${oldStandardTT.variable} text-sm lg:text-base text-gray-700 group-hover:text-red-700 transition-colors duration-200 relative z-10`}
                >
                  {tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
