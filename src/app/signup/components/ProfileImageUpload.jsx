// src/app/signup/components/ProfileImageUpload.jsx
"use client"
import { FiCamera, FiUpload } from 'react-icons/fi';

const ProfileImageUpload = ({
  selectedImage,
  previewImage,
  fileInputRef,
  handleImageSelect,
  error,
  success
}) => {
  return (
    <div className="space-y-5">
      {error && (
        <div className="bg-red-50/80 text-red-600 px-4 py-2.5 rounded-xl text-sm border border-red-100">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50/80 text-green-600 px-4 py-2.5 rounded-xl text-sm border border-green-100">
          {success}
        </div>
      )}

      <div className="text-center space-y-6 py-6">
        <div className="w-28 h-28 bg-gray-50 rounded-full flex items-center justify-center mx-auto relative overflow-hidden border-2 border-gray-100 shadow-sm">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <FiCamera className="w-10 h-10 text-gray-300" />
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">Upload Profile Picture</h3>
          <p className="text-gray-400 text-sm mt-1.5">Optional - you can add a photo later</p>
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 text-gray-500 px-8 py-4 rounded-2xl hover:border-[#800000]/30 hover:text-[#800000] hover:bg-[#800000]/[0.02] focus:outline-none transition-all duration-300 flex items-center justify-center mx-auto text-sm font-medium"
          >
            <FiUpload className="mr-2.5 w-4 h-4" />
            {selectedImage ? 'Change Photo' : 'Choose Photo'}
          </button>

          {selectedImage && (
            <p className="text-gray-400 text-xs mt-3">
              {selectedImage.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
