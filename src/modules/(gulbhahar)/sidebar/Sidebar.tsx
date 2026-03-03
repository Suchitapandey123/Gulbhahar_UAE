import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/modules/(gulbhahar)/common/ui/avatar";
import {
  Crown,
  Gem,
  Heart,
  LogOut,
  Package,
  Settings,
  Sparkles,
  Star,
  User,
  X,
  UserCircle,
  ShoppingBag,
  Info,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface GulbhaharSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: any;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const collections = [
  {
    name: "Juttis",
    href: "/juttis",
    icon: Heart,
  },
  {
    name: "Sarees",
    href: "/saree",
    icon: Sparkles,
  },
  {
    name: "Suits",
    href: "/suit",
    icon: Gem,
  },
  {
    name: "Lehenga",
    href: "/lehenga",
    icon: Crown,
  },
  {
    name: "Jewellery",
    href: "/jewellery",
    icon: Crown,
  },
  {
    name: "Bags",
    href: "/bags",
    icon: Crown,
  },
];

const GulbhaharSidebar = ({
  isOpen,
  onClose,
  userData,
  isAuthenticated,
  onLogout,
}: GulbhaharSidebarProps) => {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isActive = (path: string) => pathname === path;

  // Navigation items for authenticated users
  const accountNavItems = [
    {
      path: "/account/account-centre/profile",
      label: "My Profile",
      icon: User,
    },
    {
      path: "/account/account-centre/my-order",
      label: "My Orders",
      icon: Package,
    },
    {
      path: "/account/account-centre/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  // Important links
  const importantLinks = [
    { name: "All Collections", href: "/collections", icon: ShoppingBag },
    { name: "About Us", href: "/about-us", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  // Get user display
  const getUserDisplay = () => {
    if (isAuthenticated) {
      return {
        name: userData?.name || "User",
        email: userData?.email || "Welcome back!",
        initial: userData?.firstName?.[0] || userData?.name?.[0] || "U",
      };
    }
    return {
      name: "Guest User",
      email: "Sign in to access your account",
      initial: <UserCircle className="w-8 h-8 text-muted-foreground" />,
    };
  };

  const userDisplay = getUserDisplay();

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[10000] transition-all duration-500",
          isOpen
            ? "bg-black/60 backdrop-blur-sm opacity-100"
            : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-full sm:max-w-[380px] bg-white z-[10001]",
          "transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header with Logo and Close */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <Image
              src={"/logo.png"}
              alt="Gulbhahar"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
            <span className="text-lg font-semibold text-[#800000]">
              GULBHAHAR
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile Card */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              {isAuthenticated ? (
                <>
                  <AvatarImage src={userData?.imageUrl || ""} />
                  <AvatarFallback className="bg-[#800000] text-white">
                    {userDisplay.initial}
                  </AvatarFallback>
                </>
              ) : (
                <AvatarFallback className="bg-gray-200">
                  <UserCircle className="w-6 h-6 text-gray-500" />
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="font-medium">{userDisplay.name}</h3>
              <p className="text-xs text-gray-500">{userDisplay.email}</p>
            </div>
          </div>

          {/* Account Quick Links - Only for authenticated users - Profile ke neeche hi */}
          {isAuthenticated && (
            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-200">
              {accountNavItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={onClose}
                  className="flex-1 flex flex-col items-center gap-1 px-2 py-2 text-xs font-medium text-gray-700 bg-white rounded-lg hover:bg-[#800000] hover:text-white transition-all duration-300 group"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-[10px]">{item.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Links - Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* COLLECTIONS - Sabse pehle */}
          <div className="mb-8">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              SHOP COLLECTIONS
            </h4>
            <div className="space-y-1">
              {collections.map((collection) => (
                <Link
                  key={collection.name}
                  href={collection.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <collection.icon className="w-4 h-4 text-gray-500 group-hover:text-[#800000]" />
                  <span className="group-hover:translate-x-1 transition-transform">
                    {collection.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Important Links */}
          <div className="mb-8">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              IMPORTANT
            </h4>
            <div className="space-y-1">
              {importantLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <item.icon className="w-4 h-4 text-gray-500" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Policies - Chips style */}
          <div className="mb-8">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              POLICIES
            </h4>
            <div className="flex flex-wrap gap-2 px-3">
              <Link href="/refund-policy" onClick={onClose} className="text-xs text-gray-600 hover:text-[#800000] bg-gray-100 px-3 py-1.5 rounded-full">
                Refund
              </Link>
              <Link href="/delivery-policy" onClick={onClose} className="text-xs text-gray-600 hover:text-[#800000] bg-gray-100 px-3 py-1.5 rounded-full">
                Delivery
              </Link>
              <Link href="/privacy-policy" onClick={onClose} className="text-xs text-gray-600 hover:text-[#800000] bg-gray-100 px-3 py-1.5 rounded-full">
                Privacy
              </Link>
              <Link href="/terms-of-use" onClick={onClose} className="text-xs text-gray-600 hover:text-[#800000] bg-gray-100 px-3 py-1.5 rounded-full">
                Terms
              </Link>
              <Link href="/cookie-policy" onClick={onClose} className="text-xs text-gray-600 hover:text-[#800000] bg-gray-100 px-3 py-1.5 rounded-full">
                Cookie
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-6 px-3">
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Delhi, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                <span>support@gulbhahar.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                <span>+91 92209 27241</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex gap-2 px-3 pb-4">
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer with Auth */}
        <div className="p-4 border-t">
          {isAuthenticated ? (
            <button
              onClick={onLogout}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-white bg-[#800000] rounded-lg hover:bg-[#660000] transition-colors"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default GulbhaharSidebar;