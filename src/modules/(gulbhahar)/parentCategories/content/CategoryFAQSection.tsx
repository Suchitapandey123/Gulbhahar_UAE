import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface CategoryFAQSectionProps {
  title: string;
  items: FAQItem[];
}

export default function CategoryFAQSection({
  title,
  items,
}: CategoryFAQSectionProps) {
  return (
    <section className=" bg-stone-50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900">
            {title}
          </h2>
        </div>

        {/* FAQ Items - Using native HTML details/summary for server-side */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <details
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-sm"
              open={index === 0}
            >
              <summary className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="font-semibold text-gray-900 pr-4">
                  {item.question}
                </span>
                <ChevronDown className="w-5 h-5 text-red-800 flex-shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="px-6 pb-5">
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
