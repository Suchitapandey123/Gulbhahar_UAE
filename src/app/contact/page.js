import React from "react";
import ContactPage from "./Component/contact";

export async function generateMetadata() {
  return {
    title: "Contact Us - Gulbhahar Jutti Customer Support & Inquiries",
    description:
      "Get in touch with Gulbhahar customer support for jutti inquiries, sizing help, or order assistance. Multiple contact options for quick resolution of your queries.",
    alternates: {
      canonical: "https://www.gulbhahar.com/contact",
    },
    openGraph: {
      title: "Contact Us - Gulbhahar Jutti Customer Support & Inquiries",
      description:
        "Get in touch with Gulbhahar customer support for jutti inquiries, sizing help, or order assistance. Multiple contact options for quick resolution of your queries.",
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/contact",
      siteName: "Gulbhahar",
    },
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
