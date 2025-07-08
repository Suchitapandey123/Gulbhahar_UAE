import React from "react";
import CookiePolicy from "@/app/cookies-policy/Component/CookiePolicy";

export async function generateMetadata() {
  return {
    title: "Cookie Policy - Gulbhahar Jutti Website Privacy",
    description:
      "Learn how Gulbhahar uses cookies to enhance your jutti shopping experience. Understand our data collection practices and privacy protection measures.",
    alternates: {
      canonical: "https://www.gulbhahar.com/cookies-policy",
    },
    openGraph: {
      title: "Cookie Policy - Gulbhahar Jutti Website Privacy",
      description:
        "Learn more about cookies and how Gulbhahar uses cookies to elevate the user experience on our website and personalise your journey.",
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/cookies-policy",
      siteName: "Gulbhahar",
    },
  };
}
const page = () => {
  return (
    <div>
      <CookiePolicy />
    </div>
  );
};

export default page;
