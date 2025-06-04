import React from "react";

const TopTrends = () => {

    const slides = [
    "/gulbhahar-11.png",
    "/gulbhahar-12.png",
    "/gulbhahar-13.png",
    "/gulbhahar-14.png",
  ];

  return (
    <>
      {/* Top Trends Section */}
      <div className="bg-gradient-to-r from-red-100 to-rose-100 py-16 mt-16">
        <section className="container mx-auto lg:max-w-[1600px] px-2 xs:px-4">
          <h2 className="text-5xl font-bold mb-12 text-red-900 text-center">
            Top Trends
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-red-200 group"
              >
                <div className="relative w-full h-[510px] xs:h-[470px] overflow-hidden">
                  <img
                    src="/gulbhahar-14.png"
                    alt="Trend item"
                    className="w-full h-full object-cover transition-transform duration-500 scale-150 group-hover:scale-150"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-white text-black p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-lg mb-1">
                      Trending Style {i + 1}
                    </h3>
                    <p className="text-sm">
                      Discover the latest fashion trends
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default TopTrends;
