import React from 'react';

const ContentPunjabiJuttis = () => {
  return (
    <div className='max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16'>
        {/* Main Heading */}
        <div className="text-center sm:text-start mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight px-2">
            <span className="text-red-900">Gulbhahar</span> - Preserving the heritage of{' '}
            <span className="text-red-900">Punjabi Juttis</span>
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-900 to-red-800 mx-auto rounded-full"></div>
        </div>

        {/* Introduction */}
        <div className="prose prose-base sm:prose-lg max-w-none mb-8 sm:mb-12">
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg px-2 text-center italic">
            When thinking of footwear from India that blends tradition, artistry, and comfort, the first thought is often Punjabi juttis. These handcrafted juttis are more than footwear, they are a testament to the heritage, culture, and craftsmanship practised for generations. At Gulbhahar, founded by <strong className="text-red-900">Monica Gulati</strong>, we bring this unique heritage back to everyday fashion in a modern approach.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          
          {/* Cultural Experience Section */}
          <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-800 to-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  🏰
                </span>
                <span className="leading-tight">The Cultural Experience of Punjabi Juttis</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              Punjabi Juttis are ingrained in North Indian culture, from the royalty to the common village man. The Punjabi Jutti is a timeless charm that holds true even today. From the embroidery to the beadwork, every pair has the artistry of a skilled artisan behind it and showcases their talents as portable artwork.
            </p>
            
            <div className="bg-white border-2 border-red-300 rounded-lg p-4 sm:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">💒</div>
                  <span className="text-xs sm:text-sm font-medium text-red-900">Weddings</span>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🎉</div>
                  <span className="text-xs sm:text-sm font-medium text-red-900">Festivals</span>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">☕</div>
                  <span className="text-xs sm:text-sm font-medium text-red-900">Casual Days</span>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">✨</div>
                  <span className="text-xs sm:text-sm font-medium text-red-900">Everything</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mt-4">
              At Gulbhahar our documented juttis hold this cultural significance in mind while becoming more adaptable to the present generations. When you're wearing a beautiful pair of juttis, your outfit can "go" in so many different directions!
            </p>
          </section>

          {/* Signature Styles Section */}
          <section>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-700 to-red-800 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  👑
                </span>
                <span className="leading-tight">Gulbhahar's Signature Styles - Firoza & Anarkali</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-6">
              Two of our most popular designs at Gulbhahar are Firoza and Anarkali.
            </p>
            
            {/* Signature Designs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6">
              {/* Firoza Design */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-200 opacity-20 rounded-full transform translate-x-10 -translate-y-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                      F
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Firoza</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                    Inspired by tones of turquoise and light floral embroidery, embodies sophistication with distinction. This design is compatible with those who enjoy understated glamour with bursts of colour.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-medium">Turquoise Tones</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">Floral Embroidery</span>
                    <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-medium">Sophisticated</span>
                  </div>
                </div>
              </div>

              {/* Anarkali Design */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-200 opacity-20 rounded-full transform translate-x-10 -translate-y-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                      A
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Anarkali</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                    A perennial classic and the pride of Gulbhahar's collection. This design pays tribute to Mughal magnificence, as demonstrated in the fine golden embroideries and auspicious patterns. The ultimate showstopper for weddings and festive events.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">Golden Embroidery</span>
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">Mughal Heritage</span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">Showstopper</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-800 to-red-900 text-white p-4 sm:p-6 rounded-lg sm:rounded-xl">
              <p className="font-semibold text-base sm:text-lg leading-relaxed">
                Both Firoza and Anarkali demonstrate the commitment to handcrafting details, comfort, and cultural aesthetics that embodies Gulbhahar.
              </p>
            </div>
          </section>

          {/* Comfort Meets Heritage Section */}
          <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  ☁️
                </span>
                <span className="leading-tight">Comfort Meets Heritage</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              To say there is a misperception that traditional juttis are reserved for specific occasions or that they may not be comfortable is an understatement. We have made every effort to reject this perception at Gulbhahar.
            </p>
            
            {/* Comfort Features */}
            <div className="bg-white rounded-lg sm:rounded-xl border-2 border-red-300 p-4 sm:p-6 mb-4 sm:mb-6">
              <h3 className="font-bold text-red-800 text-base sm:text-lg mb-3 sm:mb-4">Comfort Features:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🛏️</span>
                  <span className="text-sm sm:text-base text-gray-700">Cushioned soles</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🥾</span>
                  <span className="text-sm sm:text-base text-gray-700">Supple leathers</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌬️</span>
                  <span className="text-sm sm:text-base text-gray-700">Breathable fabrics</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
              Monica Gulati and her team have curated beautiful, handmade pieces to provide comfort and style. Our juttis are made for people to wear, whether you are walking through wedding celebrations, or pairing your new juttis with some jeans for a relaxed coffee date.
            </p>
          </section>

          {/* What Makes Gulbhahar Unique Section */}
          <section>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  ⭐
                </span>
                <span className="leading-tight">What Makes Gulbhahar Unique</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              Yes, many brands will sell juttis but Gulbhahar is primarily about artistry and authenticity rather than fashion. Each pair is made with heritage in mind, but also meeting the contemporary demands of the fashion landscape.
            </p>
            
            {/* Unique Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
              <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-300 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-bold text-red-900 text-base sm:text-lg mb-2">Artistry</h3>
                <p className="text-red-800 text-sm sm:text-base">Handcrafted with artistic precision</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-300 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
                <div className="text-3xl mb-3">✨</div>
                <h3 className="font-bold text-red-900 text-base sm:text-lg mb-2">Authenticity</h3>
                <p className="text-red-800 text-sm sm:text-base">True to heritage and tradition</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-300 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center sm:col-span-2 lg:col-span-1">
                <div className="text-3xl mb-3">📖</div>
                <h3 className="font-bold text-red-900 text-base sm:text-lg mb-2">Story</h3>
                <p className="text-red-800 text-sm sm:text-base">Each pair carries history</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-4 sm:p-6 rounded-lg sm:rounded-xl">
              <p className="font-semibold text-base sm:text-lg mb-2">Monica Gulati's Vision:</p>
              <p className="text-sm sm:text-base leading-relaxed">
                Purchasing a pair of Gulbhahar juttis is much like buying a piece of heritage. It marks a point of connection to the past while making you shine now.
              </p>
            </div>
          </section>

          {/* New Fashion Statement Section */}
          <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-700 to-red-800 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  🌍
                </span>
                <span className="leading-tight">The New Fashion Statement</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              Today, Punjabi Juttis virtually have a rightful place outside of the Indian subcontinent. From fashion influencers on Instagram to celebrities on red carpets, handcrafted juttis have become an internationally recognisable fashion statement.
            </p>
            
            {/* Styling Versatility */}
            <div className="bg-white border-2 border-red-300 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
              <h3 className="font-bold text-red-800 text-base sm:text-lg mb-4">Styling Versatility:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">👗</div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Lehengas</span>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🥻</div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Sarees</span>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">👘</div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Kurtas</span>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">👖</div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Denim</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
              Their versatility gives you added freedom to wear them with traditional Indian wear or even to emphasise western clothing, with dresses or denim.
            </p>
          </section>

          {/* Philosophy Section */}
          <section>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-800 to-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  💫
                </span>
                <span className="leading-tight">Our Fashion Philosophy</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              At Gulbhahar, we believe that fashion should be expressive yet timeless. Our collections, like Firoza and Anarkali, stay true to that belief - and make sure you are stylish, yet comfortable, and mostly connected to an age-old tradition.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border border-red-300">
                <div className="text-2xl mb-2">🎭</div>
                <h4 className="font-bold text-red-900 text-sm sm:text-base">Expressive</h4>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-red-300">
                <div className="text-2xl mb-2">⏰</div>
                <h4 className="font-bold text-red-900 text-sm sm:text-base">Timeless</h4>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-red-300">
                <div className="text-2xl mb-2">🔗</div>
                <h4 className="font-bold text-red-900 text-sm sm:text-base">Connected</h4>
              </div>
            </div>
          </section>
        </div>

        {/* Conclusion */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12">
          <span className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
            Step Into Heritage, Walk Into the Future
          </span>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            Experience the perfect blend of tradition and modernity with Gulbhahar's handcrafted Punjabi juttis. From Firoza's sophisticated elegance to Anarkali's regal magnificence, discover footwear that tells your story.
          </p>
        </div>
    </div>
  );
};

export default ContentPunjabiJuttis;