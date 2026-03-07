// @ts-nocheck
// "use client";

// import profileAPI from "@/services/profile/profileService";
// import { useEffect, useState } from "react";
// import MainView from "../views/MainView";
// import PersonalInfoView from "../views/PersonalInfoView";
// import NewsletterView from "../views/NewsletterView";
// import NotificationsView from "../views/NotificationsView";
// import AddressBookView from "../views/AddressBookView";
// import { toast } from "sonner";


// const ProfileView = {
//   MAIN: "main",
//   PERSONAL_INFO: "personal_info",
//   ADDRESS_BOOK: "address_book",
//   NEWSLETTER: "newsletter",
//   NOTIFICATIONS: "notifications"
// };

// const Profile = () => {
//   const [activeView, setActiveView] = useState(ProfileView.MAIN);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [user, setUser] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);

//   // Personal info form state - will be populated from API
//   const [formData, setFormData] = useState({
//     userId :"",
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     location: "",
//     imageUrl: "",
//     contentType : ""
//   });

//   // Fetch user data from API
//   const fetchUserProfile = async () => {
//     try {
//       setLoading(true);
//       const data = await profileAPI.getUserProfile();
      
//       if (data.user) {
//         const userData = data.user;
//         setUser(userData);
        
//         // Populate form data
//         setFormData({
//           userId : userData.userId || "",
//           firstName: userData.firstName || "",
//           lastName: userData.lastName || "",
//           email: userData.email || "",
//           phoneNumber: userData.phoneNumber || "",
//           location: userData.location || "",
//           imageUrl: userData.imageUrl || ""
//         });
//       }
//     } catch (error) {
//       console.error('🚨 Error fetching user profile:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load user data on component mount
//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   // Cleanup blob URLs on unmount
//   useEffect(() => {
//     return () => {
//       if (formData.imageUrl && formData.imageUrl.startsWith('blob:')) {
//         URL.revokeObjectURL(formData.imageUrl);
//       }
//     };
//   }, [formData.imageUrl]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

// const handleImageChange = (file) => {
//   if (!file || !file.type.startsWith('image/')) return;
  
//   if (formData.imageUrl?.startsWith('blob:')) {
//     URL.revokeObjectURL(formData.imageUrl);
//   }
  
//   const blobUrl = URL.createObjectURL(file);
//   setSelectedFile(file); // Store the actual file
  
//   setFormData(prev => ({
//     ...prev,
//     imageUrl: blobUrl,
//     contentType : file.type
//   }));
// };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setSaving(true);
 
  
//   try {
//     const res = await profileAPI.updateUserProfile(formData);
//     if(res.status === 200 && !res.uploadUrl) {
//       // Upload image to S3 using the pre-signed URL
//       toast.success("User Details Updated Successfully")
//     }
    
//     if(res.status === 200 && selectedFile && res.uploadUrl) {
//       // Upload image to S3 using the pre-signed URL
//       const res_2 = await fetch(res.uploadUrl, {
//         method: 'PUT',
//         body: selectedFile,
//         headers: {
//           'Content-Type': selectedFile.type
//         }
//       });
//       toast.success("User Details and Profile Updated Successfully")
//     }
//   } catch (error) {
//     console.error("Error:", error.message);
//     // toast.error("Supported formats: PNG, JPEG, JPG, WebP");
//     toast.error(error.message)
//   } finally {
//     setSaving(false);
//   }
// };
//   // Loading component
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-red-50/40 via-white to-red-50/20">
//         <div className="max-w-[1600px] mx-auto px-0 sm:px-6 lg:px-8 py-6 sm:py-8">
//           <div className="flex items-center justify-center min-h-[400px]">
//             <div className="text-center">
//               <div className="w-12 h-12 border-4 border-red-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading profile...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50/40 via-white to-red-50/20">
//       <div className="max-w-[1600px] mx-auto px-0 sm:px-6 lg:px-8 py-6 sm:py-8">
        
//         {activeView === ProfileView.MAIN && (
//           <MainView 
//             formData={formData}
//             onNavigate={setActiveView}
//             ProfileView={ProfileView}
//           />
//         )}

//         {activeView === ProfileView.PERSONAL_INFO && (
//           <PersonalInfoView
//             formData={formData}
//             user={user}
//             saving={saving}
//             onNavigate={setActiveView}
//             onSubmit={handleSubmit}
//             onChange={handleChange}
//             onImageChange={handleImageChange}
//             ProfileView={ProfileView}
//           />
//         )} 

//         {activeView === ProfileView.ADDRESS_BOOK && (
//           <AddressBookView
//             onNavigate={setActiveView}
//             ProfileView={ProfileView}
//           />
//         )}

//         {/* {activeView === ProfileView.NEWSLETTER && (
//           <NewsletterView
//             onNavigate={setActiveView}
//             ProfileView={ProfileView}
//           />
//         )} */}

//         {/* {activeView === ProfileView.NOTIFICATIONS && (
//           <NotificationsView
//             onNavigate={setActiveView}
//             ProfileView={ProfileView}
//           />
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default Profile;


"use client";

import profileAPI from "@/services/profile/profileService";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/ContextProviders/AuthContext";

import MainView from "../views/MainView";
import PersonalInfoView from "../views/PersonalInfoView";
import AddressBookView from "../views/AddressBookView";
import { toast } from "sonner";

const ProfileView = {
  MAIN: "main",
  PERSONAL_INFO: "personal_info",
  ADDRESS_BOOK: "address_book",
  NEWSLETTER: "newsletter",
  NOTIFICATIONS: "notifications"
};

const Profile = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { updateUserData } = useAuth();

  const [activeView, setActiveView] = useState(ProfileView.MAIN);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    userId :"",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    imageUrl: "",
    contentType: ""
  });

  /** ----------------------------------------------------------
   * 🔥 Load "view" from query params on refresh
   ----------------------------------------------------------- */
  useEffect(() => {
    const urlView = params.get("view");
    if (urlView && Object.values(ProfileView).includes(urlView)) {
      setActiveView(urlView);
    }
  }, [params]);

  /** ----------------------------------------------------------
   * 🔥 Helper to update view + update URL query param
   ----------------------------------------------------------- */
  const changeView = (view) => {
    setActiveView(view);

    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("view", view);

    router.replace(newUrl.toString(), { scroll: false });
  };

  /** ----------------------------------------------------------
   * 🔥 Fetch User Profile
   ----------------------------------------------------------- */
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const data = await profileAPI.getUserProfile();
      
      if (data.user) {
        const userData = data.user;
        setUser(userData);

        setFormData({
          userId: userData.userId || "",
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
          location: userData.location || "",
          imageUrl: userData.imageUrl || "",
          contentType: ""
        });
      }
    } catch (error) {
      console.error('🚨 Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    return () => {
      if (formData.imageUrl && formData.imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(formData.imageUrl);
      }
    };
  }, [formData.imageUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    if (formData.imageUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(formData.imageUrl);
    }

    const blobUrl = URL.createObjectURL(file);
    setSelectedFile(file);

    setFormData(prev => ({
      ...prev,
      imageUrl: blobUrl,
      contentType: file.type
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await profileAPI.updateUserProfile(formData);

      if (res.status === 200 && !res.uploadUrl) {
        toast.success("User Details Updated Successfully");
        // Clear selected file
        setSelectedFile(null);

        // Re-fetch profile to get updated data from server
        const updatedProfile = await profileAPI.getUserProfile();

        if (updatedProfile.user) {
          const userData = updatedProfile.user;

          // Update local state
          setUser(userData);
          setFormData({
            userId: userData.userId || "",
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            phoneNumber: userData.phoneNumber || "",
            location: userData.location || "",
            imageUrl: userData.imageUrl || "",
            contentType: ""
          });

          // Update AuthContext to sync header/navbar immediately
          updateUserData({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            location: userData.location,
            imageUrl: userData.imageUrl,
            userId: userData.userId,
            name: `${userData.firstName || ""} ${userData.lastName || ""}`.trim()
          });
        }

        // Navigate back to main view
        changeView(ProfileView.MAIN);
      }

      if (res.status === 200 && selectedFile && res.uploadUrl) {
        // Upload image to S3
        await fetch(res.uploadUrl, {
          method: "PUT",
          body: selectedFile,
          headers: {
            "Content-Type": selectedFile.type
          }
        });

        toast.success("User Details and Profile Updated Successfully");
        // Clear selected file and blob URL
        setSelectedFile(null);

        // Re-fetch profile to get the real S3 URL from server
        const updatedProfile = await profileAPI.getUserProfile();

        if (updatedProfile.user) {
          const userData = updatedProfile.user;

          // Update local state with real S3 URL
          setUser(userData);
          setFormData({
            userId: userData.userId || "",
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            phoneNumber: userData.phoneNumber || "",
            location: userData.location || "",
            imageUrl: userData.imageUrl || "", // Real S3 URL from server
            contentType: ""
          });

          updateUserData({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            location: userData.location,
            imageUrl: userData.imageUrl, // Real S3 URL
            userId: userData.userId,
            name: `${userData.firstName || ""} ${userData.lastName || ""}`.trim()
          });
        }

        // Navigate back to main view
        changeView(ProfileView.MAIN);
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  /** ----------------------------------------------------------
   * 🔥 Loading State
   ----------------------------------------------------------- */
  if (loading) {
    return (
      <div className=" bg-gradient-to-br from-red-50/40 via-white to-red-50/20">
        <div className="max-w-[1600px] mx-auto px-0 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-center ">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-red-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /** ----------------------------------------------------------
   * 🔥 Render
   ----------------------------------------------------------- */
  return (
    <div className=" bg-gradient-to-br from-red-50/40 via-white to-red-50/20">
      <div className="max-w-[1600px] mx-auto px-0 sm:px-6 lg:px-8 py-6 sm:py-8">

        {activeView === ProfileView.MAIN && (
          <MainView 
            formData={formData}
            onNavigate={changeView}
            ProfileView={ProfileView}
          />
        )}

        {activeView === ProfileView.PERSONAL_INFO && (
          <PersonalInfoView
            formData={formData}
            user={user}
            saving={saving}
            onNavigate={changeView}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onImageChange={handleImageChange}
            ProfileView={ProfileView}
          />
        )}

        {activeView === ProfileView.ADDRESS_BOOK && (
          <AddressBookView
            onNavigate={changeView}
            ProfileView={ProfileView}
          />
        )}

        {/* If needed you can enable these later with query params */}
        {/* {activeView === ProfileView.NEWSLETTER && (
          <NewsletterView onNavigate={changeView} ProfileView={ProfileView} />
        )}

        {activeView === ProfileView.NOTIFICATIONS && (
          <NotificationsView onNavigate={changeView} ProfileView={ProfileView} />
        )} */}
      </div>
    </div>
  );
};

export default Profile;

