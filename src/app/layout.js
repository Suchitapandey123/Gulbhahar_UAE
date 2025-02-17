import { Geist, Geist_Mono } from "next/font/google";
import { Old_Standard_TT } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import Breadcrumb from "@/components/Breadcrumb";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oldStandardTT = Old_Standard_TT({
  variable: "--font-old-standard-tt",
  subsets: ["latin"],
  weight: ["400", "700"], 
});

export const metadata = {
  title: "Gulbhahar",
  description: "Handcrafted juttis by Gulbhahar, where tradition meets modern elegance. Each pair is meticulously designed. Explore our collection today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/gulbhahar_logo.png" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oldStandardTT.variable} antialiased`} suppressHydrationWarning="true"
      >
        <Navbar />
        {children}
        <MainFooter/>
      </body>
    </html>
  );
}
