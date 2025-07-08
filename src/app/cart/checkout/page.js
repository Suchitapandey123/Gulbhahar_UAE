import React from "react";
import CheckoutComponent from "./components/Checkout";


export async function generateMetadata() {
  return {
    title: "Checkout - Complete Your Gulbhahar Jutti Purchase - Securely",
    description:
      "Complete your Gulbhahar jutti purchase securely. Fast checkout process with multiple payment options and trusted delivery. Finish your order in just a few clicks.",
    alternates: {
      canonical: "https://gulbhahar.com/cart/checkout",
    },
    openGraph: {
      title: "Checkout - Complete Your Gulbhahar Jutti Purchase - Securely",
    description:
      "Complete your Gulbhahar jutti purchase securely. Fast checkout process with multiple payment options and trusted delivery. Finish your order in just a few clicks.",
      type: "website",
      locale: "en_US",
      url: "https://gulbhahar.com/cart/checkout",
      siteName: "Gulbhahar",
    },
  };
}
const page = () => {
  return <CheckoutComponent />;
};

export default page;
