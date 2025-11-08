import React from 'react';

const ContentJuttis = () => {
  return (
    <div className='max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16'>
        {/* Main Heading */}
        <div className="text-center sm:text-start mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight px-2">
            Juttis by Gulbhahar are a{' '}
            <span className="text-red-900">Timeless Shoe</span>{' '}
            for All Generations
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-900 to-red-700 mx-auto rounded-full"></div>
        </div>

        {/* Introduction */}
        <div className="prose prose-base sm:prose-lg max-w-none mb-8 sm:mb-12">
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg px-2">
            Juttis have been a favourite for all time in traditional Indian footwear. With intricate embroidery, bright colours and cultural appeal, they remain one of the most popular options among fashionable people. Gulbhahar, founded by Monica Gulati, showcases the craftsmanship of creating juttis. Each collection has a blending heritage with contemporary sophistication. Every pair is designed to be extremely comfortable, durable and stylish.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {/* History Section */}
          <section className="bg-red-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  1
                </span>
                <span className="leading-tight">A Glimpse of History</span>
              </div>
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
              Originally, juttis commenced as a luxury product for nobility and royalty, their original intention was to provide prestige. Juttis were made of soft leather and were beautifully embroidered. They were worn to celebrate, and prestige was indicated by the number of embroidered shoes in the closet, in addition to, of course, wealth and status. Over time, juttis became commonplace fashion items worn daily by men and women and became part of the lexicon of fashion. Gulbhahar, while keeping the tradition alive, also collaborates with artisans who have experience with its place in history and uses similar old techniques, making each pair an understanding of craftsmanship and authenticity.
            </p>
          </section>

          {/* Versatility Section */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  2
                </span>
                <span className="leading-tight">Versatility for All Occasions</span>
              </div>
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              What distinguishes juttis from the rest is their versatility. They can be worn with ethnic wear, such as sarees, lehengas, salwar suits or kurta sets, and with contemporary wear, such as jeans, dresses and skirts. Gulbhahar produces juttis that easily transition from festive occasions to every day wear with a blend of tradition and trend.
            </p>
            <div className="bg-gradient-to-r from-red-900 to-red-700 text-white p-4 sm:p-6 rounded-lg sm:rounded-xl">
              <p className="font-semibold text-base sm:text-lg italic leading-relaxed">
                Their versatility ensures that every attire is bolstered with elegance when you wear the right jutti!
              </p>
            </div>
          </section>

          {/* Design Meets Comfort Section */}
          <section className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  3
                </span>
                <span className="leading-tight">Where Design Meets Comfort</span>
              </div>
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
              Style and comfort usually go hand in hand, but juttis tie the two together perfectly. Gulbhahar is particularly concerned with creating the perfect pairs that not just look good but are comfortable enough for all-day wear. Soft cushioning, light materials and meticulous stitchwork prevent any constriction or stiffness while still maintaining style. This makes them perfect for hectic days, festive occasions or extended evenings while keeping the wearer comfortable.
            </p>
          </section>

          {/* Design Possibilities Section */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  4
                </span>
                <span className="leading-tight">Endless Design Possibilities</span>
              </div>
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              Juttis have long been known as tiny canvases of art. The spectrum of designs, whether luxuriantly embroidered or simply elegant, allows for affinities with various tastes. Gulbhahar offers ranges that represent traditional patterns derived from India's past, as well as modern designs for contemporary aesthetic preferences.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {['Beadwork', 'Mirror work', 'Zari embroidery', 'Threadwork'].map((technique, index) => (
                <div key={index} className="bg-red-100 text-red-900 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-center font-semibold text-sm sm:text-base">
                  {technique}
                </div>
              ))}
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
              These techniques enable each pair to be distinct as an original work. For those who prefer a subtler look, there are also plain designs in rich shades that exude understated charm.
            </p>
          </section>

          {/* Tradition in Modern World Section */}
          <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  5
                </span>
                <span className="leading-tight">Tradition in a Modern World</span>
              </div>
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
              Fashion today is about respecting heritage and celebrating individuality. Juttis flawlessly embody this union by infusing cultural heritage into contemporary style. Gulbhahar recognises the need to preserve tradition while crafting shoes that address the demands of the contemporary world. Each pair merges both past and present by designing footwear that resonates with any generation. When you style Gulbhahar juttis, it is not only about style but preserving Indian creativity.
            </p>
          </section>

          {/* Why Choose Gulbhahar Section */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  6
                </span>
                <span className="leading-tight">Why Choose Gulbhahar</span>
              </div>
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              At Gulbhahar, there is a promise to produce juttis that reflect authenticity, quality and creativity. The brand works very closely with artisans who inherit generations of craftsmanship, ensuring that each design is upheld at the highest standard of craftsmanship.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white border border-red-200 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
                <h3 className="font-bold text-red-900 text-base sm:text-lg mb-2 sm:mb-3">Quality Materials</h3>
                <p className="text-gray-600 text-sm sm:text-base">High-quality materials and attention to detail ensure durability and comfort.</p>
              </div>
              <div className="bg-white border border-red-200 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
                <h3 className="font-bold text-red-900 text-base sm:text-lg mb-2 sm:mb-3">Sustainable Practices</h3>
                <p className="text-gray-600 text-sm sm:text-base">Supporting sustainable livelihoods and artisanal practices.</p>
              </div>
              <div className="bg-white border border-red-200 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm sm:col-span-2 lg:col-span-1">
                <h3 className="font-bold text-red-900 text-base sm:text-lg mb-2 sm:mb-3">Meaningful Purchase</h3>
                <p className="text-gray-600 text-sm sm:text-base">Every purchase makes a difference in preserving traditional craftsmanship.</p>
              </div>
            </div>
          </section>

          {/* Completing Every Look Section */}
          <section className="bg-gray-900 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  7
                </span>
                <span className="leading-tight">Completing Every Look</span>
              </div>
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              A few juttis can take an outfit and turn it into something elegant and beautiful. Juttis are the finishing touch that turns ordinary outfits into extraordinary ones. Gulbhahar's designs are all about enhancing personal style, allowing you to walk with a little of your heritage freshly.
            </p>
          </section>
        </div>

        {/* Conclusion */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16 bg-gradient-to-r from-red-900 to-red-700 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
            More Than Just Shoes
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            Gulbhahar's juttis are more than shoes. They are a fusion of culture, creativity and timelessness that continues to shape fashion generation after generation. By possessing them, one is part of a tale that bridges heritage with modern living, making them an essential for every wardrobe.
          </p>
        </div>
    </div>
  );
};

export default ContentJuttis;