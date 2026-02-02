export interface ContentBlock {
  type: "paragraph" | "heading" | "list" | "quote";
  content: string;
  items?: string[];
}

interface CategoryParagraphSectionProps {
  tagline?: string;
  title: string;
  blocks: ContentBlock[];
}

export default function CategoryParagraphSection({
  tagline,
  title,
  blocks,
}: CategoryParagraphSectionProps) {
  return (
    <section className=" bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {tagline && (
            <span className="text-red-800 text-sm font-bold tracking-[0.2em] uppercase">
              {tagline}
            </span>
          )}
          <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mt-4">
            {title}
          </h2>
        </div>

        {/* Content Blocks */}
        <article className="prose prose-lg max-w-none">
          {blocks.map((block, index) => {
            switch (block.type) {
              case "heading":
                return (
                  <h3
                    key={index}
                    className="text-2xl md:text-3xl font-serif text-gray-900 mt-10 mb-4"
                  >
                    {block.content}
                  </h3>
                );

              case "paragraph":
                return (
                  <p
                    key={index}
                    className="text-gray-600 leading-relaxed mb-6 text-base md:text-lg"
                  >
                    {block.content}
                  </p>
                );

              case "list":
                return (
                  <ul
                    key={index}
                    className="space-y-3 mb-6 ml-4"
                  >
                    {block.items?.map((item, i) => (
                      <li
                        key={i}
                        className="text-gray-600 leading-relaxed flex items-start gap-3"
                      >
                        <span className="w-2 h-2 bg-red-800 rounded-full mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );

              case "quote":
                return (
                  <blockquote
                    key={index}
                    className="border-l-4 border-red-800 pl-6 py-2 my-8 italic"
                  >
                    <p className="text-gray-700 text-xl font-serif leading-relaxed">
                      {block.content}
                    </p>
                  </blockquote>
                );

              default:
                return null;
            }
          })}
        </article>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <div className="h-px bg-gray-200 w-16" />
          <span className="text-red-800 text-2xl">✦</span>
          <div className="h-px bg-gray-200 w-16" />
        </div>
      </div>
    </section>
  );
}
