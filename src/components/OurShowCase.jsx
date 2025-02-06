import Image from "next/image";

export default function OurShowcase() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold mb-12 text-left">OUR SHOWCASE</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="aspect-[3/4] relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/1.svg"
              alt={`Image of Gulbhahar ${i + 1}`}
              layout="fill"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
