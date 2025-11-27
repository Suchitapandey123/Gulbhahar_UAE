import { User, MapPin, Mail, Bell } from "lucide-react";
import ProfileHeader from "../Profile/ProfileHeader";
import ProfileBox from "../Profile/ProfileBox";

const MainView = ({ formData, onNavigate, ProfileView }) => {
  return (
    <div>
      <ProfileHeader formData={formData} />

      {/* Profile Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        <ProfileBox
          title="Personal Information"
          description="Edit and update your personal details, contact information"
          icon={User}
          onClick={() => onNavigate(ProfileView.PERSONAL_INFO)}
        />
        
        <ProfileBox
          title="Address Book"
          description="Manage your delivery addresses, set default locations"
          icon={MapPin}
          onClick={() => onNavigate(ProfileView.ADDRESS_BOOK)}
        />
        
        <ProfileBox
          title="Newsletter Subscription"
          description="Control your email and WhatsApp newsletter preferences"
          icon={Mail}
          onClick={() => onNavigate(ProfileView.NEWSLETTER)}
        />
        
        <ProfileBox
          title="Notifications"
          description="Configure SMS, email, and WhatsApp notification settings"
          icon={Bell}
          onClick={() => onNavigate(ProfileView.NOTIFICATIONS)}
        />
      </div>
    </div>
  );
};

export default MainView;