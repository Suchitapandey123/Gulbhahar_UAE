
import { Eye } from "lucide-react";

const CollectionsDropdown = ({
  isCollectionDropdownOpen,
  router,
  setIsCollectionDropdownOpen,
  setIsHoverMode,
  dropdownRef,
  hoverTimeoutRef,
}) => {
  const collectionCategories = [
    {
      title: "Designed By Monica",
      subtitle: "Exclusive Collection",
       items : [
        {
          name: "Juttis",
          slug: "/collections/juttis"
        },
        {
          name: "Punjabi Juttis",
          slug: "/collections/punjabi-juttis"
        },
        {
          name: "Bridal Juttis",
          slug: "/collections/bridal-juttis"
        },
        {
          name: "Punjabi Juttis For Ladies",
          slug: "/collections/punjabi-juttis-for-ladies"
        },
        {
          name: "Juttis For Women",
          slug: "/collections/juttis-for-women"
        }
      ]
      
    },
    {
      title: "Casual Juttis",
      subtitle: "Everyday Comfort",
      items : [
        {
          name: "Juttis",
          slug: "/collections/juttis"
        },
        {
          name: "Punjabi Juttis",
          slug: "/collections/punjabi-juttis"
        },
        {
          name: "Bridal Juttis",
          slug: "/collections/bridal-juttis"
        },
        {
          name: "Punjabi Juttis For Ladies",
          slug: "/collections/punjabi-juttis-for-ladies"
        },
        {
          name: "Juttis For Women",
          slug: "/collections/juttis-for-women"
        }
      ]
      
    },
    {
      title: "Festive Collection",
      subtitle: "Celebration Ready",
      items : [
        {
          name: "Juttis",
          slug: "/collections/juttis"
        },
        {
          name: "Punjabi Juttis",
          slug: "/collections/punjabi-juttis"
        },
        {
          name: "Bridal Juttis",
          slug: "/collections/bridal-juttis"
        },
        {
          name: "Punjabi Juttis For Ladies",
          slug: "/collections/punjabi-juttis-for-ladies"
        },
        {
          name: "Juttis For Women",
          slug: "/collections/juttis-for-women"
        }
      ]
      
    },
    {
      title: "Designer Collection",
      subtitle: "Luxury Edition",
      items : [
        {
          name: "Juttis",
          slug: "/collections/juttis"
        },
        {
          name: "Punjabi Juttis",
          slug: "/collections/punjabi-juttis"
        },
        {
          name: "Bridal Juttis",
          slug: "/collections/bridal-juttis"
        },
        {
          name: "Punjabi Juttis For Ladies",
          slug: "/collections/punjabi-juttis-for-ladies"
        },
        {
          name: "Juttis For Women",
          slug: "/collections/juttis-for-women"
        }
      ]
      
    },
  ];

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      setIsCollectionDropdownOpen(false);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    }
  };

  const handleCategoryClick = (category) => {
    router.push(`${category}`);
    setIsCollectionDropdownOpen(false);
    setIsHoverMode(true);
  };

  const handleViewAllCollections = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    router.push("/collections");
    setIsCollectionDropdownOpen(false);
    setIsHoverMode(true);
  };

  return (
    <div
      className={`
        absolute left-0 w-full bg-white/95 backdrop-blur-md shadow-2xl z-50 
        transition-all duration-300 ease-out border-b border-gray-100
        ${
          isCollectionDropdownOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4 pointer-events-none"
        }
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-[1600px] mx-auto p-6 lg:p-8" style={{ pointerEvents: "auto" }}>
        {/* View All Collections Button */}
        <div className="flex justify-center mb-6" style={{ pointerEvents: "auto" }}>
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleViewAllCollections();
            }}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#800000] text-white 
                     font-semibold text-sm uppercase tracking-wide rounded-lg
                     hover:bg-[#600000] transform hover:scale-105 transition-all duration-300
                     shadow-lg hover:shadow-xl cursor-pointer relative z-10"
            style={{ pointerEvents: "auto" }}
          >
            <Eye size={16} />
            <span>View All Collections</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {collectionCategories.map((category, index) => (
            <CollectionCategory
              key={index}
              category={category}
              onCategoryClick={handleCategoryClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CollectionCategory = ({ category, onCategoryClick }) => (
  <div
    className="group space-y-3 lg:space-y-4 cursor-pointer 
             transform transition-all duration-400 ease-out
             hover:scale-105 hover:-translate-y-1 p-4 rounded-lg
             hover:bg-gray-50/50"
    onClick={() => onCategoryClick(category.title)}
  >
    <div className="space-y-2">
      <h3 className="font-bold text-gray-900 text-base lg:text-lg transition-colors duration-300">
        {category.title}
      </h3>
      <p className="text-xs lg:text-sm text-gray-500 transition-colors duration-300">
        {category.subtitle}
      </p>
    </div>

    <div className="h-px bg-gradient-to-r from-gray-200 to-transparent 
                    group-hover:from-[#800000] group-hover:to-[#800000]/20 
                    transition-all duration-300" />

    <ul className="space-y-2">
      {category.items.map((item, itemIndex) => (
        <li key={itemIndex}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = item.slug;
            }}
            className="text-gray-600 hover:text-[#800000] transition-all duration-300 
                     cursor-pointer text-xs lg:text-sm font-medium 
                     transform hover:translate-x-2 hover:font-semibold
                     py-1 px-2 rounded hover:bg-[#800000]/5"
          >
            {item.name}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default CollectionsDropdown;