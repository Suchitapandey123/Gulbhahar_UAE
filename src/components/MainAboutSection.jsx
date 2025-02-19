"use client";
import Image from "next/image";
import ArrowVector from "./ui/ArrowVector";
import Link from "next/link";

export default function MainAboutSection() {
  return (
    <div className="relative w-full px-4 md:px-6 py-10 md:py-20 overflow-hidden">
      <div className="relative">
        <div className="text-black font-extralight font-raleway text-4xl md:text-5xl lg:text-7xl z-10 p-4 lg:p-8 md:p-8 space-y-2">
          <h1>Crafting Stories of</h1>
          <h1>Heritage, One</h1>
          <h1>Step at a Time</h1>
        </div>
        
        <div className="flex justify-end lg:-mt-[19%] lg:p-16 mt-8 md:mt-16">
          <div className="w-full lg:-z-10  md:w-[80%] lg:w-[978px] h-[300px] md:h-[475px] lg:h-[675px] bg-navColor"></div>
        </div>
        
        <div className="relative z-10 -mt-20 md:-mt-40 lg:-mt-56 ml-4 md:ml-32">
          <Image
            src="/AboutLogo.svg"
            alt="about-section-image"
            width={592}
            height={159}
            className="w-[200px] md:w-[400px] lg:w-[592px] h-auto"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 md:mt-24 gap-8 md:gap-2 p-4 md:p-8 font-raleway lg:p-16">
        <div className="space-y-6">
          <Link href="#" className="text-lg underline cursor-pointer">
            Follow us
          </Link>

          <div className="space-y-4">
            {['Instagram', 'Facebook'].map((social) => (
              <div key={social} className="flex items-center justify-between max-w-[200px] underline">
                <Link href="#" className="text-lg">
                  {social}
                </Link>
                <Link href="#">
                  <ArrowVector className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="text-base md:text-lg">
          <p>
            <span className="text-4xl font-bold">B</span>orn from the rich
            heritage of Indian footwear craftsmanship, our journey began with a
            vision to preserve and celebrate the timeless art of jutti-making.
            Our master artisans, many of whom represent the third and fourth
            generations of their craft, bring decades of expertise to every
            piece they create.
          </p>
        </div>

        <div className="text-base md:text-lg font-bold">
          <blockquote>
            "We bring centuries of Indian craftsmanship to your feet through our
            exquisitely handcrafted juttis. Each pair tells a story of
            tradition, artistry, and cultural excellence that has been passed
            down through generations."
          </blockquote>
        </div>
      </div>
      <div className="relative mt-20">
        <div className="text-black font-extralight font-raleway text-4xl md:text-5xl lg:text-6xl z-10 p-4 md:p-8 lg:p-48 lg:absolute lg:right-0 lg:-mt-36  ">
          <h1>The art of</h1>
          <h1>Traditional Indian</h1>
          <h1>Juttis</h1>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-8 mt-8">
          <div className="w-full md:w-[80%] lg:w-[831px] h-[300px] md:h-[475px] lg:h-[675px] lg:ml-16 bg-navColor"></div>
          <div className="w-full md:w-[20%] p-4 text-base md:text-lg lg:mt-80 lg:ml-10 lg:w-[478px] lg:h-[244px]">
            <p>Our juttis are more than just footwear – they are wearable pieces of art that showcase India's rich cultural heritage. Each pair is meticulously handcrafted using traditional techniques that have been refined over centuries.</p>
          </div>
        </div>
      </div>
      <div className="relative mt-20">
        <div className="text-black font-extralight font-raleway text-4xl md:text-6xl lg:text-7xl lg:p-12 z-10 p-4 lg:ml-40 md:p-10">
          <h1>Our commitment to</h1>
          <h1>Craftsmanship</h1>
        </div>

        <div className="flex justify-end mt-8 lg:p-16">
          <div className="w-full md:w-[20%] text-base md:text-lg lg:w-[478px] lg:h-[244px] lg:mr-32">
          <p>Our juttis are more than just footwear – they are wearable pieces of art that showcase India's rich cultural heritage. Each pair is meticulously handcrafted using traditional techniques that have been refined over centuries.</p>
          </div>
          <div className="w-full md:w-[80%] lg:w-[747px] h-[300px] md:h-[373px] lg:h-[473px] lg:-mt-[20%] lg:-z-10  bg-navColor"></div>
        </div>
      </div>
      <div className="mt-20">
        <div className="text-center text-black font-raleway font-extralight text-3xl md:text-4xl lg:text-6xl mb-16">
          <h2>Blending Tradition with</h2>
          <h2>Contemporary style</h2>
        </div>

        <div className="space-y-16">
          <div className="flex flex-col md:flex-row items-center gap-8 p-4 lg:p-16 lg:gap-80">
            <div className="w-full md:w-[467px] h-[262px] md:h-[362px] bg-navColor"></div>
            <div className="w-full md:w-[600px] text-base md:text-lg font-bold">
              <blockquote>
                "We bring centuries of Indian craftsmanship to your feet through our
                exquisitely handcrafted juttis. Each pair tells a story of
                tradition, artistry, and cultural excellence that has been passed
                down through generations."
              </blockquote>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 p-4 lg:gap-80">
            <div className="w-full md:w-[600px] text-base md:text-lg font-bold lg:p-10">
              <blockquote>
                "We bring centuries of Indian craftsmanship to your feet through our
                exquisitely handcrafted juttis. Each pair tells a story of
                tradition, artistry, and cultural excellence that has been passed
                down through generations."
              </blockquote>
            </div>
            <div className="w-full md:w-[467px] h-[262px] md:h-[362px] bg-navColor"></div>
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="text-center text-black text-base md:text-lg font-semibold mt-16 mb-8">
        Each step you take in our juttis carries forward a legacy of Indian craftsmanship.
      </div>
    </div>
  );
}