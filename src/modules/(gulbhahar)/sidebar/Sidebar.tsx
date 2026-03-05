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
  ChevronRight,
  ArrowRight,
  Footprints,
  Scissors,
  Shirt,
  BaggageClaim,
  Diamond,
  ShoppingBag as BagIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface GulbhaharSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: any;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const collections = [
  { name: "Juttis",     href: "/juttis",    icon: Footprints },
  { name: "Sarees",    href: "/saree",     icon: Scissors },
  { name: "Suits",     href: "/suit",      icon: Shirt },
  { name: "Lehenga",   href: "/lehenga",   icon: Crown },
  { name: "Jewellery", href: "/jewellery", icon: Diamond },
  { name: "Bags",      href: "/bags",      icon: BagIcon },
];

const featuredLinks = [
  { name: "Punjabi Juttis",          href: "/collections/punjabi-juttis" },
  { name: "Bridal Saree Collection", href: "/collections/bridal-saree-collection" },
  { name: "Casual Juttis",           href: "/collections/juttis" },
  { name: "Plain Satin Saree",       href: "/collections/plain-satin-saree" },
  { name: "Lavender Suit",           href: "/collections/lavender-suit" },
];

const importantLinks = [
  { name: "All Collections", href: "/collections", icon: ShoppingBag },
  { name: "About Us",        href: "/about-us",    icon: Info },
  { name: "Contact Us",      href: "/contact",     icon: Phone },
];

const policies = [
  { name: "Refund",   href: "/refund-policy" },
  { name: "Delivery", href: "/delivery-policy" },
  { name: "Privacy",  href: "/privacy-policy" },
  { name: "Terms",    href: "/terms-of-use" },
  { name: "Cookies",  href: "/cookie-policy" },
];

const accountNavItems = [
  { path: "/account/account-centre/profile",  label: "Profile",  icon: User },
  { path: "/account/account-centre/my-order", label: "Orders",   icon: Package },
  { path: "/account/account-centre/settings", label: "Settings", icon: Settings },
];

const BRAND = "#800000";

const GulbhaharSidebar = ({
  isOpen,
  onClose,
  userData,
  isAuthenticated,
  onLogout,
}: GulbhaharSidebarProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const userDisplay = isAuthenticated
    ? {
        name: userData?.name || "User",
        email: userData?.email || "Welcome back",
        initial: userData?.firstName?.[0] || userData?.name?.[0] || "U",
      }
    : {
        name: "Welcome",
        email: "Sign in to your account",
        initial: null,
      };

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[10000] transition-all duration-500",
          isOpen
            ? "bg-black/30 backdrop-blur-[2px] opacity-100"
            : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-full sm:max-w-[340px] z-[10001]",
          "bg-white flex flex-col",
          "transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* ─── Header ─── */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5">
          <Link href="/" onClick={onClose} className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Gulbhahar"
              width={45}
              height={45}
              className="w-9 h-9 object-contain"
            />
            <span
              className="text-lg font-extrabold tracking-[0.22em] uppercase min-w-[150px]"
              style={{ color: BRAND }}
            >
              Gulbhahar
            </span>
          </Link>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
          </button>
        </div>

        {/* thin brand rule under header */}
        <div className="mx-6 h-px bg-neutral-100" />

        {/* ─── Profile Row ─── */}
        <div className="px-6 py-5">
          <div className="flex items-center gap-4">
            <Avatar className="w-14 h-14 ring-2 ring-offset-2 ring-[#800000]/20 shadow-md">
              {isAuthenticated ? (
                <>
                  <AvatarImage 
                    src={userData?.imageUrl || ""} 
                    className="object-cover"
                  />
                  <AvatarFallback
                    className="text-base font-semibold text-white bg-gradient-to-br from-[#800000] to-[#a04545]"
                  >
                    {userDisplay.initial}
                  </AvatarFallback>
                </>
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-neutral-100 to-neutral-200">
                  <UserCircle className="w-7 h-7 text-neutral-500" strokeWidth={1.25} />
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex-1 min-w-0">
              <h3 className="text-[15px] font-semibold text-neutral-800 leading-tight truncate">
                {userDisplay.name}
              </h3>
              <p className="text-[12px] text-neutral-500 mt-0.5 truncate">
                {userDisplay.email}
              </p>
            </div>
          </div>

          {/* Account quick actions */}
          {isAuthenticated && (
            <div className="flex mt-4 bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
              {accountNavItems.map((item, i) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={onClose}
                  className={cn(
                    "flex-1 flex flex-col items-center gap-1 py-3 transition-colors group",
                    i < accountNavItems.length - 1 && "border-r border-neutral-100"
                  )}
                >
                  <item.icon
                    className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#800000] transition-colors"
                    strokeWidth={1.25}
                  />
                  <span
                    className="text-[9.5px] font-medium tracking-[0.08em] text-neutral-400 group-hover:text-neutral-700 transition-colors uppercase"
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* separator — always shown between profile area and content */}
        <div className="mx-6 h-px bg-neutral-100" />

        {/* ─── Scrollable Body ─── */}
        <div className="flex-1 overflow-y-auto px-6 pb-4 pt-5 space-y-7">

          {/* Collections */}
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-400 mb-3">
              Shop Collections
            </p>
            <div className="grid grid-cols-2 gap-1">
              {collections.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors group"
                >
                  <item.icon
                    className="w-3 h-3 flex-shrink-0 transition-colors group-hover:text-[#800000]"
                    strokeWidth={1.25}
                    style={{ color: `${BRAND}55` }}
                  />
                  <span className="text-[13px] text-neutral-600 font-medium group-hover:text-neutral-900 transition-colors truncate">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* thin divider */}
          <div className="h-px bg-neutral-100" />

          {/* Featured Links */}
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-400 mb-3">
              Popular Picks
            </p>
            <div className="space-y-0.5">
              {featuredLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors group"
                >
                  <ChevronRight
                    className="w-3 h-3 flex-shrink-0 transition-colors"
                    strokeWidth={1.5}
                    style={{ color: `${BRAND}55` }}
                  />
                  <span className="text-[13px] text-neutral-600 font-medium group-hover:text-neutral-900 transition-colors">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* thin divider */}
          <div className="h-px bg-neutral-100" />

          {/* Explore */}
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-400 mb-3">
              Explore
            </p>
            <div className="space-y-0.5">
              {importantLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-neutral-50 transition-colors group"
                >
                  <item.icon
                    className="w-3.5 h-3.5 flex-shrink-0 text-neutral-400"
                    strokeWidth={1.5}
                  />
                  <span className="flex-1 text-[13px] font-medium text-neutral-700">
                    {item.name}
                  </span>
                  <ChevronRight
                    className="w-3.5 h-3.5 text-neutral-300 group-hover:text-neutral-500 transition-colors"
                    strokeWidth={1.5}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* thin divider */}
          <div className="h-px bg-neutral-100" />

          {/* Policies — dot-separated plain text */}
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-400 mb-3">
              Policies
            </p>
            <div className="flex flex-wrap items-center">
              {policies.map((p, i) => (
                <span key={p.href} className="flex items-center">
                  <Link
                    href={p.href}
                    onClick={onClose}
                    className="text-[11px] text-neutral-400 hover:text-neutral-700 transition-colors"
                  >
                    {p.name}
                  </Link>
                  {i < policies.length - 1 && (
                    <span className="text-neutral-300 mx-2 text-[9px]">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* thin divider */}
          <div className="h-px bg-neutral-100" />

          {/* Contact + Social */}
          <div className="space-y-4">
            <div className="space-y-2.5">
              {[
                { icon: MapPin, text: "Delhi, India" },
                { icon: Mail,   text: "support@gulbhahar.com" },
                { icon: Phone,  text: "+91 92209 27241" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon className="w-3 h-3 flex-shrink-0 text-neutral-400" strokeWidth={1.5} />
                  <span className="text-[11px] text-neutral-400">{text}</span>
                </div>
              ))}
            </div>

            {/* Social icons — brand accent on hover */}
            <div className="flex items-center justify-between pt-1 pb-2">
              {[
                { Icon: Facebook,  label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter,   label: "Twitter" },
                { Icon: Youtube,   label: "Youtube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-colors group hover:bg-[#800000]"
                >
                  <Icon
                    className="w-[17px] h-[17px] text-neutral-400 transition-colors group-hover:text-white"
                    strokeWidth={1.5}
                  />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ─── Footer CTA ─── */}
        <div className="px-6 pb-5 pt-3.5 border-t border-neutral-100 flex justify-center">
          {isAuthenticated ? (
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-8 py-2.5 rounded-full text-[12px] font-semibold tracking-widest uppercase text-white transition-all active:scale-[0.97] hover:opacity-85"
              style={{ background: BRAND }}
            >
              <LogOut className="w-3 h-3" strokeWidth={1.75} />
              Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center gap-2 px-8 py-2.5 rounded-full text-[12px] font-semibold tracking-widest uppercase text-white transition-all active:scale-[0.97] hover:opacity-85"
              style={{ background: BRAND }}
            >
              <ArrowRight className="w-3 h-3" strokeWidth={1.75} />
              Sign In
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default GulbhaharSidebar;