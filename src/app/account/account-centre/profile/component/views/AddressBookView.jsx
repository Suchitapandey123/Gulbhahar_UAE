"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import Breadcrumb from "../Profile/Breadcrumb";
import profileAPI from "../../../../../api/profile/profile";

const AddressBookView = ({ onNavigate, ProfileView }) => {
  const [showForm, setShowForm] = useState(false);

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

  const loadAddresses = async () => {
    try {
      const response = await profileAPI.getUserAddresses();
      console.log("Address API Response:", response);

      if (response.success && Array.isArray(response.data)) {
        setSavedAddresses(response.data);
      } else {
        setSavedAddresses([]);
      }
    } catch (error) {
      console.error("Error loading addresses:", error);
      setSavedAddresses([]);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveAddress = (id) => {
    setSavedAddresses((prev) =>
      prev.filter((a) => a.shippingAddress.postalCode !== id)
    );
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
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-red-900 text-white px-5 py-2.5 rounded-lg hover:bg-red-800 transition"
        >
          <Plus className="w-4 h-4" />
          {showForm ? "Hide Form" : "Add New Address"}
        </button>
      </div>

      {/* Address Form */}
      {showForm && (
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
              className="border p-3 rounded"
            />
            <input
              type="text"
              name="phone"
              value={addressFormData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="border p-3 rounded"
            />
            <input
              type="text"
              name="addressLine1"
              value={addressFormData.addressLine1}
              onChange={handleInputChange}
              placeholder="Address Line 1"
              className="border p-3 rounded col-span-2"
            />
            <input
              type="text"
              name="city"
              value={addressFormData.city}
              onChange={handleInputChange}
              placeholder="City"
              className="border p-3 rounded"
            />
            <input
              type="text"
              name="state"
              value={addressFormData.state}
              onChange={handleInputChange}
              placeholder="State"
              className="border p-3 rounded"
            />
            <input
              type="text"
              name="postalCode"
              value={addressFormData.postalCode}
              onChange={handleInputChange}
              placeholder="Postal Code"
              className="border p-3 rounded"
            />
          </div>
        </div>
      )}

      {/* Saved Addresses */}
      <div className="bg-white rounded-xl border border-red-100 shadow-sm">
        <div className="bg-red-50 px-6 py-4 border-b border-red-100">
          <h2 className="text-xl font-semibold">Saved Addresses</h2>
          <p className="text-gray-600 text-sm mt-1">
            {savedAddresses.length} saved
          </p>
        </div>

        <div className="p-6 space-y-5">
          {savedAddresses.length === 0 && (
            <p className="text-center text-gray-600">No addresses added yet.</p>
          )}

          {savedAddresses.map((address, index) => (
            <div
              key={index}
              className="border rounded-xl p-5 flex justify-between items-start hover:border-red-300 transition"
            >
              <div>
                <p className="font-semibold text-lg">
                  {address.shippingAddress.fullName}
                </p>

                <p className="text-sm text-gray-700 mt-1">
                  Address: {address.shippingAddress.addressLine1}
                </p>

                <p className="text-sm text-gray-600">
                  {address.shippingAddress.city}, {address.shippingAddress.state}
                </p>

                <p className="text-sm text-gray-600">
                  Postal Code: {address.shippingAddress.postalCode}
                </p>

                <p className="text-sm text-gray-600">
                  Phone: {address.shippingAddress.phone}
                </p>

                <p className="text-sm text-gray-600">
                  Country: {address.shippingAddress.country}
                </p>
              </div>

              <button
                onClick={() => handleRemoveAddress(address.shippingAddress.postalCode)}
                className="text-red-600 hover:bg-red-50 p-2 rounded"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressBookView;
