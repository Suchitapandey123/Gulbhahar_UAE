import React from 'react'

const ContentSection = () => {
  return (
    <>
       {/* Content Section */}
       <div className="max-w-[1600px] mx-auto px-2 xs:px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg p-2 sm:p-8 border border-red-200">
          <h2 className="text-3xl font-bold text-red-900 mb-6">
            Women's Casual Shoes You Need To Own
          </h2>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              Casual shoes for women come in an endless number of styles, which
              are constantly updated according to various fashion trends and pop
              culture influences. Any woman who loves shoes knows that they can
              make or break an outfit. If there is a shoe for every foot, then
              there is also a pair of women's casual shoes for every occasion.
            </p>

            <p className="text-lg leading-relaxed">
              This is the best time to buy women casual shoes because brands
              thrive on creating as many imaginative variations as possible.
              There is always a good reason to pick up a pair of women casual
              shoes, whether for an event or just to give your mood a lift.
              Further, shopping for casual shoes for women online now gives you
              the freedom of browsing through several brands at once.
            </p>

            <div className="bg-red-50 p-2 rounded-lg border-l-4 border-red-900">
              <h3 className="text-xl font-bold text-red-900 mb-3">
                Featured Collections
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-red-800">
                    Flat n Heels, Black Solid Synthetic High-Top Flat Boots
                  </h4>
                  <p>
                    Gold hardware on the front of these boots makes them the
                    perfect dressy boot. These women casual shoes will look
                    great with fitted denim or A-line skirts worn with tights.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800">
                    Carlton London, Blue Printed Textured Ballerinas
                  </h4>
                  <p>
                    Every woman should own a ballerina along with other women
                    casual shoes. They are simple, comfortable and always in
                    style.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800">
                    DressBerry, Metallic Brown Sneakers
                  </h4>
                  <p>
                    The trend of velvety-metallic finish sneakers is all the
                    rage right now in women casual shoes. This pair would couple
                    well with dark skinny jeans and an off-shoulder Bardot top.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800">
                    Nike, Pink AIR FORCE 1 '07 Sneakers
                  </h4>
                  <p>
                    Shades of millennial pink are still making waves in fashion.
                    This pair of women casual shoes will complement shades of
                    grey, black or white very well.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-900 to-rose-800 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">
                Shop by Types of Women's Footwear
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                {[
                  "Sandals For Women",
                  "Heels For Women",
                  "Sneakers For Women",
                  "Boots For Women",
                  "Flats For Women",
                  "Flip Flops For Women",
                  "Sports Shoes For Women",
                  "Wedges For Women",
                  "Formal Shoes For Women",
                  "Loafers For Women",
                  "Jutti For Women",
                  "Slippers For Women",
                  "Clogs For Women",
                  "Trekking Shoes For Women",
                  "Slides For Women",
                  "Slip On Shoes For Women",
                ].map((category, index) => (
                  <button
                    key={index}
                    className="text-left hover:text-red-200 transition-colors underline decoration-dotted"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-red-900 to-rose-900 text-white py-16">
        <div className="max-w-[1600px] mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Find Your Perfect Pair?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Explore our complete collection and discover your new favorite shoes
          </p>
          <button className="bg-white text-red-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-colors shadow-lg transform hover:scale-105">
            Shop All Collections
          </button>
        </div>
      </div>
    </>
  )
}

export default ContentSection
