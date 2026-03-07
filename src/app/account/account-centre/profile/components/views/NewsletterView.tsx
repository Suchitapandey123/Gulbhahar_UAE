// @ts-nocheck
import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import Breadcrumb from "../Profile/Breadcrumb";
import ToggleSwitch from "../Profile/ToggleSwitch";


const NewsletterView = ({ onNavigate, ProfileView }) => {
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

  return (
    <div className="max-w-4xl mx-auto">
      <Breadcrumb 
        items={[
          { label: "Profile", onClick: () => onNavigate(ProfileView.MAIN) },
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
  );
};

export default NewsletterView;


