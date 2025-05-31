"use client";

import { useState } from "react";
import { 
  User, 
  MapPin, 
  Bell, 
  Mail, 
  Edit3, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronDown,
  Save,
  ArrowLeft,
  Phone,
  Home
} from "lucide-react";

const ProfileView = {
  MAIN: "main",
  PERSONAL_INFO: "personal_info",
  ADDRESS_BOOK: "address_book",
  NEWSLETTER: "newsletter",
  NOTIFICATIONS: "notifications"
};

const Profile = () => {
  const [activeView, setActiveView] = useState(ProfileView.MAIN);

  // Personal info form state
  const [formData, setFormData] = useState({
    fullName: "Akash Pandey",
    email: "akashpandey@reeltor.com",
    phoneNumber: "+91 9876543211"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

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

  // Subscription state
  const [subscriptions, setSubscriptions] = useState({
    email: false,
    whatsapp1: true,
    whatsapp2: false
  });

  // Toggle subscription
  const handleToggleChange = (channel) => {
    setSubscriptions(prev => ({
      ...prev,
      [channel]: !prev[channel]
    }));
  };

  // Notification state
  const [notifications, setNotifications] = useState({
    main: false,
    email: false,
    sms: true,
    whatsapp: false
  });

  // Toggle notification
  const handleToggleNotification = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Enhanced Toggle Component
  const ToggleSwitch = ({ 
    id, 
    checked, 
    onChange, 
    disabled = false 
  }) => (
    <div className="relative inline-block w-12 h-6">
      <input
        type="checkbox"
        id={id}
        className="sr-only"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-all duration-300 ${
          checked ? 'bg-red-900' : 'bg-gray-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span
          className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-all duration-300 ${
            checked ? 'translate-x-6' : 'translate-x-0.5'
          } mt-0.5`}
        />
      </label>
    </div>
  );

  // Enhanced ProfileBox Component
  const ProfileBox = ({
    title,
    description,
    icon: Icon,
    onClick
  }) => (
    <div
      className="group bg-white border border-red-100 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:bg-red-50/30"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="p-3 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
          <Icon className="w-6 h-6 text-red-900" />
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-red-900 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );

  // Breadcrumb Component
  const Breadcrumb = ({ items }) => (
    <div className="flex items-center gap-2 mb-6 sm:mb-8">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
          <button
            onClick={item.onClick}
            className={`text-sm sm:text-base font-medium transition-colors ${
              index === items.length - 1
                ? 'text-red-900 cursor-default'
                : 'text-gray-600 hover:text-red-900'
            }`}
          >
            {item.label}
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/40 via-white to-red-50/20">
      <div className="max-w-[1600px] mx-auto px-0 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {activeView === ProfileView.MAIN && (
          <div>
            {/* Header */}
            <div className="mb-8 sm:mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-900 rounded-xl">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    Profile Settings
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base mt-1">
                    Manage your account settings and preferences
                  </p>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-red-900 via-red-700 to-red-500 rounded-full w-24" />
            </div>

            {/* Profile Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              <ProfileBox
                title="Personal Information"
                description="Edit and update your personal details, contact information"
                icon={User}
                onClick={() => setActiveView(ProfileView.PERSONAL_INFO)}
              />
              
              <ProfileBox
                title="Address Book"
                description="Manage your delivery addresses, set default locations"
                icon={MapPin}
                onClick={() => setActiveView(ProfileView.ADDRESS_BOOK)}
              />
              
              <ProfileBox
                title="Newsletter Subscription"
                description="Control your email and WhatsApp newsletter preferences"
                icon={Mail}
                onClick={() => setActiveView(ProfileView.NEWSLETTER)}
              />
              
              <ProfileBox
                title="Notifications"
                description="Configure SMS, email, and WhatsApp notification settings"
                icon={Bell}
                onClick={() => setActiveView(ProfileView.NOTIFICATIONS)}
              />
            </div>
          </div>
        )}

        {activeView === ProfileView.PERSONAL_INFO && (
          <div className="max-w-4xl mx-auto">
            <Breadcrumb 
              items={[
                { label: "Profile", onClick: () => setActiveView(ProfileView.MAIN) },
                { label: "Personal Information" }
              ]} 
            />

            <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-50 to-red-25 px-6 sm:px-8 py-6 border-b border-red-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                      Personal Information
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Update your personal details and contact information
                    </p>
                  </div>
                  <button 
                    onClick={handleSubmit}
                    className="flex items-center gap-2 bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors text-sm font-medium"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="p-6 sm:p-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors"
                        placeholder="Enter your full name"
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === ProfileView.ADDRESS_BOOK && (
          <div className="max-w-4xl mx-auto">
            <Breadcrumb 
              items={[
                { label: "Profile", onClick: () => setActiveView(ProfileView.MAIN) },
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
                <p className="text-gray-600 text-sm mt-1">Manage your delivery addresses</p>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="space-y-4">
                  {savedAddresses.map((address) => (
                    <div key={address.id} className="border border-gray-200 rounded-lg p-6 hover:border-red-200 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-red-900 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-900">{address.streetAddress}</p>
                              <p className="text-gray-600 text-sm mt-1">Postal Code: {address.postalCode}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                            <Edit3 className="w-4 h-4" />
                            Edit
                          </button>
                          <button 
                            onClick={() => handleRemoveAddress(address.id)}
                            className="flex items-center gap-2 px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === ProfileView.NEWSLETTER && (
          <div className="max-w-4xl mx-auto">
            <Breadcrumb 
              items={[
                { label: "Profile", onClick: () => setActiveView(ProfileView.MAIN) },
                { label: "Newsletter Subscription" }
              ]} 
            />

            <div className="bg-white rounded-xl border border-red-100 shadow-sm">
              <div className="bg-gradient-to-r from-red-50 to-red-25 px-6 sm:px-8 py-6 border-b border-red-100">
                <h2 className="text-xl font-semibold text-gray-900">Newsletter Subscription</h2>
                <p className="text-gray-600 text-sm mt-1">Manage your newsletter preferences</p>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-red-900" />
                      <div>
                        <p className="font-medium text-gray-900">Email Newsletter</p>
                        <p className="text-sm text-gray-600">Receive newsletters via email</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      id="email-newsletter"
                      checked={subscriptions.email}
                      onChange={() => handleToggleChange('email')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-red-900" />
                      <div>
                        <p className="font-medium text-gray-900">WhatsApp Updates</p>
                        <p className="text-sm text-gray-600">Get updates on WhatsApp (Primary)</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      id="whatsapp1-newsletter"
                      checked={subscriptions.whatsapp1}
                      onChange={() => handleToggleChange('whatsapp1')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-red-900" />
                      <div>
                        <p className="font-medium text-gray-900">WhatsApp Promotions</p>
                        <p className="text-sm text-gray-600">Receive promotional content on WhatsApp</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      id="whatsapp2-newsletter"
                      checked={subscriptions.whatsapp2}
                      onChange={() => handleToggleChange('whatsapp2')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === ProfileView.NOTIFICATIONS && (
          <div className="max-w-4xl mx-auto">
            <Breadcrumb 
              items={[
                { label: "Profile", onClick: () => setActiveView(ProfileView.MAIN) },
                { label: "Notification Settings" }
              ]} 
            />

            <div className="bg-white rounded-xl border border-red-100 shadow-sm">
              <div className="bg-gradient-to-r from-red-50 to-red-25 px-6 sm:px-8 py-6 border-b border-red-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
                    <p className="text-gray-600 text-sm mt-1">Control how you receive notifications</p>
                  </div>
                  <ToggleSwitch
                    id="main-notifications"
                    checked={notifications.main}
                    onChange={() => handleToggleNotification('main')}
                  />
                </div>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-red-900" />
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      id="email-notifications"
                      checked={notifications.email}
                      onChange={() => handleToggleNotification('email')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-red-900" />
                      <div>
                        <p className="font-medium text-gray-900">SMS Notifications</p>
                        <p className="text-sm text-gray-600">Receive important updates via SMS</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      id="sms-notifications"
                      checked={notifications.sms}
                      onChange={() => handleToggleNotification('sms')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-red-900" />
                      <div>
                        <p className="font-medium text-gray-900">WhatsApp Notifications</p>
                        <p className="text-sm text-gray-600">Get notified on WhatsApp</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      id="whatsapp-notifications"
                      checked={notifications.whatsapp}
                      onChange={() => handleToggleNotification('whatsapp')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;