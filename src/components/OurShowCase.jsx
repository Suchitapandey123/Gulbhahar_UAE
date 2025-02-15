"use client"
import Image from "next/image";

export default function OurShowcase() {

  const img='/showcase.svg'

  return (
    <section className="container mx-auto lg:px-6 lg:py-16 lg:mt-20 mt-16">
      <h1 className="lg:text-5xl text-3xl font-bold lg:mb-12 mb-10 text-left font-raleway text-customRed lg:ml-10">OUR SHOWCASE</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  lg:ml-12 ml-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="aspect-[3/4] relative">
            <Image
              src={img || null}
              // alt={`Image of Gulbhahar ${i + 1}`}
              alt="imgage"
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
