import React from "react";
import { OrderHistoryDetails } from "../components/OrderHistoryDetails";


export default function OrderHistoryDetailsPage() {
  return <OrderHistoryDetails onOrderClick={() => console.log("Order clicked")} />;
}
