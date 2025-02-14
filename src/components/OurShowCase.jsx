"use client"
import Image from "next/image";

export default function OurShowcase() {
  return (
    <section className="container mx-auto px-6 py-16 mt-16">
      <h1 className="text-5xl font-bold mb-12 text-left font-raleway text-customRed lg:ml-10">OUR SHOWCASE</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ml-12">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="aspect-[3/4] relative">
            <Image
              src="/showcase.svg"
              // alt={`Image of Gulbhahar ${i + 1}`}
              alt="showcase image"
              width={300}
              height={450}
              className=" object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
