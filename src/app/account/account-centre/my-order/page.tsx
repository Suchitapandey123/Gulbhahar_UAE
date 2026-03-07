import React from "react";
import OrderHistory from "./components/OrderHistory";

export async function generateMetadata() {
  return {
    title: "My Orders - Track Your Gulbhahar Purchase History",
    description:
      "Track your Gulbhahar jutti orders, view purchase history, and manage deliveries. Stay updated on your orders with real-time status.",
    keywords: ["My Orders"],
    alternates: {
      canonical: "https://www.gulbhahar.com/account/account-centre/my-order",
    },
    openGraph: {
      title: "My Orders - Track Your Gulbhahar Purchase History",
      description:
        "Track your Gulbhahar jutti orders, view purchase history, and manage deliveries. Stay updated on your orders with real-time status.",
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/account/account-centre/my-order",
      siteName: "Gulbhahar",
    },
  };
}

export default function MyOrderPage() {
  return <OrderHistory />;
}
