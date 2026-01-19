
import ProfileImage from "./ProfileImage";

const MobileUserSection = ({
  userData,
  userMenuItems,
  router,
  toggleMenu,
  ...props
}) => (
  <div className="pb-3 xs:pb-4 border-b border-gray-100">
    <div className="flex items-center space-x-2 xs:space-x-3 mb-3 xs:mb-4">
      <ProfileImage
        size="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12"
        className="border-2 border-gray-200"
        userData={userData}
        {...props}
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 text-sm xs:text-base truncate">
          {userData?.name || `${userData?.firstName || ""} ${userData?.lastName || ""}`.trim()}
        </p>
        <p className="text-xs xs:text-sm text-gray-600 truncate">
          {userData?.email}
        </p>
        {userData?.userId && (
          <p className="text-xs text-gray-500 truncate">
          </p>
        )}
      </div>
    </div>

    <div className="space-y-1 xs:space-y-2">
      {userMenuItems.map((item) => (
        <div
          key={item.label}
          onClick={() => {
            router.push(item.href);
            toggleMenu();
          }}
          className="flex items-center space-x-2 xs:space-x-3 w-full p-2 xs:p-2.5 text-left 
                   text-gray-800 hover:text-[#800000] hover:bg-[#800000]/5 rounded-lg 
                   transition-all duration-200 text-sm xs:text-base cursor-pointer"
        >
          <item.icon size={14} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default MobileUserSection;
