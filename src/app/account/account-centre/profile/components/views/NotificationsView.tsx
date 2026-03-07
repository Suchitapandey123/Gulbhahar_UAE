// @ts-nocheck
import { useState } from "react";
import { Mail, Phone, Bell } from "lucide-react";
import Breadcrumb from "../Profile/Breadcrumb";
import ToggleSwitch from "../Profile/ToggleSwitch";

const NotificationsView = ({ onNavigate, ProfileView }) => {
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

  return (
    <div className="max-w-4xl mx-auto">
      <Breadcrumb 
        items={[
          { label: "Profile", onClick: () => onNavigate(ProfileView.MAIN) },
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
  );
};

export default NotificationsView;