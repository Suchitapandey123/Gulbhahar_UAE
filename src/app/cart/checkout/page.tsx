import React from "react";
import CheckoutComponent from "./components/Checkout";
import MetaCheckoutComponent from "./components/MetaCheckout";

export async function generateMetadata() {
  return {
    title: "Checkout - Complete Your Gulbhahar Purchase - Securely",
    description:
      "Complete your Gulbhahar purchase securely. Fast checkout process with multiple payment options available.",
    keywords: ["checkout", "gulbhahar checkout", "gulbhahar checkout page"],
    alternates: {
      canonical: "https://www.gulbhahar.com/cart/checkout",
    },
    openGraph: {
      title: "Checkout - Complete Your Gulbhahar Purchase - Securely",
      description:
        "Complete your Gulbhahar purchase securely. Fast checkout process with multiple payment options available.",
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/cart/checkout",
      siteName: "Gulbhahar",
    },
  };
}

type PageProps = {
  searchParams: Promise<{ products?: string; source?: string }>;
};

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const productsParam = params?.products;
  const source = params?.source || "direct";

  if (productsParam) {
    return <MetaCheckoutComponent productsParam={productsParam} source={source} />;
  }

  return <CheckoutComponent />;
};

export default page;
