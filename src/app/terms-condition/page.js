import React from "react";
import Terms from "@/app/terms-condition/Component/Terms";

export async function generateMetadata() {
  return {
    title: "Terms of Use - Gulbhahar Jutti Website Conditions",
    description:
      "Familiarise yourself with Gulbhahar’s terms and conditions for using our website, purchasing handcrafted mirrorwork juttis, and engaging in our service offerings.",
    alternates: {
      canonical: "https://www.gulbhahar.com/terms-condition",
    },
    openGraph: {
      title: "Terms of Use – Gulbhahar",
      description:
        "Familiarise yourself with Gulbhahar’s terms and conditions for using our website, purchasing handcrafted mirrorwork juttis, and engaging in our service offerings.",
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/terms-condition",
      siteName: "Gulbhahar",
    },
  };
}

const page = () => {
  return (
    <div>
      <Terms />
    </div>
  );
};

export default page;
