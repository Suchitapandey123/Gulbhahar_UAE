"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Old_Standard_TT } from "next/font/google";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const oldStandardTT = Old_Standard_TT({
  weight: "400",
  variable: "--font-old-standard-tt",
  subsets: ["latin"],
});

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}



export default function Popular() {
  const[isVisible,setIsVisible]=useState(false)

  const contentToggler=()=>{
    setIsVisible(!isVisible);
  }
  return (
    <footer className="max-w-8xl mx-auto lg:px-4 py-2 md:py-12">

      <motion.div
        className="mb-8 md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={`${oldStandardTT.variable} text-[22px] md:text-xl lg:text-[28px] lg:mb-2 lg:ml-12 font-semibold `}>
        Meticulously Handmade Footwear - Gulbhahar
        </h2>
        <div className={`text-gray-700 ${oldStandardTT.variable} leading-relaxed lg:text-[23px] md:text-base lg:ml-12 text-[19px] whitespace-wrap 
        `}>
        Welcome to Gulbhahar, where handcrafted excellence meets India's finest footwear. Discover a range of spellbinding women's ethnic juttis. Each pair is meticulously made with luxury materials and expert craftsmanship. Indulge in innovative craftsmanship, where designs feature intricate embroidery, luxurious fabrics, and timeless motifs celebrating India's rich heritage. The artisans make the most refined footwear. They aim to celebrate generational tradition while embracing modern style. 
At Gulbhahar, we take pride in creating more than just juttis. Our collection promises to elevate your wardrobe and evoke a sense of pride in India's heritage. Each pair of enchanting juttis are intricately embroidered. They have an aura of ethnic elegance.
 &nbsp; &nbsp;
   {isVisible && (
    <div>
       <div> Explore our range of juttis, each reflecting the same level of classic artisanal craftsmanship and impeccable designs. At Gulbhahar, we weave a tale of tradition and passion. 
Step into a world where every pair of footwear is a tribute to craftsmanship and culture. Experience the artistry of India's finest handcrafted footwear. This is where heritage meets elegance, one step at a time.
</div>

       <h4 className="text-black mt-2 mb-3 font-semibold ">What sets Gulbhahar apart is its unwavering commitment to quality and craftsmanship.</h4>
<div>Each piece is specially created to meet the brand's established policy of high-quality goods. Starting with the selection of materials and ending up with minute embroidery and final details, every step is scrutinised to make accessories as equally beautiful as they are long-lasting.
However, Gulbhahar is not only a trademark. It is a celebration of rich Indian culture and art legacy. Our footwear and bags reflect Indian tradition while blending it with modern designs. All our collections embody the incredible beauty and sophisticated style that India has always represented. Gulbhahar juttis make a perfect match for those who appreciate the quality handcrafted things in life.
Starting with their collection that echoes the amazing range of Indian culture and handwork, called Gulbhahar. Our wide selection of shoes and bags are now available for you. Each piece is passionately crafted to capture the essence of femininity and beauty.
</div>

 <h4 className="text-black mt-3 mb-3 font-semibold">Discover the Collection</h4>
<div>Our products have intricate embroidery. The minimalist charm in our collection is exceptional. Explore juttis that define elegance and sophistication.
</div>
 
 <h4 className="text-black mt-3 mb-3 font-semibold">Shop Now | New Arrivals</h4>

 <h4 className="text-black mt-3 mb-3 font-semibold">Women's Juttis</h4>
 <h4 className="text-black font-semibold mb-3">Discover handcrafted ethnic elegance</h4>
<div>Indulge in the exquisite artistry of handcrafted designer juttis at Gulbhahar. Our collection is a blend of traditional and modern designs. Premium materials are used to carefully manufacture each piece. Each jutti has intricate embroidery and timeless motifs. Adorn our juttis that celebrate India's rich cultural heritage. Elevate your ethnic ensemble with Gulbhahar’s juttis.</div>


<h4 className="text-black font-semibold mt-3 mb-3">Punjabi juttis</h4>
<h4 className="text-black font-semibold mt-3 mb-3">Celebrate Tradition with a Modern Twist</h4>

<div>Gulbhahar Juttis will take you into Punjab's rich cultural past. Gulbhahar Punjabi juttis are the pinnacle of classic style and craftsmanship, with a classic foundation and a modern twist. Gulbhahar juttis spruce up any ensemble, whether you're wearing them to a wedding, cultural event, or just to appreciate the beauty of traditional footwear.These juttis are the ideal way to respect tradition,Gulbhahar juttis are a celebration of culture, tradition, and artistry that goes beyond simply being a pair of shoes. Wearing a piece of your ancestry that skillfully combines the past and modern gives you the confidence to face the day.</div>

<h4 className="text-black mt-3 mb-3 font-semibold">GULBHAHAR’S JUTTI COLLECTION</h4>
<h4 className="text-black mt-3 mb-3 font-semibold">Festive Juttis</h4>
<h5 className="text-black mt-3 mb-3 font-semibold">The Ideal Festive Partner for You</h5>
<div>Gulbhahar Juttis are the ideal fusion of comfort, style, and tradition; wear them with grace and elegance this festive season..The exquisite needlework, and opulent motifs that distinguish each pair of Gulbhahar Juttis are all handcrafted masterpieces. It's time to let your feet speak for you at this joyous moment.,.This festive season, let your feet steal the show and pair them with Gulbhahar Juttis to go with your ensemble. Enter happiness, celebration, and style.</div> 
<h4 className="text-black mt-3 mb-3 font-semibold">Wedding Juttis</h4>
<h4 className="text-black mt-3 mb-3 font-semibold">Walk into Your Wedding Day in Pure Elegance</h4>
<div>Your wedding day is worthy of the classic style of Gulbhahar Juttis, not simply a pair of shoes. Gulbhahar Juttis' exquisite craftsmanship and plush comfort will make your feet shine as you take each stride toward yours forever. These elegant, comfortable, and stylish wedding juttis are ideal for the bride who appreciates both beauty and tradition.These juttis are an experience rather than merely shoes.
</div>
<h4 className="text-black mt-3 mb-3 font-semibold">Casual Juttis</h4>
<h4 className="text-black mt-3 mb-3 font-semibold">Effortless Style for Your Daily Outfit</h4>
<div>It’s possible to be comfortable and fashionable together with Gulbhahar juttis. Our casual juttis combine classic craftsmanship with contemporary flair, making them ideal for women who are practical and appreciate effortless elegance. Ideal for your daily excursions, Gulbhahar juttis are the shoes that add flair to your laid-back days without sacrificing comfort.The Gulbhahar Juttis are made to blend in perfectly with your daily outfit.
</div>
<h4 className="text-black mt-3 mb-3 font-semibold">Seasonal Juttis</h4>
<h4 className="text-black mt-3 mb-3 font-semibold">Step Into Every Season with Timeless Elegance </h4>
<div>Every season is an ideal time to update your outfit, and there's no better way to accomplish so than with a pair of Gulbhahar Juttis. Gulbhahar seasonal juttis are made to accentuate the beauty of each season. They combine superb craftsmanship, vivid colors, and classic style to provide you with unparalleled comfort and style all year long. Every Season, Every Style, Always Comfortable.
</div>
<h4 className="text-black mt-3 mb-3 font-semibold">Gulbhahar’s Bag Collection</h4>
<div>Savor the Beauty of Indian Traditional Bags: A Fusion of Craft, Style, and Culture, without the ideal bag to go with it, no Indian fashion ensemble is really complete. Indian traditional bags are declarations of cultural heritage, weaving artistry, and classic beauty that go beyond simple accessories.
</div>

<h4 className="text-black mt-3 mb-3 font-semibold">Why Choose Us?</h4>

<div>The Ultimate Combination of Comfort, Style, and Artistry

In addition to making exquisite juttis, we at Gulbhahar also believe in crafting experiences. Our juttis are made to combine the highest workmanship traditions, the most opulent materials, and a dash of modern flair from the very beginning, making each pair exclusively yours. Enter Gulbhahar, where each step reveals a tale. Our inclination towards the art and the artisans is what sets us apart.  Gulbhahar’s passion is influencing the importance given to hand embroidery and reviving the industry.</div>

    </div>
   )}
   <button
onClick={contentToggler}
 className="font-raleway text-customRed hover:underline text-[17px]">{isVisible?'see less...':'see more...'}</button>
</div>
      </motion.div>
      <motion.div className="mb-8" initial="hidden" whileInView="show" viewport={{ once: true }} variants={container}>
        <h3 className={`${oldStandardTT.variable} lg:text-[28px] text-[22px] md:text-lg  uppercase lg:mb-4 md:mb-6 italic underline cursor-pointer lg:ml-12`}>POPULAR SEARCHES</h3>
        <div className={` ${oldStandardTT.variable} flex flex-wrap lg:gap-y-2 md:gap-y-3 opacity-45 cursor-pointer lg:ml-12 text-[28px]`}>
          {[
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
          ].map((item, index) => (
            <motion.div key={index} variants={item}>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 italic text-sm md:text-base border-r border-gray-300 last:border-0 px-2 md:px-4 first:pl-0 transition-colors duration-200"
              >
                {item} |
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={container}>
        <h3 className={`text-base ${oldStandardTT.variable} lg:ml-12 md:text-lg font-serif uppercase lg:mb-4 md:mb-6 italic underline cursor-pointer lg:text-[28px] text-[22px]`}>QUICK LINKS</h3>
        <div className={`${oldStandardTT.variable} flex flex-wrap lg:gap-y-4 md:gap-y-3 opacity-45 cursor-pointer text-[28px] lg:ml-12`}>
          {[
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
          ].map((item, index) => (
            <motion.div key={index} variants={item}>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 italic text-sm md:text-base border-r border-gray-500 last:border-0 px-2 md:px-4 first:pl-0 transition-colors duration-200"
              >
                {item} | 
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </footer>
  )
}

