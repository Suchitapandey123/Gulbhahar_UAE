import { useState } from "react";
import { Plus, Trash2, Home, ChevronDown } from "lucide-react";
import Breadcrumb from "../Profile/Breadcrumb";

const AddressBookView = ({ onNavigate, ProfileView }) => {
  // Address form state
  const [addressFormData, setAddressFormData] = useState({
    streetAddress: "",
    city: "",
    region: "Select Region",
    postalCode: ""
  });

  // Saved addresses state
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      streetAddress: "512, Kailash Tower, Mahavir Enclave, Mumbai",
      postalCode: "400001"
    },
    {
      id: 2,
      streetAddress: "78, Green Valley, MG Road, Bangalore",
      postalCode: "560001"
    },
    {
      id: 3,
      streetAddress: "203, Lotus Apartments, Park Street, Kolkata",
      postalCode: "700016"
    }
  ]);

  // Handle address input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new address function
  const handleAddAddress = () => {
    if (
      addressFormData.streetAddress &&
      addressFormData.city &&
      addressFormData.postalCode
    ) {
      const newAddress = {
        id: Date.now(),
        streetAddress: `${addressFormData.streetAddress}, ${addressFormData.city}`,
        postalCode: addressFormData.postalCode
      };

      setSavedAddresses(prev => [...prev, newAddress]);

      // Reset the form
      setAddressFormData({
        streetAddress: "",
        city: "",
        region: "Select Region",
        postalCode: ""
      });
    }
  };

  // Remove address function
  const handleRemoveAddress = (id) => {
    setSavedAddresses(prev => prev.filter(address => address.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Breadcrumb 
        items={[
          { label: "Profile", onClick: () => onNavigate(ProfileView.MAIN) },
          { label: "Address Book" }
        ]} 
      />

      {/* Add New Address */}
      <div className="bg-white rounded-xl border border-red-100 shadow-sm mb-6">
        <div className="bg-gradient-to-r from-red-50 to-red-25 px-6 sm:px-8 py-6 border-b border-red-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add New Address</h2>
              <p className="text-gray-600 text-sm mt-1">Add a new delivery address</p>
            </div>
            <button 
              onClick={handleAddAddress}
              className="flex items-center gap-2 bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Address
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Home className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="streetAddress"
                  value={addressFormData.streetAddress}
                  onChange={handleInputChange}
                  placeholder="Enter your house number and street name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={addressFormData.city}
                onChange={handleInputChange}
                placeholder="Enter city name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="region"
                  value={addressFormData.region}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors appearance-none"
                >
                  <option>Select Region</option>
                  <option>Maharashtra</option>
                  <option>Karnataka</option>
                  <option>Tamil Nadu</option>
                  <option>West Bengal</option>
                  <option>Delhi</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="postalCode"
                value={addressFormData.postalCode}
                onChange={handleInputChange}
                placeholder="Enter postal code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Saved Addresses */}
      <div className="bg-white rounded-xl border border-red-100 shadow-sm">
        <div className="bg-gradient-to-r from-red-50 to-red-25 px-6 sm:px-8 py-6 border-b border-red-100">
          <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
          <p className="text-gray-600 text-sm mt-1">
            {savedAddresses.length} {savedAddresses.length === 1 ? 'address' : 'addresses'} saved
          </p>
        </div>
        
        <div className="p-6 sm:p-8">
          <div className="space-y-4">
            {savedAddresses.map((address) => (
              <div
                key={address.id}
                className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-red-200 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900 mb-1">
                    {address.streetAddress}
                  </p>
                  <p className="text-sm text-gray-600">
                    Postal Code: {address.postalCode}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveAddress(address.id)}
                  className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Remove address"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressBookView;