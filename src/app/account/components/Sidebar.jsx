"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Settings, 
  Shield 
} from 'lucide-react';

// Sidebar Links
const navItems = [
  { label: "My Orders", path: "/account/account-centre/my-order", icon: ShoppingBag },
  { label: "Wishlist", path: "/account/account-centre/wishlist", icon: Heart },
  { label: "Profile", path: "/account/account-centre/profile", icon: User },
  { label: "Settings", path: "/account/account-centre/settings", icon: Settings },
  { label: "Security & Privacy", path: "/account/account-centre/security", icon: Shield },
];

export default function Sidebar() {
  const pathname = usePathname();
  
  // DEBUG: Add this to see what's happening
  // console.log("🔍 Current pathname:", pathname);

  return (
    <nav className="flex flex-col space-y-2 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      {/* DEBUG: Show current path
      <div className="text-xs bg-yellow-100 p-2 rounded mb-2">
        Current: {pathname}
      </div> */}
      
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        const IconComponent = item.icon;
        
        // DEBUG: Log each comparison
        // console.log(`📍 ${item.label}: "${pathname}" === "${item.path}" = ${isActive}`);

        return (
          <a key={item.path} href={item.path} className="w-full">
            <div
              className={`
                flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 
                cursor-pointer group relative overflow-hidden
                ${isActive
                  ? "bg-red-50 text-red-900 font-semibold border-l-4 border-red-900 shadow-sm" 
                  : "text-gray-700 hover:bg-red-50 hover:text-red-800"
                }
              `}
            >
              
              {/* Background gradient on hover */}
              <div className={`
                absolute inset-0 bg-gradient-to-r from-red-900/5 to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                ${isActive ? 'opacity-100' : ''}
              `} />
              
              {/* Icon */}
              <div className={`
                relative z-10 p-1 rounded-md transition-colors duration-200
                ${isActive 
                  ? "bg-red-900 text-white" 
                  : "text-gray-500 group-hover:text-red-900 group-hover:bg-red-100"
                }
              `}>
                <IconComponent size={18} />
              </div>
              
              {/* Label */}
              <span className={`
                relative z-10 text-sm font-medium transition-colors duration-200
                ${isActive ? "text-red-900" : "group-hover:text-red-900"}
              `}>
                {item.label}
              </span>
              
              {/* Active indicator dot */}
              {isActive && (
                <div className="absolute right-3 w-2 h-2 bg-red-900 rounded-full" />
              )}
            </div>
          </a>
        );
      })}
      
      {/* Decorative bottom border */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="h-1 bg-gradient-to-r from-red-900 via-red-700 to-red-500 rounded-full opacity-20" />
      </div>
    </nav>
  );
}