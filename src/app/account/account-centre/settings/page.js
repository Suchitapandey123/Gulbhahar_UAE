
import React from 'react'
import Setting from './Setting';


export async function generateMetadata() {
  return {
    title:"Account Settings - Manage Your Gulbhahar Jutti Preferences",
    description:"Customize your Gulbhahar account preferences, notifications, and privacy settings. Control your shopping experience and communication preferences easily.",
    alternates: {
      canonical: "https://gulbhahar.com/account/account-centre/settings",
    },
    openGraph: {
      title:"Account Settings - Manage Your Gulbhahar Jutti Preferences",
      description:"Customize your Gulbhahar account preferences, notifications, and privacy settings. Control your shopping experience and communication preferences easily.",
      type: "website",
      locale: "en_US",
      url: "https://gulbhahar.com/account/account-centre/settings",
      siteName: "Gulbhahar",
    },
  };
}


export default function SettingPage() {
    return <Setting />;
  }