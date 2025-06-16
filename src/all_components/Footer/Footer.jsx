"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Phone
} from "lucide-react";

// Mock social media icons
const FooterYouTube = ({ className }) => <Youtube className={className} />;
const FooterTwitterX = ({ className }) => <Twitter className={className} />;
const FooterInstagram = ({ className }) => <Instagram className={className} />;

// Mock payment icons
const Mastercard = ({ className }) => (
  <div className={`${className} text-nowrap bg-gradient-to-r from-red-600 to-yellow-500 rounded-lg text-white text-xs flex items-center justify-center font-bold shadow-md`}>
    Master Card
  </div>
);

const Visa = ({ className }) => (
  <div className={`${className} bg-blue-600 rounded-lg text-white text-xs flex items-center justify-center font-bold shadow-md`}>
    VISA
  </div>
);

const UPI = ({ className }) => (
  <div className={`${className} bg-green-600 rounded-lg text-white text-xs flex items-center justify-center font-bold shadow-md`}>
    UPI
  </div>
);

export default function Footer() {
  const pathname = usePathname();
  
//   if (pathname === "/") {
//     return null;
//   }
  
  const currentYear = 2025;

  const shopLinks = [
    { href: "/collections", label: "All Collections" },
    { href: "/collections", label: "Limited Collections" },
    { href: "/refund-policy", label: "Refund And Cancellation Policy" },
    { href: "/delivery-shipping-policy", label: "Delivery And Shipping Policy" }
  ];

  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/account", label: "My Account" },
    { href: "/", label: "Careers" }
  ];

  const supportLinks = [
    { href: "/faq", label: "FAQs" },
    { href: "/cookies-policy", label: "Cookie Policy" },
    { href: "/terms-condition", label: "Terms of Use" },
    { href: "/privacy-policy", label: "Privacy Policy" }
  ];

  return (
    <footer className="w-full">
      {/* Trust Badges */}
      <div className=" py-4 sm:py-6">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-600">On orders over ₹999</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-gray-900">Secure Payment</p>
                <p className="text-xs text-gray-600">100% protected</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-gray-900">Quality Promise</p>
                <p className="text-xs text-gray-600">Premium materials</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-gray-900">24/7 Support</p>
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
               {/* <div className="text-5xl uppercase sm:text-4xl font-[700] text-transparent bg-clip-text bg-[#FFD700] transition-all duration-500 drop-shadow-lg tracking-wide font-['oldstandard']">
  Gulbhahar
</div> */}
                <Image 
                  src="/footerlogo.png" 
                  alt="Gulbhahar Logo" 
                  width={300} 
                  height={150} 
                  className="h-16 object-cover sm:h-16  lg:mx-0"
                />

                <p className="text-[16px] mt-[-10px] ml-1 text-gray-600  ">Premium Fashion & Style</p>
              </Link>
              
              <p className="text-sm sm:text-base text-gray-600 max-w-sm mx-auto lg:mx-0">
                Discover timeless elegance with our curated collection of premium footwear and accessories. 
                <span className="text-red-900 font-semibold"> Crafted with love, designed for you.</span>
              </p>
              
              {/* Social Media */}
              <div>
                <p className="text-sm font-bold text-gray-900 mb-3">Follow Us</p>
                <div className="flex space-x-4 justify-center lg:justify-start">
                  <Link 
                    href="#" 
                    className="w-10 h-10 bg-red-100 hover:bg-red-900 text-red-900 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                  >
                    <FooterYouTube className="h-5 w-5" />
                  </Link>
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
          <div className="lg:col-span-6 grid grid-cols-2  sm:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Shop Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-900 mb-4 sm:mb-6">
                Shop
              </h3>
              <ul className="space-y-2 sm:space-y-3">
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
            <div className="text-center sm:text-left">
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-900 mb-4 sm:mb-6">
                Company
              </h3>
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
            <div className="text-center sm:text-left">
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-900 mb-4 sm:mb-6">
                Support
              </h3>
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
          <div className="lg:col-span-2 text-center lg:text-left">
            <h3 className="text-sm font-bold uppercase tracking-wider text-red-900 mb-4 sm:mb-6">
              Get in Touch
            </h3>
            {/* dfscxgkljefdbgfbgkckjxbvfdasfxkjbciruebgfidub
            dcxgknf;dln;ofdg;lk ;l;nvc;
            fdvcs;flgcknbvfk;gndcbv;snki */}
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <MapPin className="h-4 w-4 text-red-600" />
                <span className="text-xs text-gray-600">Delhi, India</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Mail className="h-4 w-4 text-red-600" />
                <span className="text-xs text-gray-600">hello@gulbhahar.com</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Phone className="h-4 w-4 text-red-600" />
                <span className="text-xs text-gray-600">+91 97176 14241</span>
              </div>
            </div>
            
            {/* Payment Methods */}
            <div>
              <p className="text-xl font-bold text-gray-900 mb-3">We Accept</p>
              <div className="flex space-x-2 justify-center flex-wrap gap-2 lg:justify-start">
                <Mastercard className="h-8 min-w-24 " />
                <Visa className="h-8 w-12" />
                <UPI className="h-8 w-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 lg:mt-16 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 sm:p-8 border-2 border-red-200">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Stay in the Loop! 📧
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Subscribe to our newsletter for exclusive offers, new arrivals, and style tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border-2 border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-900 transition-all duration-200"
              />
              <button className="bg-gradient-to-r from-red-900 to-red-800 text-white px-6 py-3 rounded-xl font-bold hover:from-red-800 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                Subscribe
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