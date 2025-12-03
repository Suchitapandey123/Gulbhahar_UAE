import React from 'react';

const ContentBridalJuttis = () => {
  return (
    <div className='max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16'>
        {/* Main Heading */}
        <div className="text-center sm:text-start  mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight px-2">
            <span className="text-red-900">Bridal Juttis by Gulbhahar</span> - Where Tradition Meets{' '}
            <span className="text-red-900">Timeless Elegance</span>
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-900 to-red-800 mx-auto rounded-full"></div>
        </div>
         
         
        {/* Introduction */}
        <div className="prose prose-base sm:prose-lg max-w-none mb-8 sm:mb-12">
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg px-2 text-center italic">
            When it comes to weddings, every detail counts - from the bridal attire to the jewellery and, yes, the bridal juttis. At Gulbhahar, we believe that every bridal look is incomplete without the perfect handcrafted juttis, which are a complete mix of tradition and comfort. Founded by <strong className="text-red-900">Monica Gulati</strong>, Gulbhahar has become a home for the artisanal spirit and modernity of bridal luxury.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          
          {/* The Charm of Bridal Juttis Section */}
          <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-800 to-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  💍
                </span>
                <span className="leading-tight">The Charm of Bridal Juttis</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              Bridal juttis have always held a special place in Indian weddings, from the intricately designed traditional juttis that anchor the bridal look to the cultural significance those juttis bring. Unlike heels or modern wear, juttis allow the bride to walk, dance and celebrate in comfort while feeling elegant, all at the same time.
            </p>
            
            <div className="bg-white border-2 border-red-300 rounded-lg p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">👰</div>
                  <h4 className="font-bold text-red-900 text-sm sm:text-base mb-2">Walk</h4>
                  <p className="text-red-800 text-xs sm:text-sm">Comfortable movement</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💃</div>
                  <h4 className="font-bold text-red-900 text-sm sm:text-base mb-2">Dance</h4>
                  <p className="text-red-800 text-xs sm:text-sm">Graceful celebrations</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">✨</div>
                  <h4 className="font-bold text-red-900 text-sm sm:text-base mb-2">Celebrate</h4>
                  <p className="text-red-800 text-xs sm:text-sm">Elegant comfort</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mt-4">
              At Gulbhahar, we are proud of our innovative designs and reinterpreting the history of this craft by taking a traditional handwork approach to design contemporary footwear for brides today.
            </p>
          </section>

          {/* Why Brides Love Gulbhahar Section */}
          <section>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-700 to-red-800 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  💖
                </span>
                <span className="leading-tight">Why Brides Love Gulbhahar Juttis</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-6">
              Every single pair of Gulbhahar bridal juttis is a story sewn with thread, beads, and love. Brides love us because our juttis are:
            </p>
            
            {/* Love Reasons Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
              <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🤲</span>
                  <h3 className="font-bold text-red-900 text-base sm:text-lg">Made by Hand with Love</h3>
                </div>
                <p className="text-red-800 text-sm sm:text-base">
                  Each pair is carefully crafted by passionate artisans using centuries-old techniques.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">☁️</span>
                  <h3 className="font-bold text-red-900 text-base sm:text-lg">Made for Comfort</h3>
                </div>
                <p className="text-red-800 text-sm sm:text-base">
                  Weddings are long events, so we ensure you're comfortable for every minute while looking fabulous!
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">💎</span>
                  <h3 className="font-bold text-red-900 text-base sm:text-lg">Unique & Exclusive</h3>
                </div>
                <p className="text-red-800 text-sm sm:text-base">
                  Gulbhahar pieces are not manufactured in bulk; they are treasures that represent unique personality and charm.
                </p>
              </div>
            </div>
          </section>

          {/* Bridal Favourites Section */}
          <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <div className="div">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  👑
                </span>
                <span className="leading-tight">Our Bridal Favourites: Maharani & Lal Ishq</span>
              </div>
            </div>
            
            {/* Bridal Favourites Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6">
              {/* Maharani Design */}
              <div className="bg-white border-2 border-red-400 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-300 opacity-20 rounded-full transform translate-x-10 -translate-y-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-800 rounded-full flex items-center justify-center text-white text-lg font-bold">
                      M
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Maharani</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                    As the name suggests, wearing these will give you a royal look! Intricate zari work with detailed hand-beaded embellishments – for the bride who wants to feel like a queen on her special day! Each step in these juttis will make you feel grand.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">Royal Look</span>
                    <span className="bg-red-200 text-red-900 px-3 py-1 rounded-full text-xs font-medium">Zari Work</span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">Hand-beaded</span>
                  </div>
                  <p className="text-red-700 font-semibold text-sm sm:text-base">
                    Perfect with traditional lehengas and sarees!
                  </p>
                </div>
              </div>

              {/* Lal Ishq Design */}
              <div className="bg-white border-2 border-red-400 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-300 opacity-20 rounded-full transform translate-x-10 -translate-y-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white text-lg font-bold">
                      L
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Lal Ishq</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                    Fun, passionate, and unforgettable, Lal Ishq is for brides who want to be a little bolder with their bridal juttis! Drenched in deep red colour with delicate embellishments, this pair represents the feeling of love itself!
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">Bold & Fun</span>
                    <span className="bg-red-200 text-red-900 px-3 py-1 rounded-full text-xs font-medium">Deep Red</span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">Love Symbol</span>
                  </div>
                  <p className="text-red-700 font-semibold text-sm sm:text-base">
                    Works with bridal reds or modern pastels!
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-800 to-red-900 text-white p-4 sm:p-6 rounded-lg sm:rounded-xl">
              <p className="font-semibold text-base sm:text-lg leading-relaxed text-center">
                Choose Maharani for royal elegance or Lal Ishq for passionate boldness - both designed to make your special day unforgettable.
              </p>
            </div>
          </section>

          {/* The Gulbhahar Touch Section */}
          <section>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  🏛️
                </span>
                <span className="leading-tight">The Gulbhahar Touch</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              At Gulbhahar, we consider bridal juttis a family heirloom rather than simply a piece of footwear. Each pair is handmade with strict detail to ensure it homes in on the magnificence of the bridal trousseau while also being wearable long after the wedding.
            </p>
            
            {/* Heirloom Features */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-300 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6">
              <h3 className="font-bold text-red-800 text-base sm:text-lg mb-4">More Than Footwear - A Legacy:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💒</span>
                  <span className="text-sm sm:text-base text-gray-700">Wedding events</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎉</span>
                  <span className="text-sm sm:text-base text-gray-700">Festive gatherings</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📖</span>
                  <span className="text-sm sm:text-base text-gray-700">Keepsake memories</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👑</span>
                  <span className="text-sm sm:text-base text-gray-700">Timeless elegance</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
              Any Gulbhahar jutti will carry you from wedding events to festive gatherings and remain a keepsake that keeps telling you a story.
            </p>
          </section>

          {/* A Bride's Best Friend Section */}
          <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-700 to-red-800 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  👭
                </span>
                <span className="leading-tight">A Bride's Best Friend</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              Brides always say the best part of wearing Gulbhahar juttis is the comfort. Weddings include hours of standing, dancing, and walking. Heels may elevate a wedding look, but they often don't make it past the ceremony.
            </p>
            
            <div className="bg-white border-2 border-red-300 rounded-lg sm:rounded-xl p-4 sm:p-6">
              <h3 className="font-bold text-red-800 text-base sm:text-lg mb-4 text-center">Why Choose Comfort Over Heels?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-3">
                  <div className="text-2xl mb-2">⏰</div>
                  <span className="text-sm font-medium text-red-900">Hours of Events</span>
                </div>
                <div className="text-center p-3">
                  <div className="text-2xl mb-2">🚶‍♀️</div>
                  <span className="text-sm font-medium text-red-900">Free Movement</span>
                </div>
                <div className="text-center p-3">
                  <div className="text-2xl mb-2">💃</div>
                  <span className="text-sm font-medium text-red-900">Dance Freely</span>
                </div>
                <div className="text-center p-3">
                  <div className="text-2xl mb-2">✨</div>
                  <span className="text-sm font-medium text-red-900">Look Fabulous</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mt-4">
              Gulbhahar juttis allow brides to move freely and comfortably while looking quite fabulous in the process.
            </p>
          </section>

          {/* Monica Gulati Legacy Section */}
          <section>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-10 h-10 bg-gradient-to-r from-red-800 to-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  🌟
                </span>
                <span className="leading-tight">A Legacy of Craftsmanship by Monica Gulati</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              The force behind Gulbhahar is Monica Gulati, who set out to reintroduce the traditional art of jutti-making with a modern identity. With a love for handcrafted fashion and a deep appreciation for artisanal work, Gulbhahar has quickly become a go-to for brides across India and around the world.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-300 rounded-lg sm:rounded-xl p-4 text-center">
                <div className="text-3xl mb-3">💝</div>
                <h3 className="font-bold text-red-900 text-sm sm:text-base mb-2">Beauty</h3>
                <p className="text-red-800 text-xs sm:text-sm">Aesthetic excellence</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-300 rounded-lg sm:rounded-xl p-4 text-center">
                <div className="text-3xl mb-3">🏛️</div>
                <h3 className="font-bold text-red-900 text-sm sm:text-base mb-2">Heritage</h3>
                <p className="text-red-800 text-xs sm:text-sm">Cultural preservation</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-300 rounded-lg sm:rounded-xl p-4 text-center">
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="font-bold text-red-900 text-sm sm:text-base mb-2">Artisans</h3>
                <p className="text-red-800 text-xs sm:text-sm">Empowering craftspeople</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-300 rounded-lg sm:rounded-xl p-4 text-center">
                <div className="text-3xl mb-3">💎</div>
                <h3 className="font-bold text-red-900 text-sm sm:text-base mb-2">Uniqueness</h3>
                <p className="text-red-800 text-xs sm:text-sm">One-of-a-kind pieces</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-4 sm:p-6 rounded-lg sm:rounded-xl mt-6">
              <p className="font-semibold text-base sm:text-lg leading-relaxed">
                Monica's designs speak not only to beauty but also to heritage, empowering artisans and giving brides something one of a kind.
              </p>
            </div>
          </section>
        </div>

        {/* Conclusion */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12">
          <span className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
            Take A Step into Your Forever with Gulbhahar
          </span>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-4">
            Your wedding day is a magical moment you'll always remember, and every detail deserves to be perfect to make it even more special. When you wear Gulbhahar bridal juttis such as Maharani and Lal Ishq, you're not just selecting to wear juttis, you're selecting comfort and grace and tradition that will walk with you into your next phase of life.
          </p>
          <p className="text-base sm:text-lg font-semibold">
            So when you think of bridal juttis, think of Gulbhahar - where every bride can shine, one step at a time. ✨
          </p>
        </div>
      </div>
  );
};

export default ContentBridalJuttis;