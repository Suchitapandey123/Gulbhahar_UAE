import React from "react";
import MetaCheckoutComponent from "@/app/cart/checkout/components/MetaCheckout";

export async function generateMetadata() {
  return {
    title: "Checkout - Complete Your Gulbhahar Purchase - Securely",
    description:
      "Complete your Gulbhahar purchase securely. Fast checkout process with multiple payment options available.",
    robots: { index: false, follow: false },
  };
}

type PageProps = {
  searchParams: Promise<{ products?: string }>;
};

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const productsParam = params?.products || "";

  return <MetaCheckoutComponent productsParam={productsParam} source="meta" />;
};

export default page;
