interface CategoryIntroductionProps {
  introduction: string;
}

export default function ParentCategoryIntroduction({
  introduction,
}: CategoryIntroductionProps) {
  return (
    <section className="py-20 px-4 md:px-8 max-w-[1200px] mx-auto text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-px bg-red-900/30" />
        <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight italic">
          A Journey of{" "}
          <span className="text-red-900 not-italic uppercase tracking-tighter font-bold">
            Heritage
          </span>{" "}
          & Style
        </h2>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl font-light italic">
          {introduction}
        </p>
        <div className="w-12 h-px bg-red-900/30" />
      </div>
    </section>
  );
}
