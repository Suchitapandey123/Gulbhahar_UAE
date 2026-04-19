import { Old_Standard_TT } from "next/font/google";

const oldStandardTT = Old_Standard_TT({
  weight: "400",
  variable: "--font-old-standard-tt",
  subsets: ["latin"],
});

interface QuickTagProps {
  popularTags?: string[];
}

export default function QuickTag({ popularTags = [] }: QuickTagProps) {
  if (!popularTags || popularTags.length === 0) return null;

  return (
    <div className="max-w-[1600px] mx-auto pb-8">
      <div className="mb-6">
        {/* Unique heading: left red border + # prefix + smaller muted style */}
        <div className="flex items-center gap-3 mb-4">
          <span className={`${oldStandardTT.variable} text-lg lg:text-2xl  text-red-700 font-semibold tracking-wide`}>
            Popular Tags
          </span>
        </div>

        <div className="flex flex-wrap text-gray-700 text-[15px] leading-relaxed">
          {popularTags.map((tag, index) => (
            <span key={index} className="flex items-center">
              <span className="hover:text-red-900 cursor-default">
                {tag}
              </span>
              {index !== popularTags.length - 1 && (
                <span className="mx-1 text-gray-400"> | </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
