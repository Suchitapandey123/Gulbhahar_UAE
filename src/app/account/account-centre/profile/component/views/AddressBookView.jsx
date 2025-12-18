"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2 } from "lucide-react";
import Breadcrumb from "../Profile/Breadcrumb";
import profileAPI from "../../../../../api/profile/profile";

const AddressBookView = ({ onNavigate, ProfileView }) => {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [addressFormData, setAddressFormData] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const [savedAddresses, setSavedAddresses] = useState([]);

  const loadAddresses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await profileAPI.getUserAddresses();
      // console.log("Address API Response:", response);

      if (response.success && Array.isArray(response.data)) {
        setSavedAddresses(response.data);
      } else {
        setSavedAddresses([]);
        console.warn("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error loading addresses:", error);
      setError("Failed to load addresses. Please try again.");
      setSavedAddresses([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveAddress = async (id) => {
    try {
      // If you have a delete API endpoint, use it here:
      // await profileAPI.deleteAddress(id);
      
      // Optimistic update
      setSavedAddresses((prev) =>
        prev.filter((address) => {
          // Make sure we're accessing the correct ID property
          return address.id !== id && 
                 address._id !== id && 
                 address.shippingAddress?.postalCode !== id
        })
      );
    } catch (error) {
      console.error("Error deleting address:", error);
      // Reload addresses to revert optimistic update if needed
      loadAddresses();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-0 mt-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Profile", onClick: () => onNavigate(ProfileView.MAIN) },
          { label: "Address Book" },
        ]}
      />

      {/* Add New Address Button */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Address Book</h1>
          <p className="text-gray-600">Manage your delivery addresses</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-red-900 text-white px-5 py-2.5 rounded-lg hover:bg-red-800 transition"
        >
          <Plus className="w-4 h-4" />
          {showForm ? "Hide Form" : "Add New Address"}
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-xl border border-red-100 shadow-sm p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-900 mb-4"></div>
          <p className="text-gray-600">Loading addresses...</p>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <p className="text-red-700">{error}</p>
          <button
            onClick={loadAddresses}
            className="mt-3 text-red-900 hover:text-red-800 font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {/* Address Form */}
      {showForm && !isLoading && (
        <div className="bg-white rounded-xl border border-red-100 shadow-sm mb-6">
          <div className="bg-red-50 px-6 py-4 border-b border-red-100">
            <h2 className="text-xl font-semibold">Add New Address</h2>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              name="fullName"
              value={addressFormData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="border p-3 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
            <input
              type="tel"
              name="phone"
              value={addressFormData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="border p-3 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              name="addressLine1"
              value={addressFormData.addressLine1}
              onChange={handleInputChange}
              placeholder="Address Line 1"
              className="border p-3 rounded col-span-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              name="city"
              value={addressFormData.city}
              onChange={handleInputChange}
              placeholder="City"
              className="border p-3 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              name="state"
              value={addressFormData.state}
              onChange={handleInputChange}
              placeholder="State"
              className="border p-3 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              name="postalCode"
              value={addressFormData.postalCode}
              onChange={handleInputChange}
              placeholder="Postal Code"
              className="border p-3 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      )}

      {/* Saved Addresses */}
      {!isLoading && !error && (
        <div className="bg-white rounded-xl border border-red-100 shadow-sm">
          <div className="bg-red-50 px-6 py-4 border-b border-red-100">
            <h2 className="text-xl font-semibold">Saved Addresses</h2>
            <p className="text-gray-600 text-sm mt-1">
              {savedAddresses.length} {savedAddresses.length === 1 ? 'address' : 'addresses'} saved
            </p>
          </div>

          <div className="p-6 space-y-5">
            {savedAddresses.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600 mb-4">No addresses added yet.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="text-red-900 hover:text-red-800 font-medium"
                >
                  Add your first address
                </button>
              </div>
            ) : (
              savedAddresses.map((address, index) => {
                // Add defensive checks for address data
                const shippingAddress = address.shippingAddress || {};
                
                return (
                  <div
                    key={address.id || address._id || index}
                    className="border rounded-xl p-5 flex justify-between items-start hover:border-red-300 transition"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-lg">
                        {shippingAddress.fullName || 'N/A'}
                      </p>

                      <p className="text-sm text-gray-700 mt-1">
                        Address: {shippingAddress.addressLine1 || 'N/A'}
                      </p>

                      <p className="text-sm text-gray-600">
                        {shippingAddress.city || 'N/A'}, {shippingAddress.state || 'N/A'}
                      </p>

                      <p className="text-sm text-gray-600">
                        Postal Code: {shippingAddress.postalCode || 'N/A'}
                      </p>

                      <p className="text-sm text-gray-600">
                        Phone: {shippingAddress.phone || 'N/A'}
                      </p>

                      <p className="text-sm text-gray-600">
                        Country: {shippingAddress.country || 'India'}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemoveAddress(
                        address.id || 
                        address._id || 
                        shippingAddress.postalCode || 
                        index
                      )}
                      className="text-red-600 hover:bg-red-50 p-2 rounded ml-4"
                      title="Delete address"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressBookView;