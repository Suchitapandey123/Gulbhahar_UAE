import React from 'react';

const ContentJuttisForWomen = () => {
  return (
    <div className='max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16'>
        {/* Main Heading */}
        <div className="text-center lg:text-start mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight px-2">
            <span className="text-red-900">Explore The Eternally Timeless</span>{' '}
            Women's Juttis With Gulbhahar
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-900 to-red-800 mx-auto rounded-full"></div>
        </div>

        {/* Introduction */}
        <div className="prose prose-base sm:prose-lg max-w-none mb-8 sm:mb-12">
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg px-2 text-center italic">
            There are few designs as iconic of feminine beauty as the jutti, within the colourful brocade of Indian footwear. This ancient slip-on shoe has defied the ages, changing its epicentre from imperial courts to modern-day wardrobes. Gulbhahar stays true to its unique charm and cultural heritage. Monica Gulati, the founder and owner of Gulbhahar, celebrates the poise of tradition with juttis that honour. Juttis for women carry heritage and modern style, with each step being a declaration of grace and cultural heritage.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          
          {/* Heritage Section */}
          <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <div className="div">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-800 to-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  👑
                </span>
                <span className="leading-tight">A Heritage Crafted for Queens</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4">
              The history of jutti dates back to the Mughal era when its expert craftsmen made these flat-soled beauties for only royalty. Jutti were not originally designated as left or right and were made to take the shape of the owner's foot over time for a custom fit.
            </p>
            <div className="bg-white border-2 border-red-300 rounded-lg p-4 sm:p-6">
              <p className="text-red-800 font-semibold text-base sm:text-lg mb-2">💜 Fun Fact:</p>
              <p className="text-red-700 text-sm sm:text-base">
                Even today, this custom-fit feature is one of their fan favourites! The versatility and comfort make them perfect for hours of wear.
              </p>
            </div>
          </section>

          {/* Versatility Section */}
          <section>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-700 to-red-800 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  ✨
                </span>
                <span className="leading-tight">Versatility Meets Elegance</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              What differentiates juttis for women from Gulbhahar is their amazing versatility. The non-heeled insole makes it very easy and comfy to walk around in for hours. The beautiful and sophisticated shapes work well with flowing ethnic to contemporary fusion, to whatever your fab style is!
            </p>
            
            {/* Occasion Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {[
                { icon: '💒', label: 'Weddings' },
                { icon: '🎉', label: 'Festivals' },
                { icon: '💼', label: 'Workdays' },
                { icon: '🛒', label: 'Shopping' }
              ].map((occasion, index) => (
                <div key={index} className="bg-gradient-to-br from-red-100 to-red-200 text-red-900 px-3 sm:px-4 py-3 sm:py-4 rounded-lg text-center">
                  <div className="text-2xl mb-1">{occasion.icon}</div>
                  <div className="font-semibold text-xs sm:text-sm">{occasion.label}</div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-red-800 to-red-900 text-white p-4 sm:p-6 rounded-lg sm:rounded-xl">
              <p className="font-semibold text-base sm:text-lg italic leading-relaxed">
                From weddings to festivals, busy workdays to market adventures, they are the perfect balance of comfort and chic fashion.
              </p>
            </div>
          </section>

          {/* Art of Making Section */}
          <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  🎨
                </span>
                <span className="leading-tight">The Art of Making Jutti</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              The handwork of traditional juttis is a labour of love, with years of hard work and expertise. Craftspeople start with genuine leather and cut and trim each one by hand, then embellish the tops with beautiful embroidery, sequins, mirrors, or thread work, creating patterns that tell stories of regional culture and of artistic heritage.
            </p>
            
            {/* Craft Process */}
            <div className="bg-white rounded-lg sm:rounded-xl border-2 border-red-300 p-4 sm:p-6 mb-4 sm:mb-6">
              <h3 className="font-bold text-red-800 text-base sm:text-lg mb-3 sm:mb-4">Handcrafted Excellence:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🪡</span>
                  <span className="text-sm sm:text-base text-gray-700">Hand-placed stitches</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✋</span>
                  <span className="text-sm sm:text-base text-gray-700">Manual ornamentation</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎭</span>
                  <span className="text-sm sm:text-base text-gray-700">Unique artisan expression</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <span className="text-sm sm:text-base text-gray-700">Cultural heritage</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
              The construction of each Gulbhahar jutti is performed by hand, without any machines. Taking this kind of care of their craft means that no two artisan pairs are alike and that they carry the craftsperson's unique expression and culture.
            </p>
          </section>

          {/* Modern Appeal Section */}
          <section>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  🌟
                </span>
                <span className="leading-tight">Modern Uses, Timeless Appeal</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              The modern juttis for women have adopted modern design elements while still reflecting the artistry of the tradition. Contemporary juttis are made using new materials and colour combinations and combine traditional or western ornamentation to appeal to the fashionable woman of all ages.
            </p>
            
            {/* Style Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-300 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <p className="font-bold text-red-900 text-base sm:text-lg mb-2 sm:mb-3">💼 Professional Elegance</p>
                <p className="text-red-800 text-sm sm:text-base">Simple and subtle designs perfect for work environments and daily wear.</p>
              </div>
              <div className="bg-gradient-to-br from-red-100 to-red-200 border border-red-400 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <p className="font-bold text-red-900 text-base sm:text-lg mb-2 sm:mb-3">✨ Special Occasions</p>
                <p className="text-red-800 text-sm sm:text-base">Heavily embroidered designs with metallic accents and geometric patterns.</p>
              </div>
            </div>
          </section>

          {/* Styling Section */}
          <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-700 to-red-800 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  👗
                </span>
                <span className="leading-tight">Styling Your Juttis</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              The beauty of juttis for women is their versatility. Subtle jutti designs will complement less ornate informal Indian wear. The key to styling juttis for women is understanding their versatility. The fact that they're flat provides a clean, crisp line that can hold its own.
            </p>
            
            <div className="bg-white border-2 border-red-300 rounded-lg sm:rounded-xl p-4 sm:p-6">
              <h3 className="font-bold text-red-800 text-base sm:text-lg mb-3">Styling Tips:</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Pair with both fitted and flowing silhouettes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Create clean, crisp lines with flat sole design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Essential component for any modern wardrobe</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Supporting Artisans Section */}
          <section>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-700 to-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  🤝
                </span>
                <span className="leading-tight">Supporting Artisan Communities</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              There is no question that by purchasing authentic, handcrafted juttis, you're supporting artisan communities. They have been keeping these ancient traditions alive and well for generations. Every purchase from Gulbhahar helps support local artisans.
            </p>
            
            <div className="bg-gradient-to-r from-red-800 to-red-900 text-white p-4 sm:p-6 rounded-lg sm:rounded-xl">
              <h3 className="font-bold text-lg sm:text-xl mb-3">Our Commitment:</h3>
              <p className="text-sm sm:text-base leading-relaxed">
                Gulbhahar works to maintain these beautiful traditions in a modern environment, ensuring that ancient craftsmanship continues to thrive.
              </p>
            </div>
          </section>

          {/* Cultural Heritage Section */}
          <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  🏛️
                </span>
                <span className="leading-tight">Symbol of Cultural Heritage</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              Juttis for women symbolise cultural heritage, craftsmanship, and classic style. In a world full of fast fashion and rapid change, juttis have been, and will always be, a classic accessory.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border border-red-300">
                <div className="text-2xl mb-2">🎨</div>
                <h4 className="font-bold text-red-900 text-sm sm:text-base">Beauty</h4>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-red-300">
                <div className="text-2xl mb-2">☁️</div>
                <h4 className="font-bold text-red-900 text-sm sm:text-base">Comfort</h4>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-red-300">
                <div className="text-2xl mb-2">✨</div>
                <h4 className="font-bold text-red-900 text-sm sm:text-base">Authenticity</h4>
              </div>
            </div>
          </section>
        </div>

        {/* Conclusion */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12">
          <span className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
            Gulbhahar is Where Tradition Entwines with Modern Fashion
          </span>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            Gulbhahar is for anyone who appreciates beauty, comfort, and authentic craftsmanship. Step into a world where every stride tells a story of heritage, and every design celebrates the timeless elegance of Indian artistry.
          </p>
        </div>

    </div>
  );
};

export default ContentJuttisForWomen;