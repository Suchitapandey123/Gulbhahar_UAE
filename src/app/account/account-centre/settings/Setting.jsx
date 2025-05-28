"use client"
import { 
    Settings, 
    MapPin, 
    Mail, 
    Bell, 
    ChevronRight,
    User,
    Shield,
    Palette,
    Globe,
    HelpCircle,
    LogOut
  } from "lucide-react";
  
  const Setting = () => {
    // Enhanced SettingBox Component
    const SettingBox = ({ title, description, icon: Icon, onClick, variant = "default" }) => (
      <div
        className={`group bg-white border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
          variant === "danger" 
            ? "border-red-200 hover:border-red-400 hover:bg-red-50/30" 
            : "border-red-100 hover:border-red-300 hover:bg-red-50/30"
        }`}
        onClick={onClick}
      >
        <div className="flex items-center justify-between mb-3">
          <div className={`p-3 rounded-xl transition-colors ${
            variant === "danger" 
              ? "bg-red-100 group-hover:bg-red-200" 
              : "bg-red-100 group-hover:bg-red-200"
          }`}>
            <Icon className={`w-6 h-6 ${
              variant === "danger" ? "text-red-700" : "text-red-900"
            }`} />
          </div>
          <ChevronRight className={`w-5 h-5 transition-colors ${
            variant === "danger" 
              ? "text-red-400 group-hover:text-red-600" 
              : "text-gray-400 group-hover:text-red-600"
          }`} />
        </div>
        <div className="space-y-2">
          <h3 className={`font-semibold text-lg transition-colors ${
            variant === "danger"
              ? "text-gray-900 group-hover:text-red-700"
              : "text-gray-900 group-hover:text-red-900"
          }`}>
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    );
  
    const handleSettingClick = (settingName) => {
      console.log(`${settingName} clicked`);
      // Add navigation logic here
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/40 via-white to-red-50/20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-900 rounded-xl">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  Settings
                </h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1">
                  Manage your account preferences and configuration
                </p>
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-red-900 via-red-700 to-red-500 rounded-full w-24" />
          </div>
  
          {/* Settings Grid */}
          <div className="space-y-8">
            
            {/* Account Settings Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-red-900" />
                Account Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                <SettingBox
                  title="Address Book"
                  description="Manage your delivery addresses and set default locations"
                  icon={MapPin}
                  onClick={() => handleSettingClick("Address Book")}
                />
                
                <SettingBox
                  title="Newsletter Subscription"
                  description="Control your email and WhatsApp newsletter preferences"
                  icon={Mail}
                  onClick={() => handleSettingClick("Newsletter Subscription")}
                />
                
                <SettingBox
                  title="Notifications"
                  description="Configure SMS, email, and WhatsApp notification settings"
                  icon={Bell}
                  onClick={() => handleSettingClick("Notifications")}
                />
              </div>
            </div>
  
            {/* Security & Privacy Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-900" />
                Security & Privacy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                <SettingBox
                  title="Security Settings"
                  description="Manage password, two-factor authentication, and login security"
                  icon={Shield}
                  onClick={() => handleSettingClick("Security Settings")}
                />
                
                <SettingBox
                  title="Privacy Controls"
                  description="Control your privacy preferences and data sharing settings"
                  icon={User}
                  onClick={() => handleSettingClick("Privacy Controls")}
                />
              </div>
            </div>
  
            {/* Appearance & Language Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Palette className="w-5 h-5 text-red-900" />
                Appearance & Language
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                <SettingBox
                  title="Theme & Display"
                  description="Customize the look and feel of your interface"
                  icon={Palette}
                  onClick={() => handleSettingClick("Theme & Display")}
                />
                
                <SettingBox
                  title="Language & Region"
                  description="Set your preferred language and regional settings"
                  icon={Globe}
                  onClick={() => handleSettingClick("Language & Region")}
                />
              </div>
            </div>
  
            {/* Support & Account Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-red-900" />
                Support & Account
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                <SettingBox
                  title="Help & Support"
                  description="Get help, contact support, and access documentation"
                  icon={HelpCircle}
                  onClick={() => handleSettingClick("Help & Support")}
                />
                
                <SettingBox
                  title="Account Management"
                  description="Export data, delete account, and manage subscriptions"
                  icon={User}
                  onClick={() => handleSettingClick("Account Management")}
                />
                
                <SettingBox
                  title="Sign Out"
                  description="Sign out of your account on this device"
                  icon={LogOut}
                  onClick={() => handleSettingClick("Sign Out")}
                  variant="danger"
                />
              </div>
            </div>
          </div>
  
          {/* Quick Actions Footer */}
          <div className="mt-12 pt-8 border-t border-red-100">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Need Help?</h3>
                  <p className="text-sm text-gray-600">
                    Contact our support team or check our documentation for assistance.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                    Documentation
                  </button>
                  <button className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors text-sm font-medium">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Setting;