import Image from "next/image";

export default function OurShowcase() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold mb-12 text-left font-raleway text-customRed">OUR SHOWCASE</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="aspect-[3/4] relative  rounded-md overflow-hidden object-cover shadow-lg">
            <Image
              src="/showcase.svg"
              alt={`Image of Gulbhahar ${i + 1}`}
              layout="fill"
              className="object-cover w-[300x] h-[450px] bg-showcaseBgColor rounded-md"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
