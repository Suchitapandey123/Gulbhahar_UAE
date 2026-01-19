import ProfileImageDisplay from "./ProfileImageDisplay";

const ProfileHeader = ({ formData }) => {
  // console.log("profile header" , formData.imageUrl)
  return (
    <div className="mb-8 sm:mb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
        <ProfileImageDisplay 
          imageUrl={formData.imageUrl}
          firstName={formData.firstName}
          lastName={formData.lastName}
          size="w-20 h-20 sm:w-24 sm:h-24" 
        />
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Welcome, {formData.firstName || 'User'}!
              </h1>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                Manage your account settings and preferences
              </p>
            </div>
          </div>
          {formData.email && (
            <p className="text-gray-600 text-sm">
              {formData.email}
            </p>
          )}
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-red-900 via-red-700 to-red-500 rounded-full w-24" />
    </div>
  );
};

export default ProfileHeader;