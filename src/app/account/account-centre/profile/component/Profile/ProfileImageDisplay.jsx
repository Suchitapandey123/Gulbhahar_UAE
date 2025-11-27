"use client";

import { useEffect, useState } from "react";

const ProfileImageDisplay = ({ 
  imageUrl, 
  firstName, 
  lastName, 
  size = "w-20 h-20", 
  className = "" 
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.error("Image failed to load:", imageUrl);
    setImageError(true);
  };

  useEffect(() => {
  setImageError(false);
}, [imageUrl]);

  const handleImageLoad = () => {
    // console.log("Image loaded successfully:", imageUrl);
    setImageError(false);
  };

  const shouldShowImage = imageUrl;
  
  

  if (shouldShowImage) {
    return (
      <div className={`${size} ${className} relative overflow-hidden rounded-full bg-gray-100 border-4 border-white shadow-lg`}>
        <img
          src={imageUrl}
          alt={`${firstName || 'User'}'s profile`}
          className="w-full h-full object-cover"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      </div>
    );
  }

  // Fallback to initials
  const initials = firstName && lastName 
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    : firstName 
      ? firstName.charAt(0).toUpperCase()
      : 'U';

  return (
    <div className={`${size} ${className} bg-red-900 rounded-full flex items-center justify-center border-4 border-white shadow-lg`}>
      <span className="text-white font-bold text-2xl">
        {initials}
      </span>
    </div>
  );
};

export default ProfileImageDisplay;