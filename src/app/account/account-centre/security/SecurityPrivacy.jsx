"use client";

import { useState } from "react";
import { 
  Shield, 
  Lock, 
  Smartphone, 
  History, 
  Monitor, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  AlertTriangle,
  Mail,
  MessageSquare,
  Key,
  Settings,
  CheckCircle,
  Clock,
  MapPin,
  Trash2
} from "lucide-react";

const SecurityView = {
  MAIN: "main",
  PASSWORD: "password",
  TWO_FACTOR: "two_factor",
  LOGIN_HISTORY: "login_history",
  DEVICE_MANAGEMENT: "device_management",
  PRIVACY_SETTINGS: "privacy_settings",
};

const SecurityPrivacy = () => {
  const [activeView, setActiveView] = useState(SecurityView.MAIN);

  // Change password states
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  // Handle input changes
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

  // Two-Factor Authentication states
  const [authMethods, setAuthMethods] = useState({
    emailOTP: true,
    textMessage: false,
  });

  // Toggle 2FA Methods
  const toggleAuthMethod = (method) => {
    setAuthMethods((prev) => ({
      ...prev,
      [method]: !prev[method],
    }));
  };

  // Disable 2FA
  const handleDisable2FA = () => {
    setAuthMethods({ emailOTP: false, textMessage: false });
    console.log("Two-factor authentication disabled");
  };

  // Mock data for login history
  const loginHistory = [
    {
      id: 1,
      device: "Chrome on Windows",
      location: "Mumbai, India",
      time: "2 hours ago",
      status: "current"
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "Mumbai, India", 
      time: "1 day ago",
      status: "success"
    },
    {
      id: 3,
      device: "Firefox on Mac",
      location: "Delhi, India",
      time: "3 days ago",
      status: "success"
    }
  ];

  // Mock data for device management
  const devices = [
    {
      id: 1,
      name: "Chrome on Windows",
      type: "Desktop",
      location: "Mumbai, India",
      lastActive: "Current session",
      current: true
    },
    {
      id: 2,
      name: "Safari on iPhone 14",
      type: "Mobile",
      location: "Mumbai, India",
      lastActive: "1 day ago",
      current: false
    },
    {
      id: 3,
      name: "Firefox on MacBook",
      type: "Desktop", 
      location: "Delhi, India",
      lastActive: "3 days ago",
      current: false
    }
  ];

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    activityStatus: false,
    dataCollection: true,
    marketing: false
  });

  const togglePrivacySetting = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
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

  // Enhanced SecurityBox Component
  const SecurityBox = ({ title, description, icon: Icon, onClick }) => (
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
        
        {activeView === SecurityView.MAIN && (
          <div>
            {/* Header */}
            <div className="mb-8 sm:mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-900 rounded-xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    Security & Privacy
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base mt-1">
                    Manage your account security and privacy settings
                  </p>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-red-900 via-red-700 to-red-500 rounded-full w-24" />
            </div>

            {/* Security Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              <SecurityBox
                title="Change Password"
                description="Update your account password for better security"
                icon={Lock}
                onClick={() => setActiveView(SecurityView.PASSWORD)}
              />

              {/* <SecurityBox
                title="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
                icon={Smartphone}
                onClick={() => setActiveView(SecurityView.TWO_FACTOR)}
              />

              <SecurityBox
                title="Login History"
                description="View your recent login activity and locations"
                icon={History}
                onClick={() => setActiveView(SecurityView.LOGIN_HISTORY)}
              />

              <SecurityBox
                title="Device Management"
                description="Manage devices that have access to your account"
                icon={Monitor}
                onClick={() => setActiveView(SecurityView.DEVICE_MANAGEMENT)}
              /> */}

              <SecurityBox
                title="Privacy Settings"
                description="Control your privacy preferences and data usage"
                icon={Settings}
                onClick={() => setActiveView(SecurityView.PRIVACY_SETTINGS)}
              />
            </div>
          </div>
        )}

        {activeView === SecurityView.PASSWORD && (
          <div className="max-w-4xl mx-auto">
            <Breadcrumb 
              items={[
                { label: "Security & Privacy", onClick: () => setActiveView(SecurityView.MAIN) },
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
        )}

        {activeView === SecurityView.TWO_FACTOR && (
          <div className="max-w-4xl mx-auto">
            <Breadcrumb 
              items={[
                { label: "Security & Privacy", onClick: () => setActiveView(SecurityView.MAIN) },
                { label: "Two-Factor Authentication" }
              ]} 
            />

            <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-50 to-red-25 px-6 sm:px-8 py-6 border-b border-red-100">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Two-Factor Authentication
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Add an extra layer of security to your account
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    Two-factor authentication adds an extra layer of security by requiring a second form of verification when signing in.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {/* Email OTP Option */}
                  <div className="border border-gray-200 rounded-lg p-6 hover:border-red-200 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 rounded-lg">
                          <Mail className="w-6 h-6 text-red-900" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Email OTP</h3>
                          <p className="text-sm text-gray-600">Receive verification codes via email</p>
                        </div>
                      </div>
                      <ToggleSwitch
                        id="email-otp"
                        checked={authMethods.emailOTP}
                        onChange={() => toggleAuthMethod("emailOTP")}
                      />
                    </div>
                  </div>

                  {/* Text Message Option */}
                  <div className="border border-gray-200 rounded-lg p-6 hover:border-red-200 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 rounded-lg">
                          <MessageSquare className="w-6 h-6 text-red-900" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">SMS Verification</h3>
                          <p className="text-sm text-gray-600">Receive verification codes via text message</p>
                        </div>
                      </div>
                      <ToggleSwitch
                        id="text-message"
                        checked={authMethods.textMessage}
                        onChange={() => toggleAuthMethod("textMessage")}
                      />
                    </div>
                  </div>
                </div>

                {/* Disable 2FA Section */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-red-600">Disable Two-Factor Authentication</h3>
                      <p className="text-sm text-red-600 mt-1">
                        This will make your account less secure. Only disable if absolutely necessary.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleDisable2FA}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Disable 2FA
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === SecurityView.LOGIN_HISTORY && (
          <div className="max-w-4xl mx-auto">
            <Breadcrumb 
              items={[
                { label: "Security & Privacy", onClick: () => setActiveView(SecurityView.MAIN) },
                { label: "Login History" }
              ]} 
            />

            <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-50 to-red-25 px-6 sm:px-8 py-6 border-b border-red-100">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Login History
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  View your recent login activity and locations
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <div className="space-y-4">
                  {loginHistory.map((login) => (
                    <div key={login.id} className="border border-gray-200 rounded-lg p-6 hover:border-red-200 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${login.status === 'current' ? 'bg-green-100' : 'bg-gray-100'}`}>
                            <Monitor className={`w-6 h-6 ${login.status === 'current' ? 'text-green-600' : 'text-gray-600'}`} />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{login.device}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              <MapPin className="w-4 h-4" />
                              <span>{login.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              <Clock className="w-4 h-4" />
                              <span>{login.time}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {login.status === 'current' ? (
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                              <CheckCircle className="w-4 h-4" />
                              Current Session
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                              <CheckCircle className="w-4 h-4" />
                              Successful
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === SecurityView.DEVICE_MANAGEMENT && (
          <div className="max-w-4xl mx-auto">
            <Breadcrumb 
              items={[
                { label: "Security & Privacy", onClick: () => setActiveView(SecurityView.MAIN) },
                { label: "Device Management" }
              ]} 
            />

            <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-50 to-red-25 px-6 sm:px-8 py-6 border-b border-red-100">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Device Management
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Manage devices that have access to your account
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <div className="space-y-4">
                  {devices.map((device) => (
                    <div key={device.id} className="border border-gray-200 rounded-lg p-6 hover:border-red-200 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${device.current ? 'bg-green-100' : 'bg-gray-100'}`}>
                            <Monitor className={`w-6 h-6 ${device.current ? 'text-green-600' : 'text-gray-600'}`} />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{device.name}</h3>
                            <p className="text-sm text-gray-600">{device.type}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              <MapPin className="w-4 h-4" />
                              <span>{device.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              <Clock className="w-4 h-4" />
                              <span>{device.lastActive}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {device.current ? (
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                              <CheckCircle className="w-4 h-4" />
                              Current Device
                            </span>
                          ) : (
                            <button className="flex items-center gap-2 px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm">
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === SecurityView.PRIVACY_SETTINGS && (
          <div className="max-w-4xl mx-auto">
            <Breadcrumb 
              items={[
                { label: "Security & Privacy", onClick: () => setActiveView(SecurityView.MAIN) },
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
        )}
      </div>
    </div>
  );
};

export default SecurityPrivacy;