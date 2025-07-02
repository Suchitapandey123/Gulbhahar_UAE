import React from "react";
import OrderHistory from "./components/OrderHistory";

export const metadata={
  title:" My Orders - Gulbhahar",
  description:" Track and manage your previous and future orders of handcrafted mirrorwork juttis from your Gulbhahar account."
}
export default function MyOrderPage() {
  return <OrderHistory />;
}
