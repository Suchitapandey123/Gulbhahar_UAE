// @ts-nocheck
import { User } from "lucide-react";
import Image from "next/image";

const ProfileImage = ({ 
  size = "w-8 h-8", 
  className = "", 
  userData, 
  profileImageLoading, 
  authLoading, 
  profileImageError, 
  iimageUrl,
  setProfileImageError 
}) => {
  const handleImageError = () => {
    setProfileImageError(true);
  };

  const handleImageLoad = () => {
    setProfileImageError(false);
  };

  const isSmall = size.includes("w-6") || size.includes("w-7");
  const isMedium = size.includes("w-8") || size.includes("w-10");
  const isLarge = size.includes("w-12");

  if (profileImageLoading || authLoading) {
    return (
      <div
        className={`${size} ${className} bg-gray-200 rounded-full flex items-center justify-center animate-pulse`}
      >
        <User
          size={isSmall ? 12 : isMedium ? 16 : 20}
          className="text-gray-400"
        />
      </div>
    );
  }

  if ((iimageUrl?.profilePicture || userData?.imageUrl) && !profileImageError) {
    return (
      <div
        className={`${size} ${className} relative overflow-hidden rounded-full bg-gray-100 flex-shrink-0`}
      >
        <Image
          src={iimageUrl?.profilePicture || userData.imageUrl}
          alt={`${userData.firstName || "User"}'s profile`}
          fill
          className="object-cover"
          onError={handleImageError}
          onLoad={handleImageLoad}
          priority
          sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, 48px"
        />
      </div>
    );
  }

  // Fallback to initials or user icon
  const initials =
    userData?.firstName && userData?.lastName
      ? `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`.toUpperCase()
      : userData?.name
      ? userData.name
          .split(" ")
          .map((n) => n.charAt(0))
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "";

  if (initials) {
    return (
      <div
        className={`${size} ${className} bg-[#800000] rounded-full flex items-center justify-center flex-shrink-0`}
      >
        <span
          className={`text-white font-semibold ${
            isSmall ? "text-xs" : isMedium ? "text-sm" : "text-base"
          }`}
        >
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${size} ${className} bg-[#800000] rounded-full flex items-center justify-center flex-shrink-0`}
    >
      <User size={isSmall ? 12 : isMedium ? 16 : 20} className="text-white" />
    </div>
  );
};

export default ProfileImage;
