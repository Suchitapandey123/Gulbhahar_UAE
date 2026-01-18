import { User, Mail, Phone, MapPin, Save, Camera, Upload } from "lucide-react";
import Breadcrumb from "../Profile/Breadcrumb";
import ProfileImageDisplay from "../Profile/ProfileImageDisplay";
import { useRef } from "react";

const PersonalInfoView = ({ 
  formData, 
  user,
  saving,
  onNavigate, 
  onSubmit, 
  onChange,
  onImageChange,
  ProfileView 
}) => {
  const fileInputRef = useRef(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Breadcrumb 
        items={[
          { label: "Profile", onClick: () => onNavigate(ProfileView.MAIN) },
          { label: "Personal Information" }
        ]} 
      />

      <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-50 to-red-25 px-6 sm:px-8 py-6 border-b border-red-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Personal Information
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Update your personal details and contact information
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="p-2 sm:p-4">
          {/* Profile Image Section */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <div className="flex  flex-col sm:flex-row items-start sm:items-center gap-6">
              <ProfileImageDisplay 
                imageUrl={formData.imageUrl}
                firstName={formData.firstName}
                lastName={formData.lastName}
                size="w-20 h-20" 
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Picture</h3>
                <p className="text-gray-600 text-sm mb-4">
                  This is your current profile picture. You can update it anytime.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button 
                  onClick={handlePhotoClick}
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors text-sm"
                >
                  <Camera className="w-4 h-4" />
                  Change Photo
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors"
                  placeholder="Enter your first name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors"
                  placeholder="Enter your location"
                />
              </div>
            </div>
          </div>

          {/* User ID Display */}
          {user && user.userId && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">User ID</p>
                  <p className="text-sm text-gray-500">{user.userId}</p>
                </div>
              </div>
            </div>
          )}

          {/* Save Button - Moved to Bottom */}
          <div className="mt-8 flex justify-end">
            <button 
              onClick={onSubmit}
              disabled={saving}
              className="flex items-center gap-2 bg-red-900 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoView;