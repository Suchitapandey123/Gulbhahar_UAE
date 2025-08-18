
const MobileNavigationLinks = ({
    collectionCategoriesForMobile,
    openCategoryIndex,
    toggleCategory,
    handleCategoryClick,
    handleViewAllCollections,
    toggleMenu,
    router,
  }) => (
    <div className="space-y-1">
      {/* New section */}
      <div
        onClick={() => {
          handleCategoryClick("All Products");
          toggleMenu();
        }}
        className="font-medium text-gray-700 hover:text-[#800000] 
                 transition-all duration-300 cursor-pointer p-2 xs:p-2.5 rounded-lg
                 hover:bg-[#800000]/5 transform hover:translate-x-1 text-sm xs:text-base"
      >
        New
      </div>
  
      {/* Collection categories */}
      {collectionCategoriesForMobile.map((category, index) => (
        <div key={index} className="space-y-1 xs:space-y-2">
          <div
            onClick={() => toggleCategory(index)}
            className="font-medium text-gray-700 hover:text-[#800000] 
                     transition-all duration-300 cursor-pointer p-2 xs:p-2.5 rounded-lg
                     hover:bg-[#800000]/5 transform hover:translate-x-1 flex justify-between items-center
                     text-sm xs:text-base"
          >
            <span>{category.title}</span>
            <span className="text-lg xs:text-xl">
              {openCategoryIndex === index ? "-" : "+"}
            </span>
          </div>
  
          {openCategoryIndex === index && (
            <ul className="ml-2 xs:ml-3 sm:ml-4 space-y-1">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <div
                    onClick={() => {
                      handleCategoryClick(`${category.title} ${item}`);
                      toggleMenu();
                    }}
                    className="text-xs xs:text-sm text-gray-600 hover:text-[#800000] 
                             transition-all duration-300 cursor-pointer 
                             transform hover:translate-x-2 p-1.5 xs:p-2 rounded
                             hover:bg-[#800000]/5"
                  >
                    • {item}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
  
      {/* View all collections button */}
      <button
        type="button"
        onClick={handleViewAllCollections}
        className="inline-flex items-center justify-center space-x-2 xs:space-x-3 
                 px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 mt-2 xs:mt-3 
                 bg-[#800000] text-white font-semibold 
                 text-xs xs:text-sm uppercase tracking-wide rounded-md
                 hover:bg-[#600000] transform hover:scale-105 transition-all duration-300
                 shadow-md hover:shadow-lg w-[90%] xs:w-[80%] sm:w-[70%] cursor-pointer"
        style={{ pointerEvents: "auto" }}
      >
        <span className="text-nowrap">View All Collections</span>
      </button>
  
      {/* Other navigation items */}
      <div className="space-y-0 xs:space-y-1 border-gray-100">
        {["About", "Cart"].map((item, index) => {
          const href = `/${item.toLowerCase()}`;
          return (
            <button
              key={index}
              onClick={() => {
                router.push(href);
                toggleMenu();
              }}
              className="block p-1.5 xs:p-2 font-medium text-sm xs:text-base sm:text-lg 
                       transition-all duration-300 transform hover:translate-x-2 rounded-lg 
                       hover:bg-gray-50 text-gray-700 hover:text-[#800000]"
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
  
  export default MobileNavigationLinks;
  