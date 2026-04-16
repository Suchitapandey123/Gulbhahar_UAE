import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pre-Order Exclusive Designs | Gulbhahar Official Store",
  description: "Reserve your exclusive Gulbhahar piece before it sells out.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PreOrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
