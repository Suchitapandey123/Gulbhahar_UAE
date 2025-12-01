"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../Providers/ContextProviders/AuthContext";
import {
  Youtube,
  Twitter,
  Instagram,
  Facebook,
  Heart,
  Shield,
  Truck,
  CreditCard,
  Star,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

import { newsletterAPI } from "../../app/api/newsletterApi/newsletterApi";
import { toast } from "sonner";
// Mock social media icons
const FooterYouTube = ({ className }) => <Youtube className={className} />;
const FooterTwitterX = ({ className }) => <Twitter className={className} />;
const FooterInstagram = ({ className }) => <Instagram className={className} />;

// Mock payment icons
const Mastercard = ({ className }) => (
  <svg
    width="84"
    height="58"
    viewBox="0 0 84 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="0.5"
      y="0.5"
      width="83"
      height="57"
      rx="3.5"
      fill="white"
      stroke="#F3F3F3"
    />
    <circle cx="32" cy="29" r="12" fill="#EB001B" />
    <circle cx="52" cy="29" r="12" fill="#F79E1B" />
    <path
      d="M42 17 C47.5 17 52 21.5 52 29 C52 36.5 47.5 41 42 41 C47.5 41 52 36.5 52 29 C52 21.5 47.5 17 42 17 Z"
      fill="#FF5F00"
    />
    <text
      x="42"
      y="50"
      textAnchor="middle"
      fontFamily="Arial, sans-serif"
      fontSize="8"
      fontWeight="500"
      fill="#000"
    >
      mastercard
    </text>
  </svg>
);

const Visa = ({ className }) => (
  <svg
    width="84"
    height="58"
    viewBox="0 0 84 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="0.5"
      y="0.5"
      width="83"
      height="57"
      rx="3.5"
      fill="white"
      stroke="#F3F3F3"
    />
    <path
      d="M37.2957 39.7782H31.7032L35.2011 19.4772H40.7933L37.2957 39.7782Z"
      fill="#15195A"
    />
    <path
      d="M57.5686 19.9735C56.4655 19.5627 54.7159 19.1092 52.5525 19.1092C47.0298 19.1092 43.1407 21.8734 43.1168 25.8255C43.0709 28.7413 45.9013 30.3608 48.0182 31.333C50.1818 32.3265 50.9173 32.9749 50.9173 33.8605C50.8953 35.2205 49.169 35.8474 47.5588 35.8474C45.3261 35.8474 44.1297 35.5242 42.3116 34.7675L41.5752 34.4432L40.7926 39.0003C42.1043 39.5612 44.5208 40.0589 47.0298 40.0808C52.8978 40.0808 56.7181 37.3593 56.7633 33.1477C56.7857 30.8367 55.2911 29.066 52.069 27.619C50.113 26.6901 48.9151 26.0637 48.9151 25.1133C48.9381 24.2493 49.9283 23.3644 52.1363 23.3644C53.9544 23.321 55.2902 23.7312 56.3022 24.1417L56.808 24.3573L57.5686 19.9735Z"
      fill="#15195A"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M67.5793 19.4772H71.9051L76.4168 39.7779H71.2387C71.2387 39.7779 70.732 37.4454 70.5714 36.7326H63.3911C63.1835 37.2723 62.2174 39.7779 62.2174 39.7779H56.3494L64.6563 21.1616C65.2319 19.844 66.2453 19.4772 67.5793 19.4772ZM67.2348 26.9062C67.2348 26.9062 65.4625 31.42 65.002 32.5863H69.6504C69.4204 31.5713 68.3614 26.7119 68.3614 26.7119L67.9706 24.9626C67.806 25.4131 67.568 26.0324 67.4074 26.4501C67.2986 26.7332 67.2254 26.9237 67.2348 26.9062Z"
      fill="#15195A"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.47169 19.4772H16.4695C17.6891 19.5199 18.6787 19.8871 19.0007 21.1837L20.956 30.5102C20.9563 30.5111 20.9566 30.512 20.9568 30.5129L21.5553 33.3205L27.0322 19.4772H32.9458L24.1554 39.7567H18.2415L13.2569 22.1169C11.5371 21.1732 9.57422 20.4141 7.37964 19.8874L7.47169 19.4772Z"
      fill="#15195A"
    />
  </svg>
);

const UPI = ({ className }) => (
  <svg
    width="84"
    height="58"
    viewBox="0 0 84 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Card background with border */}
    <rect
      x="0.5"
      y="0.5"
      width="83"
      height="57"
      rx="3.5"
      fill="white"
      stroke="#F3F3F3"
    />

    {/* UPI Logo - scaled and positioned */}
    <g transform="translate(16, 14) scale(0.42)">
      <path
        d="M111.45,19.26l-5.17,4.81l-0.17-0.13c0.59-2.19,1.18-4.39,1.78-6.58c1.5-5.45,3-10.89,4.51-16.34 c0-0.02,0-0.04,0-0.05c0-0.27,0.14-0.52,0.38-0.65c0.36-0.06,0.35,0.35,0.48,0.58c0.77,1.42,1.35,2.93,2.25,4.28 c0.85,2.06,1.84,4.11,2.91,6.06c0.13,0.2,0.21,0.43,0.21,0.67c0,0.41-0.21,0.8-0.56,1.02C115.82,15.02,113.64,17.15,111.45,19.26 L111.45,19.26z"
        fill="#F07A25"
      />
      <path
        d="M111.45,19.26c2.2-2.11,4.38-4.24,6.61-6.32c0.35-0.22,0.56-0.61,0.56-1.02c0-0.24-0.07-0.48-0.21-0.67 c-1.08-1.95-2.06-4-2.91-6.06l1.54-5.17c0.64,1.23,1.17,2.24,1.68,3.26c1.29,2.57,2.55,5.16,3.89,7.71 c0.18,0.25,0.27,0.55,0.27,0.86c0,0.51-0.26,0.99-0.7,1.26c-3.66,3.39-7.25,6.86-10.86,10.3c-0.23,0.3-0.54,0.53-0.9,0.65 C110.88,22.49,111.23,20.88,111.45,19.26L111.45,19.26L111.45,19.26z"
        fill="#0C8D48"
      />
      <path
        d="M30.37,12.17c0.76,0.35,1.25,1.11,1.25,1.94c0,0.34-0.08,0.68-0.24,0.98c-0.6,1.95-1.09,3.92-1.63,5.89 c-0.15,1.86-1.71,3.29-3.57,3.29c-0.21,0-0.42-0.02-0.63-0.06c-8.27,0-16.53,0.01-24.8,0.02c-0.65,0-0.89-0.06-0.68-0.79 C2.2,15.9,4.3,8.35,6.39,0.8C6.44,0.35,6.82,0,7.27,0c0.04,0,0.09,0,0.13,0.01c8.51,0.02,17.03,0.01,25.54,0.03 C33.06,0.02,33.18,0,33.3,0c0.95,0,1.71,0.77,1.71,1.71c0,0.24-0.05,0.47-0.15,0.69c-0.64,2.52-1.34,5.02-2.07,7.52 C32.4,11.02,31.5,11.86,30.37,12.17L30.37,12.17z M85.39,59.94h-4.84l6.72-24.26h4.83L85.39,59.94L85.39,59.94z M45.21,58.42 c-0.26,0.96-1.15,1.63-2.14,1.63H18.15c-0.68,0-1.19-0.23-1.52-0.69c-0.33-0.46-0.41-1.04-0.21-1.72l6.08-21.9l4.84,0l-5.43,19.56 h19.34l5.43-19.56l4.83,0L45.21,58.42L45.21,58.42L45.21,58.42z M82.88,36.44c-0.33-0.46-0.85-0.69-1.55-0.69l-26.57,0l-1.31,4.76 h24.17l-1.41,5.08H56.87v-0.01h-4.83l-4.01,14.48h4.83l2.69-9.71h21.73c0.68,0,1.32-0.23,1.92-0.69s0.99-1.04,1.18-1.72l2.69-9.71 C83.27,37.49,83.21,36.9,82.88,36.44L82.88,36.44L82.88,36.44z M50.48,9.77c2.78,0,5.56-0.05,8.34,0.03 C58.88,9.8,58.94,9.81,59,9.81c0.7,0,1.27-0.54,1.32-1.23c0.65-2.48,1.35-4.95,1.96-7.44C62.3,0.5,62.82,0,63.45,0 c0.09,0,0.17,0.01,0.26,0.03c0.46,0.03,0.92,0.05,1.39,0.05c0.45,0,0.91-0.02,1.36-0.05c0.74-0.04,0.91,0.18,0.7,0.91 c-1.05,3.72-2.05,7.46-3.07,11.18c-0.98,3.59-1.98,7.18-2.93,10.78c-0.02,0.75-0.63,1.35-1.38,1.35c-0.11,0-0.22-0.01-0.33-0.04 c-0.46-0.04-0.92-0.06-1.38-0.06c-0.42,0-0.84,0.02-1.26,0.05c-0.71,0.03-0.82-0.2-0.63-0.86c0.76-2.6,1.44-5.22,2.19-7.82 c0.22-0.76,0.12-1.07-0.78-1.06c-5.66,0.04-11.33,0.04-16.99,0.01c-0.06-0.01-0.12-0.01-0.18-0.01c-0.62,0-1.13,0.48-1.16,1.1 c-0.66,2.62-1.43,5.22-2.12,7.83c-0.04,0.48-0.44,0.84-0.92,0.84c-0.06,0-0.12-0.01-0.18-0.02c-0.48-0.03-0.98-0.04-1.46-0.04 c-0.5,0-1,0.02-1.49,0.05c-1.03,0.07-0.86-0.46-0.68-1.1c1.11-4.03,2.22-8.07,3.32-12.1c0.93-3.39,1.86-6.78,2.77-10.17 c0.03-0.46,0.41-0.82,0.87-0.82c0.04,0,0.09,0,0.13,0.01c1.05,0.05,2.11,0.05,3.16,0c0.73-0.03,0.81,0.24,0.63,0.88 c-0.75,2.67-1.44,5.36-2.21,8.03c-0.21,0.71-0.03,0.85,0.64,0.84C44.64,9.75,47.56,9.77,50.48,9.77L50.48,9.77z M73,0.11 c0.35,0,0.7,0,1.05,0c1.4,0,1.41,0,1.05,1.29c-1.96,7.1-3.92,14.21-5.89,21.31c-0.44,1.59-0.46,1.59-2.09,1.59 c-0.77,0-1.55-0.02-2.32,0.01c-0.69,0.03-0.83-0.2-0.64-0.88c1.87-6.66,3.71-13.33,5.55-20c0.23-0.7,0.42-1.41,0.56-2.13 c0-0.02,0-0.03,0-0.05c0-0.67,0.54-1.2,1.21-1.2c0.12,0,0.25,0.02,0.36,0.06c0.21,0.02,0.43,0.02,0.65,0.02 C72.65,0.12,72.83,0.12,73,0.11L73,0.11L73,0.11z M100.08,13.09c-0.81,0.72-1.62,1.42-2.41,2.15c-3.03,2.78-6.04,5.58-9.06,8.38 c-0.5,0.47-0.76,0.55-1.15-0.14c-2.23-3.91-4.5-7.79-6.76-11.68c-0.07-0.1-0.16-0.2-0.25-0.28c-0.34,0.43-0.56,0.96-0.61,1.51 c-0.95,3.38-1.87,6.77-2.77,10.17c-0.02,0.58-0.49,1.03-1.07,1.03c-0.07,0-0.14-0.01-0.21-0.02c-1.01-0.08-2.04-0.03-3.06-0.01 c-0.47,0.01-0.73-0.06-0.56-0.66c2.12-7.65,4.23-15.31,6.33-22.97c0.05-0.08,0.11-0.16,0.18-0.23c0.41,0.37,0.74,0.82,0.97,1.32 c2.86,4.76,5.71,9.52,8.56,14.29c0.64,1.07,0.62,1.05,1.58,0.23c5.16-4.4,10.32-8.8,15.5-13.18c1.04-0.88,2.07-1.77,3.2-2.73 c0.02,0.12,0.03,0.25,0.03,0.38c0,0.39-0.1,0.78-0.28,1.12c-1.96,7.19-3.95,14.37-5.9,21.55c-0.03,0.51-0.46,0.91-0.97,0.91 c-0.06,0-0.12-0.01-0.17-0.02c-0.5-0.03-1.01-0.04-1.51-0.04c-0.48,0-0.97,0.01-1.45,0.04c-0.84,0.05-0.91-0.26-0.7-0.99 c0.89-3.14,1.74-6.3,2.6-9.45c0.05-0.09,0.08-0.19,0.08-0.29C100.22,13.33,100.17,13.19,100.08,13.09L100.08,13.09L100.08,13.09z M11.05,4.76c5.39,0.07,10.76-0.01,16.14-0.01c0.95,0,1.72,0.77,1.72,1.72c0,0.24-0.05,0.48-0.15,0.71c-0.27,1.5-1.58,2.6-3.11,2.6 C20.33,9.77,15,9.77,9.67,9.8c-0.88,0-0.91-0.35-0.69-1.03c0.35-1,0.64-2.01,0.86-3.04c0.01-0.55,0.46-0.98,1.01-0.98 C10.92,4.74,10.98,4.75,11.05,4.76L11.05,4.76z M8.11,14.47c5.35,0,10.71,0.01,16.07,0.03c1.84,0.01,2.57,1.7,1.49,3.44 c-0.58,0.98-1.63,1.58-2.77,1.58c-5.25,0-10.49-0.06-15.74,0.01c-0.81,0.01-1.19-0.1-0.86-1.04c0.37-1.06,0.63-2.16,0.9-3.24 C7.27,14.8,7.66,14.47,8.11,14.47L8.11,14.47z"
        fill="#66686C"
      />
      <polygon
        points="100.46,35.72 106.57,47.88 93.71,60.04 95.24,54.53 102.27,47.88 98.93,41.23 100.46,35.72"
        fill="#0E8635"
      />
      <polygon
        points="96.16,35.72 102.27,47.88 89.41,60.04 96.16,35.72"
        fill="#E97208"
      />
    </g>
  </svg>
);

export default function Footer() {
const { showToast, ToastContainer } = useToast();
  const { isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  // const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  
      const handleSubmit = async (e) => {
          e.preventDefault();
          if (!consent) {
            toast.error("Please accept the terms before subscribing.");
            // showToast("Please accept the terms before subscribing.", "error");
            return;
          }

          setLoading(true);

          try {
            const response = await newsletterAPI.subscribe({ email });

            // console.log("Newsletter response:", response);

            toast.success(
              response?.message || "Thank you for subscribing!",
              "success"
            )

            // showToast(
            //   response?.message || "Thank you for subscribing!",
            //   "success"
            // );

            setEmail("");
            setConsent(false);
          } catch (error) {
            // console.log("Newsletter Error:", error);

            toast.error(
               error?.message || "Subscription failed. Try again!",
              "error"
            );

            // showToast(
            //   error?.message || "Subscription failed. Try again!",
            //   "error"
            // );
          } finally {
            setLoading(false);
          }
        };


  const pathname = usePathname();

  //   if (pathname === "/") {
  //     return null;
  //   }

  const currentYear = 2025;

  const shopLinks = [
    { href: "/collections", label: "All Collections" },
    { href: "/collections", label: "Limited Collections" },
    { href: "/refund-policy", label: "Refund And Cancellation Policy" },
    {
      href: "/delivery-shipping-policy",
      label: "Delivery And Shipping Policy",
    },
  ];

  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    ...(isAuthenticated ? [{ href: "/account", label: "My Account" }] : []),
    { href: "/", label: "Careers" },
  ];

  const supportLinks = [
    { href: "/faq", label: "FAQs" },
    { href: "/cookies-policy", label: "Cookie Policy" },
    { href: "/terms-condition", label: "Terms of Use" },
    { href: "/privacy-policy", label: "Privacy Policy" },
  ];


<ToastContainer />
  return (
    
    <footer className="w-full">
       <ToastContainer />
      {/* Trust Badges */}
      <div className=" py-4 sm:py-6">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-gray-900">
                  Free Shipping
                </p>
                <p className="text-xs text-gray-600">On orders over ₹5000</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-gray-900">
                  Secure Payment
                </p>
                <p className="text-xs text-gray-600">100% protected</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-gray-900">
                  Quality Promise
                </p>
                <p className="text-xs text-gray-600">Premium materials</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-gray-900">
                  24/7 Support 
                </p>
                <p className="text-xs text-gray-600">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Brand Section */}
          <div className="lg:col-span-4 text-center lg:text-left">
            <div className="space-y-4 sm:space-y-6">
              <Link href="/" className="inline-block">
                <Image
                  src="/footerlogo.png"
                  alt="Gulbhahar Logo"
                  width={300}
                  height={150} 
                  priority
                  className="h-16 object-cover sm:h-16  lg:mx-0"
                />

                <p className="text-[16px] mt-[-10px] ml-1 text-gray-600  ">
                  Premium Fashion & Style 
                </p>
              </Link>

              <p className="text-sm sm:text-base text-gray-600 max-w-sm mx-auto lg:mx-0">
                Discover timeless elegance with our curated collection of
                premium footwear and accessories. 
                <span className="text-red-900 font-semibold">
                  {" "} 
                  Crafted with love, designed for you. 
                </span>
              </p>

              {/* Social Media */}
              <div>
                <p className="text-sm font-bold text-gray-900 mb-3">
                  Follow Us 
                </p>
                <div className="flex space-x-4 justify-center lg:justify-start">
                  <Link
                    href="#" 
                    className="w-10 h-10 bg-red-100 hover:bg-red-900 text-red-900 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                  > 
                    <FooterTwitterX className="h-5 w-5" /> 
                  </Link> 
                  <Link
                    href="https://www.instagram.com/gulbhahar_official?igsh=MzRlODBiNWFlZA=="
                    className="w-10 h-10 bg-red-100 hover:bg-red-900 text-red-900 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                  >
                    <FooterInstagram className="h-5 w-5" />
                  </Link>
                  <Link 
                    href="https://www.facebook.com/share/1GN5HZC6dS/"
                    className="w-10 h-10 bg-red-100 hover:bg-red-900 text-red-900 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Links Sections */}
          <div className="lg:col-span-6 text-end grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {/* Shop Links */}
            <div className="text-left">
              <p className="text-sm font-bold uppercase tracking-wider text-red-900 mb-4 sm:mb-6">
                Shop 
              </p> 
              <ul className="space-y-2  sm:space-y-3">
                {shopLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-red-900 transition-colors duration-200 hover:font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="text-center sm:text-left w-full">
              <p className="text-sm font-bold  uppercase tracking-wider text-red-900 mb-4 sm:mb-6">
                Company
              </p>
              <ul className="space-y-2 sm:space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-red-900 transition-colors duration-200 hover:font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="text-left">
              <p className="text-sm font-bold uppercase tracking-wider text-red-900 mb-4 sm:mb-6">
                Support
              </p>
              <ul className="space-y-2 sm:space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-red-900 transition-colors duration-200 hover:font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact & Payment Section */}
          <div className="lg:col-span-2 w-full text-center lg:text-left">
            <p className="text-sm font-bold uppercase tracking-wider text-red-900 mb-4 sm:mb-6">
              Get in Touch
            </p>
            {/* dfscxgkljefdbgfbgkckjxbvfdasfxkjbciruebgfidub
            dcxgknf;dln;ofdg;lk ;l;nvc;
            fdvcs;flgcknbvfk;gndcbv;snki */}

            {/* Contact Info */}
            <div className="space-y-3 mb-6 ">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <MapPin className="h-4 w-4 text-red-600" />
                <span className="text-xs text-gray-600">Delhi, India</span>
              </div>

              <div className="flex items-center gap-2 justify-center w-full h-6 lg:justify-start">
                <Mail className="h-4 w-4 text-red-600" />
                <a
                  href="mailto:support@gulbhahar.com"
                  className="text-xs text-gray-600 hover:underline"
                >
                  support@gulbhahar.com
                </a>
              </div>

              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Phone className="h-4 w-4 text-red-600" />
                <a
                  href="tel:+919220927241"
                  className="text-xs text-gray-600 hover:underline"
                >
                  +91 92209 27241
                </a>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <p className="text-xl font-bold text-gray-900 mb-3">We Accept</p>
              <div className="flex space-x-2 items-center justify-center flex-wrap gap-2 lg:justify-start">
                <Image
                  src="/payment-cards/master-card-icon.png"
                  alt="Mastercard"
                  width={96}
                  priority
                  height={32}
                  className="h-12 w-12 object-contain"
                />
                <Image
                  src="/payment-cards/visa-icon.png"
                  alt="Visa"
                  priority
                  width={48}
                  height={32}
                  className="h-10 w-12 object-contain"
                />
                <Image
                  src="/payment-cards/bhim-upi.png"
                  alt="UPI"
                  width={48}
                  priority
                  height={32}
                  className="h-10 w-12 object-contain"
                />
              </div>
            </div>
          </div>
        </div>

     
        {/* Newsletter Subscription */}
        <div className="mt-12 lg:mt-16 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 sm:p-8 border-2 border-red-200">
          <div className="text-center max-w-2xl mx-auto">
            
            <p className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Stay in the Loop! 📧
            </p>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Subscribe to our newsletter for exclusive offers, new arrivals,
              and style tips.
            </p>

            {/* Consent Box */}
            <div className="max-w-md mx-auto mb-6">
              <div className="flex items-start gap-3 bg-white/50 p-3 rounded-xl shadow-sm border border-red-200">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={() => setConsent(!consent)}
                  className="h-4 w-4 mt-1 cursor-pointer"
                />

                <label className="text-xs sm:text-sm text-gray-700 leading-5 cursor-pointer text-left">
                  I agree to the 
                  <span className="font-medium text-red-700 hover:underline cursor-pointer"> Terms & Conditions </span>
                  and 
                  <span className="font-medium text-red-700 hover:underline cursor-pointer"> Privacy Policy</span>.
                  I consent to receive updates via <strong>SMS / Email / RCS.</strong>
                </label>
              </div>
            </div>

            {/* Email Input + Button */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-red-200 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-red-500 
                focus:border-red-900 transition-all duration-200 bg-white"
              />

              <button
                disabled={!consent || loading}
                onClick={handleSubmit}
                className={`${
                  !consent || loading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:from-red-800 hover:to-red-700"
                } bg-gradient-to-r from-red-900 to-red-800 
                  text-white px-6 py-3 rounded-xl font-bold transition-all duration-200`}
              >
                {loading ? "Please wait..." : "Subscribe"}
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="bg-red-900 text-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center sm:text-left">
              Copyright © {currentYear} Gulbhahar. All rights reserved
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-300 fill-current" />
              <span>in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
