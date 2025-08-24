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
    <div className="w-full space-y-8">
      <div className="text-center">
        <span className="text-red-600 font-medium text-lg">Let's setup your account</span>
        <h1 className="text-4xl font-bold text-red-900 mt-2">Create Account</h1>
        <p className="text-red-700 mt-2">Add a profile picture to personalize your account</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">
          {success}
        </div>
      )}
      
      <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 text-center space-y-8">
        <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto relative overflow-hidden border-4 border-red-200">
          {previewImage ? (
            <img
              src={previewImage} 
              alt="Profile preview" 
              className="w-full h-full object-cover"
            />
          ) : (
            <FiCamera className="w-16 h-16 text-red-600" />
          )}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-red-900 mb-4">Upload Profile Picture</h2>
          <p className="text-red-700 text-lg">
            Choose a photo that represents you best
          </p>
          <p className="text-red-600 mt-2">This step is optional - you can skip it and add a photo later</p>
        </div>
        
        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-red-100 border-2 border-red-300 border-dashed text-red-900 px-8 py-6 rounded-xl hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 flex items-center justify-center mx-auto font-semibold"
          >
            <FiUpload className="mr-3 w-6 h-6" />
            {selectedImage ? 'Change Photo' : 'Choose Photo'}
          </button>
          
          {selectedImage && (
            <p className="text-red-700 text-sm">
              Selected: {selectedImage.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;