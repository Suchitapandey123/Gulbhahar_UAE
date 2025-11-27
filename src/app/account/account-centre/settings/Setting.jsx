// "use client"
// import { 
//     Settings, 
//     MapPin, 
//     Mail, 
//     Bell, 
//     ChevronRight,
//     User,
//     Shield,
//     Palette,
//     Globe,
//     HelpCircle,
//     LogOut
//   } from "lucide-react";
  
//   const Setting = () => {
//     // Enhanced SettingBox Component
//     const SettingBox = ({ title, description, icon: Icon, onClick, variant = "default" }) => (
//       <div
//         className={`group bg-white border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
//           variant === "danger" 
//             ? "border-red-200 hover:border-red-400 hover:bg-red-50/30" 
//             : "border-red-100 hover:border-red-300 hover:bg-red-50/30"
//         }`}
//         onClick={onClick}
//       >
//         <div className="flex items-center justify-between mb-3">
//           <div className={`p-3 rounded-xl transition-colors ${
//             variant === "danger" 
//               ? "bg-red-100 group-hover:bg-red-200" 
//               : "bg-red-100 group-hover:bg-red-200"
//           }`}>
//             <Icon className={`w-6 h-6 ${
//               variant === "danger" ? "text-red-700" : "text-red-900"
//             }`} />
//           </div>
//           <ChevronRight className={`w-5 h-5 transition-colors ${
//             variant === "danger" 
//               ? "text-red-400 group-hover:text-red-600" 
//               : "text-gray-400 group-hover:text-red-600"
//           }`} />
//         </div>
//         <div className="space-y-2">
//           <h3 className={`font-semibold text-lg transition-colors ${
//             variant === "danger"
//               ? "text-gray-900 group-hover:text-red-700"
//               : "text-gray-900 group-hover:text-red-900"
//           }`}>
//             {title}
//           </h3>
//           <p className="text-sm text-gray-600 leading-relaxed">
//             {description}
//           </p>
//         </div>
//       </div>
//     );
  
//     const handleSettingClick = (settingName) => {
//       console.log(`${settingName} clicked`);
//       // Add navigation logic here
//     };
  
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-red-50/40 via-white to-red-50/20">
//         <div className="max-w-[1600px] mx-auto px-0 sm:px-6 lg:px-8 py-6 sm:py-8">
          
//           {/* Header */}
//           <div className="mb-8 sm:mb-12">
//             <div className="flex items-center gap-4 mb-4">
//               <div className="p-3 bg-red-900 rounded-xl">
//                 <Settings className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
//                   Settings
//                 </h1>
//                 <p className="text-gray-600 text-sm sm:text-base mt-1">
//                   Manage your account preferences and configuration
//                 </p>
//               </div>
//             </div>
//             <div className="h-1 bg-gradient-to-r from-red-900 via-red-700 to-red-500 rounded-full w-24" />
//           </div>
  
//           {/* Settings Grid */}
//           <div className="space-y-8">
            
//             {/* Account Settings Section */}
//             <div>
//               {/* <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
//                 <User className="w-5 h-5 text-red-900" />
//                 Account Settings
//               </h2> */}
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
//                 <SettingBox
//                   title="Address Book"
//                   description="Manage your delivery addresses and set default locations"
//                   icon={MapPin}
//                   onClick={() => handleSettingClick("Address Book")}
//                 />

//                  <SettingBox
//                   title="Help & Support"
//                   description="Get help, contact support, and access documentation"
//                   icon={HelpCircle}
//                   onClick={() => handleSettingClick("Help & Support")}
//                 />
                
              
//                 <SettingBox
//                   title="Sign Out"
//                   description="Sign out of your account on this device"
//                   icon={LogOut}
//                   onClick={() => handleSettingClick("Sign Out")}
//                   variant="danger"
//                 />
//                    <SecurityBox
//                 title="Change Password"
//                 description="Update your account password for better security"
//                 icon={Lock}
//                 onClick={() => setActiveView(SecurityView.PASSWORD)}
//               />
//                  <SecurityBox
//                                 title="Privacy Settings"
//                                 description="Control your privacy preferences and data usage"
//                                 icon={Settings}
//                                 onClick={() => setActiveView(SecurityView.PRIVACY_SETTINGS)}
//                               />
//                 {/* <SettingBox
//                   title="Newsletter Subscription"
//                   description="Control your email and WhatsApp newsletter preferences"
//                   icon={Mail}
//                   onClick={() => handleSettingClick("Newsletter Subscription")}
//                 />
                
//                 <SettingBox
//                   title="Notifications"
//                   description="Configure SMS, email, and WhatsApp notification settings"
//                   icon={Bell}
//                   onClick={() => handleSettingClick("Notifications")}
//                 /> */}
//               </div>
//             </div>
  
//             {/* Security & Privacy Section */}
//             {/* <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
//                 <Shield className="w-5 h-5 text-red-900" />
//                 Security & Privacy
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
//                 <SettingBox
//                   title="Security Settings"
//                   description="Manage password, two-factor authentication, and login security"
//                   icon={Shield}
//                   onClick={() => handleSettingClick("Security Settings")}
//                 />
                
//                 <SettingBox
//                   title="Privacy Controls"
//                   description="Control your privacy preferences and data sharing settings"
//                   icon={User}
//                   onClick={() => handleSettingClick("Privacy Controls")}
//                 />
//               </div>
//             </div> */}
  
//             {/* Appearance & Language Section */}
//             {/* <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
//                 <Palette className="w-5 h-5 text-red-900" />
//                 Appearance & Language
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
//                 <SettingBox
//                   title="Theme & Display"
//                   description="Customize the look and feel of your interface"
//                   icon={Palette}
//                   onClick={() => handleSettingClick("Theme & Display")}
//                 />
                
//                 <SettingBox
//                   title="Language & Region"
//                   description="Set your preferred language and regional settings"
//                   icon={Globe}
//                   onClick={() => handleSettingClick("Language & Region")}
//                 />
//               </div>
//             </div> */}
  
//             {/* Support & Account Section */}
//             {/* <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
//                 <HelpCircle className="w-5 h-5 text-red-900" />
//                 Support & Account
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
//                 <SettingBox
//                   title="Help & Support"
//                   description="Get help, contact support, and access documentation"
//                   icon={HelpCircle}
//                   onClick={() => handleSettingClick("Help & Support")}
//                 />
                
//                 <SettingBox
//                   title="Account Management"
//                   description="Export data, delete account, and manage subscriptions"
//                   icon={User}
//                   onClick={() => handleSettingClick("Account Management")}
//                 />
                
//                 <SettingBox
//                   title="Sign Out"
//                   description="Sign out of your account on this device"
//                   icon={LogOut}
//                   onClick={() => handleSettingClick("Sign Out")}
//                   variant="danger"
//                 />
//               </div>
//             </div> */}
//           </div>
  
//           {/* Quick Actions Footer */}
//           {/* <div className="mt-12 pt-8 border-t border-red-100">
//             <div className="bg-red-50 border border-red-200 rounded-xl p-6">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-1">Need Help?</h3>
//                   <p className="text-sm text-gray-600">
//                     Contact our support team or check our documentation for assistance.
//                   </p>
//                 </div>
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
//                     Documentation
//                   </button>
//                   <button className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors text-sm font-medium">
//                     Contact Support
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div> */}
//         </div>
//       </div>
//     );
//   };
  
//   export default Setting;



"use client";

import { useState } from "react";
import {
  Settings,
  MapPin,
  HelpCircle,
  ChevronRight,
  LogOut,
  Lock,
  Shield,
  Eye,
  EyeOff,
  Mail,
  Key,
  CheckCircle
} from "lucide-react";

/* --- Security Views Constants --- */
const SecurityView = {
  MAIN: "main",
  PASSWORD: "password",
  PRIVACY_SETTINGS: "privacy_settings",
};

const Setting = () => {
  const [activeView, setActiveView] = useState(SecurityView.MAIN);

  // Password states
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    activityStatus: false,
    dataCollection: true,
    marketing: false
  });

  // Handle password input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle password form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Password changed successfully");
    setPasswordData({ newPassword: "", confirmPassword: "" });
  };

  // Toggle privacy setting
  const togglePrivacySetting = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  /* --------------------------------------------------
        UNIVERSAL CARD COMPONENT
  -------------------------------------------------- */
  const CardBox = ({ title, description, icon: Icon, onClick, variant="default" }) => (
    <div
      className={`group bg-white border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
        variant === "danger"
          ? "border-red-200 hover:border-red-400 hover:bg-red-50/30"
          : "border-red-100 hover:border-red-300 hover:bg-red-50/30"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="p-3 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
          <Icon className="w-6 h-6 text-red-900" />
        </div>

        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
      </div>

      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-red-900 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );

  /* --------------------------------------------------
        TOGGLE SWITCH COMPONENT
  -------------------------------------------------- */
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

  /* --------------------------------------------------
        BREADCRUMB COMPONENT
  -------------------------------------------------- */
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

  /* --------------------------------------------------
        PASSWORD PAGE - EXACT COPY FROM SECURITY
  -------------------------------------------------- */
  if (activeView === SecurityView.PASSWORD) {
    return (
      <div className="max-w-4xl mx-auto">
        <Breadcrumb
          items={[
            { label: "Settings", onClick: () => setActiveView(SecurityView.MAIN) },
            { label: "Change Password" }
          ]}
        />

        <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-50 to-red-25 px-6 sm:px-8 py-6 border-b border-red-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Change Password
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Create a strong password to keep your account secure
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <div className="space-y-6">
              {/* New Password Field */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword.newPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors"
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => togglePasswordVisibility("newPassword")}
                  >
                    {showPassword.newPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  >
                    {showPassword.confirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">Password Requirements:</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Include uppercase and lowercase letters</li>
                  <li>• Include at least one number</li>
                  <li>• Include at least one special character</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSubmit}
                  className="flex items-center justify-center gap-2 bg-red-900 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors font-medium"
                >
                  <Key className="w-4 h-4" />
                  Change Password
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView(SecurityView.MAIN)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* --------------------------------------------------
        PRIVACY SETTINGS PAGE - EXACT COPY FROM SECURITY
  -------------------------------------------------- */
  if (activeView === SecurityView.PRIVACY_SETTINGS) {
    return (
      <div className="max-w-4xl mx-auto">
        <Breadcrumb
          items={[
            { label: "Settings", onClick: () => setActiveView(SecurityView.MAIN) },
            { label: "Privacy Settings" }
          ]}
        />

        <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-50 to-red-25 px-6 sm:px-8 py-6 border-b border-red-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Privacy Settings
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Control your privacy preferences and data usage
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-200 transition-colors">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-red-900" />
                  <div>
                    <p className="font-medium text-gray-900">Profile Visibility</p>
                    <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                  </div>
                </div>
                <ToggleSwitch
                  id="profile-visibility"
                  checked={privacySettings.profileVisibility}
                  onChange={() => togglePrivacySetting('profileVisibility')}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-200 transition-colors">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-red-900" />
                  <div>
                    <p className="font-medium text-gray-900">Activity Status</p>
                    <p className="text-sm text-gray-600">Show when you're active or online</p>
                  </div>
                </div>
                <ToggleSwitch
                  id="activity-status"
                  checked={privacySettings.activityStatus}
                  onChange={() => togglePrivacySetting('activityStatus')}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-200 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-red-900" />
                  <div>
                    <p className="font-medium text-gray-900">Data Collection</p>
                    <p className="text-sm text-gray-600">Allow collection of usage data for improvements</p>
                  </div>
                </div>
                <ToggleSwitch
                  id="data-collection"
                  checked={privacySettings.dataCollection}
                  onChange={() => togglePrivacySetting('dataCollection')}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-200 transition-colors">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-red-900" />
                  <div>
                    <p className="font-medium text-gray-900">Marketing Communications</p>
                    <p className="text-sm text-gray-600">Receive promotional emails and offers</p>
                  </div>
                </div>
                <ToggleSwitch
                  id="marketing"
                  checked={privacySettings.marketing}
                  onChange={() => togglePrivacySetting('marketing')}
                />
              </div>
            </div>

            {/* Save Settings Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => console.log('Privacy settings saved:', privacySettings)}
                className="bg-red-900 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors font-medium"
              >
                Save Privacy Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* --------------------------------------------------
        DEFAULT MAIN SETTINGS PAGE
  -------------------------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/40 via-white to-red-50/20">
      <div className="max-w-[1600px] mx-auto px-0 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* HEADER */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-900 rounded-xl">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 text-sm sm:text-base mt-1">Manage account preferences</p>
            </div>
          </div>

          <div className="h-1 w-24 bg-gradient-to-r from-red-900 via-red-700 to-red-500 rounded-full" />
        </div>

        {/* SETTINGS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">

          <CardBox title="Address Book" description="Manage your delivery addresses" icon={MapPin} />
          <CardBox title="Help & Support" description="Get help or contact support" icon={HelpCircle} />
          <CardBox title="Sign Out" description="Logout from this device" icon={LogOut} variant="danger" />

          {/* Now working: */}
          <CardBox
            title="Change Password"
            description="Update your account password"
            icon={Lock}
            onClick={() => setActiveView(SecurityView.PASSWORD)}
          />

          <CardBox
            title="Privacy Settings"
            description="Control your privacy preferences"
            icon={Shield}
            onClick={() => setActiveView(SecurityView.PRIVACY_SETTINGS)}
          />
        </div>
      </div>
    </div>
  );
};

export default Setting;
