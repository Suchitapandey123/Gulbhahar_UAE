import type { Metadata } from "next";
import WhatsAppCommunityClient from "./WhatsAppCommunityClient";

export const metadata: Metadata = {
  title: "Join Gulbhahar WhatsApp Community – Exclusive Offers & New Arrivals",
  description:
    "Join the Gulbhahar WhatsApp community for exclusive deals, new collection alerts, styling tips and early access to sales.",
  robots: { index: true, follow: true },
};

export default function WhatsAppCommunityPage() {
  return <WhatsAppCommunityClient />;
}
