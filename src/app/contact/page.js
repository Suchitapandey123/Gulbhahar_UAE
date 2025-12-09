import React from "react";
import ContactPage from "./Component/contact";

export async function generateMetadata() {
  return {
    title: "Contact | Gulbhahar - Customer Support & Inquiries",
    description:
      "Get in touch with Gulbhahar for premium handcrafted juttis and accessories. Our customer support team is here to assist you with inquiries, orders, and business collaborations. Drop us a message today!",
   
      keywords: ["gulbhahar contact", "gulbhahar customer support", "handcrafted jutti inquiries", "designer jutti customer service", "gulbhahar email support", "gulbhahar phone number", "jutti store india support", "premium footwear inquiries", "gulbhahar company address", "gulbhahar message form"],

      alternates: {
      canonical: "https://www.gulbhahar.com/contact",
    },
    // openGraph: {
    //  title: "Contact | Gulbhahar - Customer Support & Inquiries",
    //  description:
    //   "Get in touch with Gulbhahar for premium handcrafted juttis and accessories. Our customer support team is here to assist you with inquiries, orders, and business collaborations. Drop us a message today!",
   
    //     type: "website",
    //   locale: "en_US",
    //   url: "https://www.gulbhahar.com/contact",
    //   siteName: "Gulbhahar",
    // },
  };
}

const page = () => {
  return (
    <div>
      <ContactPage />
    </div>
  );
};

export default page;
