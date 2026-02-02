interface CategoryConclusionProps {
  conclusion: {
    title: string;
    content: string;
    finalNote: string;
  };
}

export default function CategoryConclusion({
  conclusion,
}: CategoryConclusionProps) {
  return (
    <section className="relative py-32 px-4 text-center overflow-hidden">
      <div className="absolute inset-0 floral-pattern opacity-[0.03]" />
      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        <div className="inline-block p-4 rounded-full border border-red-900/20 mb-4">
          <span className="text-3xl">✨</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-serif text-gray-900 italic leading-tight">
          {conclusion.title}
        </h2>
        <p className="text-gray-600 text-xl font-light italic leading-relaxed">
          {conclusion.content}
        </p>
        <div className="pt-8">
          <p className="text-red-900 font-serif text-2xl italic">
            {conclusion.finalNote}
          </p>
        </div>
      </div>
    </section>
  );
}
